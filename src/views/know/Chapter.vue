<script  lang="ts" setup>
import HeaderVue from '@/components/site/Header.vue';
import MarkdownVue from '@/components/know/Markdown.vue';

const content = `
<div id="cnblogs_post_body" class="blogpost-body cnblogs-markdown">
<h1 id="概要">概要<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#概要" class="esa-anchor" style="opacity: 0;">#</a></h1>
<p>就像其名字所暗示的一样，异步编程，就是非同步的编程。从高层来看，一个异步操作就是在后台执行的操作——程序不会等待异步操作结束，而是立即开始继续执行下一行代码。</p>
<p>如果你已经熟悉了异步编程，这个定义可能不会让你满意，因为它并没有实际解释什么才是异步编程。想要真的理解异步编程模型，以及理解它在Rust中如何工作，我们首先需要挖掘与之相对的概念，我们需要理解同步编程模型。这对阐明概念以及展示异步编程的权衡都是很重要的，是的，异步的解决办法不一定是最优的。我们将从“首先促成异步编程这一概念的动机”开始这一章，然后，我们将深挖Rust中的异步编程在底层是如何工作的。</p>
<h1 id="什么是异步">什么是异步<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#什么是异步" class="esa-anchor" style="opacity: 0;">#</a></h1>
<p>在我们进入同步以及异步编程模型的细节前，我们首先快速地看一下，当你运行你的程序时，你的计算机实际在做什么。</p>
<p>计算机的速度很快，真的很快。实际上，它花费了大量的时间来等待事情发生，除非你正在解压一个文件；编码一个音频；或者处理数字......否则，你的CPU大部分时间都是空闲的，以等待操作完成。它等待一个网络包到达；等待鼠标移动；等待磁盘写完字节，或者仅仅是等待从主存读取完成。从CPU的视角来看，大多数这样的事件之间像是相隔了一万年，当一个发生了，CPU运行少量几条指令，然后继续回到等待状态。看看你的CPU利用率，它很可能是某些很低的数字，而且，在大部分时间里都是这样。</p>
<h2 id="同步接口">同步接口<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#同步接口" class="esa-anchor">#</a></h2>
<p>同步接口允许你的程序（或者只是你程序中的一个线程）在同一时间只执行单一操作，每一个操作必须等待前一个同步操作结束，然后它才能开始运行。你看到的大多数接口都是同步的：你调用他们，他们做某些事，然后最终当操作完成时返回，此时，你的程序可以从此处继续了。其原因我们将在本章的稍后看到，这是因为使用一个异步操作需要相当一些额外的机制，除非你需要异步操作所带来的好处，坚持使用同步模型，它们需要更少的环境。</p>
<p>同步接口隐藏了所有这些等待，一个应用程序调用一个函数，比如“写入一些字节到文件中”，稍后，这个函数结束了，然后下一行代码将背执行。在底层实际发生的是，操作系统将一个磁盘写入操作入队，然后让应用睡眠，直到磁盘报告它已经结束了写入。应用可能认为这个函数需要花费很长时间来执行，但其实，它根本没有真的执行，只是在等待。</p>
<p>一个像这样按顺序执行的接口也经常被称作“阻塞”的，因为接口中的操作不得不等待一些外部事件发生才能推进，从而阻塞进一步的执行，直到该事件发生。无论你怎么称呼它，基本的理念是不会变的：程序不会推进，直到当前操作结束，当操作在等待的同事，程序也在等待。</p>
<p>同步接口通常被认为是易于使用和推理的，因为你的代码在同一时间仅仅执行一行。</p>
<p>但是问题就出在它只允许应用程序在给定时间只能做一件事，这意味着如果你想要你的程序同事等待用户输入或者一个网络包，那你就没办法了，除非你的操作系统专门提供这样一个操作。同样的，你的应用无法在写一个磁盘文件时做任何其它有用的事，你只能让文件写入操作阻塞执行。</p>
<h2 id="多线程">多线程<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#多线程" class="esa-anchor">#</a></h2>
<p>迄今，允许并发执行的最通用的解决办法是使用多线程。在一个多线程程序中，每一个线程负责执行一个特定的独立的阻塞操作序列，然后操作系统在线程间进行多路复用，一旦任一线程可以推进，就让它推进，如果一个线程阻塞了，一些其它线程可以继续执行，所以，应用可以继续做一些有用的工作。</p>
<p>通常，为了让程序中的每个工作仍能协作，这些线程使用如锁或通道的同步原语来互相交流。例如，你可能有一个线程等待用户输入，而另一个线程正在等待网络包，另一个线程等待这两个线程，以在一个在三个线程间共享的通道上发送一条消息。</p>
<p>多线程给了你并发——在任一时间执行多个独立操作的能力，由运行应用程序的系统（在本例中是操作系统）来在没有阻塞的线程中进行选择并决定下一个执行哪个。如果一个线程阻塞了，它（系统）可以选择运行另一个继续推进进度。</p>
<p>将多线程与阻塞接口结合可以让你走的更远，并且很多商用软件都基于此构建，但是这种方法并不是没有缺点。首先，持续地跟踪这些线程很快就会变得麻烦起来，如果你不得不为每个并发任务创建一个线程，包括简单的等待键盘输入，线程将很快躲起来，并且为了跟踪所有这些线程间如何交互、交流以及写作也会引入额外的复杂性。</p>
<p>其次，线程越多，在其间进行切换的成本就越高。每当一个线程结束运行然后另一个开始接替它的位置时，你将需要对操作系统的调度器做一次往返，这并不是无开销的。在一些平台上，生成一个新的线程也是一个相当笨重的操作，高性能的程序经常通过重用这些线程以及使用一些系统调用来避免这种开销，这些系统调用允许你在许多相关方法上阻塞（译者认为是暂时阻塞一些任务以避免生成过多的线程），但最后，你又遇到了相同的问题：阻塞接口需要你有和你希望产生的阻塞调用数同等数量的线程。</p>
<p>最后，线程给你的程序带来了并行，并发和并行之间的区别是精妙但重要的：并发意味着你的任务是交替执行的，而并行意味着多个任务在同一时间执行。如果你有两个任务，以ASCII来表示它们的执行，看起来是这样的：<code>_-_-_</code>（并发），<code>=====</code>（并行）。多线程并不一定暗示着并行，甚至你有许多线程，但你可能只有一个核心，所以在给定时间只有一个线程可以执行，但是两者通常是齐头并进的。你可以使用一个<code>Mutex</code>或者其它同步原语来创造两个在它们的执行过程中互斥的线程，但是这会引入额外的复杂性，线程想要并行执行。虽然并行总是好事（谁会不像它们的程序在多个核心上运行的更快呢），但你必须处理真正的共享数据结构的同步访问。这意味着你需要从<code>Rc</code>、<code>Cell</code>以及<code>RefCell</code>移动到更加强大但更慢的<code>Arc</code>以及<code>Mutex</code>上。虽然你可能想要使用后面的那些类型在你的并发程序中以开启并行，但线程将强制你使用它们。我们将在第十章中看到多线程的更多细节。</p>
<h2 id="异步接口">异步接口<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#异步接口" class="esa-anchor">#</a></h2>
<p>现在我们已经探索了同步接口，我们可以看另一个了：异步，或者说非阻塞接口。异步接口，是一个并不直接产生结果，但是可能会指示你结果将在晚些时间可用的接口。这给了调用者在同时做一些其它事情的机会，而不是不得不睡眠，直到特定操作完成。在Rust的说法中，一个异步接口就是一个返回一个<code>Poll</code>（轮询）的方法，<code>Poll</code>在Listing8-1中定义：</p>
<pre class="highlighter-prismjs language-rust prismjs-lines-highlighted code-theme-dark" highlighted="true" has-selection="true"><code class="highlighter-prismjs language-rust hljsln"><span class="ln-bg"></span><span class="ln-num" data-num="1"></span><span class="token comment">// Listing 8-1</span>
<span class="ln-num" data-num="2"></span><span class="token keyword">enum</span> <span class="token type-definition class-name">Poll</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="3"></span>   <span class="token class-name">Ready</span><span class="token punctuation">(</span><span class="token class-name">T</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="ln-num" data-num="4"></span>   <span class="token class-name">Pending</span>
<span class="ln-num" data-num="5"></span><span class="token punctuation">}</span>
<span class="ln-eof"></span></code></pre>
<p><code>Poll</code>通常展示在名字以<code>poll</code>开头的函数的返回值类型上，<code>poll</code>开头的函数代表它是一个可以不阻塞的尝试某个操作的方法。我们将会在本章的稍后部分详细介绍它们是如何做到这一点的，但是通常来说，它们会在阻塞之前尽可能地尝试更多的操作，然后返回。并且，关键的是，它们会记住它们是在哪里离开的，所以在稍后可以推进额外的进度时，它们可以恢复执行。</p>
<p>这些非阻塞函数允许我们简单地执行多个并发任务，比如，如果你想要从网络或用户的键盘中读取，而不管哪一个先有事件可用，你要做的所有就是在一个循环中poll它们，直到其中的一个返回<code>Poll::Ready</code>。你不需要任何其它的线程或同步。</p>
<p>这里这个<code>loop</code>单词可能会让你有一点紧张，当下一个输入可能还有几分钟才会到达时，你会不希望你的程序在一秒钟之内穿过一个循环三十亿次。在阻塞接口的世界中这并不是一个问题，因为操作系统会让一个线程睡眠，并且负责在相关事件到达时唤醒它，但是在这个全新的非阻塞世界中，我们该如何避免在等待时的不断循环呢？</p>
<h2 id="标准化的polling">标准化的Polling<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#标准化的polling" class="esa-anchor">#</a></h2>
<p>为了让每个库都能以非阻塞的风格使用，我们可以让每个库的作者编写它们自己的<code>poll</code>方法，所有的方法名称、签名和返回类型都会略有不同，这很快就会让事情变得麻烦。在Rust中，取而代之的是，轮询通过<code>Future</code> trait被标准化，Listing8-2是一个简单版本的<code>Future</code>（我们会在这一章的后面回到真实的Future上）</p>
<pre class="highlighter-prismjs language-rust prismjs-lines-highlighted code-theme-dark" highlighted="true"><code class="highlighter-prismjs language-rust hljsln"><span class="ln-bg"></span><span class="ln-num" data-num="1"></span><span class="token comment">// Listing 8-2</span>
<span class="ln-num" data-num="2"></span><span class="token keyword">trait</span> <span class="token class-name">Future</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="3"></span>   <span class="token keyword">type</span> <span class="token class-name">Output</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="4"></span>   <span class="token keyword">fn</span> <span class="token function-definition function">poll</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Poll</span><span class="token operator">&lt;</span><span class="token keyword">Self</span><span class="token punctuation">::</span><span class="token class-name">Output</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="5"></span><span class="token punctuation">}</span>
<span class="ln-eof"></span></code></pre>
<p>实现了<code>Future</code>trait的类型被称作futures，它代表当前可能还无法使用的值。一个future可能代表下一个进入的网络包；下一次鼠标移动；或者只是一段时间之后时间点。你可以将<code>Future&lt;Output = Foo&gt;</code>读作“一个将会在未来产生一个<code>Foo</code>的类型”。这样的类型在其它的语言中通常称为<code>promise</code>——它们最终会返回指定的类型。当一个future最终返回了一个<code>Poll::Ready(T)</code>，我们说future <code>resolve</code>（解决）到了一个<code>T</code>。</p>
<p>有了这个trait，我们就可以描述提供<code>poll</code>方法的模式。与其使用<code>poll_recv</code>与<code>poll_keypress</code>这样的接口，不如使用像返回一个具有合适的<code>Output</code>类型的<code>impl Future</code>的<code>recv</code>以及<code>keypress</code>函数。这不会改变你必须轮询它们的事实——我们稍后将处理它——但是至少现在我们有了这些pending值的标准接口，并且我们不需要在任何地方使用<code>poll_</code>前缀。</p>
<blockquote>
<p><strong>注意</strong>：通常来说，你不需要在一个future返回<code>Poll::Ready</code>后再次轮询它，如果你这样做了，future有权利panic，一个在返回<code>Ready</code>后仍能安全地<code>poll</code>的future有时被称为fused future。</p>
</blockquote>
<h1 id="ergonomic-futures">Ergonomic Futures<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#ergonomic-futures" class="esa-anchor" style="opacity: 0;">#</a></h1>
<p>使用我目前为止介绍的方式编写一个实现了<code>Future</code>的类型是非常痛苦的，为了体会到为什么，首先先看Listing8-3中非常简单直接的异步代码块，它只是简单的尝试从输入通道<code>rx</code>转发消息到输出通道<code>tx</code>。</p>
<pre class="highlighter-prismjs language-rust prismjs-lines-highlighted code-theme-dark" highlighted="true"><code class="highlighter-prismjs language-rust hljsln"><span class="ln-bg"></span><span class="ln-num" data-num="1"></span><span class="token comment">// Listing 8-3</span>
<span class="ln-num" data-num="2"></span><span class="token keyword">async</span> <span class="token keyword">fn</span> <span class="token function-definition function">forward</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>rx<span class="token punctuation">:</span> <span class="token class-name">Recevier</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> tx<span class="token punctuation">:</span> <span class="token class-name">Sender</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="3"></span>   <span class="token keyword">while</span> <span class="token keyword">let</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">=</span> rx<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">await</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="4"></span>      tx<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">await</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="5"></span>   <span class="token punctuation">}</span>
<span class="ln-num" data-num="6"></span><span class="token punctuation">}</span>
<span class="ln-eof"></span></code></pre>
<p>这个代码，使用<code>async</code>和<code>await</code>语法，看起来非常像与之对应的同步代码并且易于阅读。我们简单的发送我们在循环中接收到的每一条消息，直到没有更多的消息了，并且每一个<code>await</code>的点对应着其同步变体中可能发生阻塞的地方。现在，想象如果你必须通过手动实现<code>Future</code> trait来编写这段代码，由于每一个<code>poll</code>调用都从函数顶部开始，因此你需要打包必要的状态，以便从代码返回（yielded 或者说让步）的最后一个位置继续。结果十分怪诞，就像Listing8-4所展示的：</p>
<pre class="highlighter-prismjs language-rust prismjs-lines-highlighted code-theme-dark" highlighted="true"><code class="highlighter-prismjs language-rust hljsln"><span class="ln-bg"></span><span class="ln-num" data-num="1"></span><span class="token comment">// Listing 8-4</span>
<span class="ln-num" data-num="2"></span><span class="token keyword">enum</span> <span class="token type-definition class-name">Forward</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="3"></span>	<span class="token class-name">WaitingForReceive</span><span class="token punctuation">(</span><span class="token class-name">ReceiveFuture</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">Sender</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="ln-num" data-num="4"></span>	<span class="token class-name">WatingForSend</span><span class="token punctuation">(</span><span class="token class-name">SendFuture</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token class-name">Receiver</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;&gt;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
<span class="ln-num" data-num="5"></span><span class="token punctuation">}</span>
<span class="ln-num" data-num="6"></span>
<span class="ln-num" data-num="7"></span><span class="token keyword">impl</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span> <span class="token class-name">Future</span> <span class="token keyword">for</span> <span class="token class-name">Forward</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="8"></span>	<span class="token keyword">type</span> <span class="token class-name">Output</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="9"></span>	<span class="token keyword">fn</span> <span class="token function-definition function">poll</span><span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token keyword">mut</span> <span class="token keyword">self</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Poll</span><span class="token operator">&lt;</span><span class="token keyword">Self</span><span class="token punctuation">::</span><span class="token class-name">Output</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="10"></span>		<span class="token keyword">match</span> <span class="token keyword">self</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="11"></span>			<span class="token class-name">Forward</span><span class="token punctuation">::</span><span class="token class-name">WaitingForReceive</span><span class="token punctuation">(</span>recv<span class="token punctuation">,</span> tx<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="12"></span>				<span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span><span class="token punctuation">(</span>rx<span class="token punctuation">,</span> v<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token operator">=</span> recv<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="13"></span>					<span class="token keyword">let</span> tx <span class="token operator">=</span> tx<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="14"></span>					<span class="token operator">*</span><span class="token keyword">self</span> <span class="token operator">=</span> <span class="token class-name">Forward</span><span class="token punctuation">::</span><span class="token class-name">WatingForSend</span><span class="token punctuation">(</span>tx<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>v<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>rx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="15"></span>					<span class="token comment">// 尝试在sending上推进</span>
<span class="ln-num" data-num="16"></span>					<span class="token keyword">return</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="17"></span>				<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="18"></span>					<span class="token comment">// 没有更多项</span>
<span class="ln-num" data-num="19"></span>					<span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="ln-num" data-num="20"></span>				<span class="token punctuation">}</span>
<span class="ln-num" data-num="21"></span>			<span class="token punctuation">}</span>
<span class="ln-num" data-num="22"></span>			<span class="token class-name">Forward</span><span class="token punctuation">::</span><span class="token class-name">WatingForSend</span><span class="token punctuation">(</span>send<span class="token punctuation">,</span> receiver<span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="23"></span>				<span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span>tx<span class="token punctuation">)</span> <span class="token operator">=</span> send<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="24"></span>					<span class="token keyword">let</span> rx <span class="token operator">=</span> rx<span class="token punctuation">.</span><span class="token function">take</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">unwrap</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="25"></span>					<span class="token operator">*</span><span class="token keyword">self</span> <span class="token operator">=</span> <span class="token class-name">Forward</span><span class="token punctuation">::</span><span class="token class-name">WaitingForReceive</span><span class="token punctuation">(</span>rx<span class="token punctuation">.</span><span class="token function">receive</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>tx<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="26"></span>					<span class="token comment">// 尝试在receiving上推进</span>
<span class="ln-num" data-num="27"></span>					<span class="token keyword">return</span> <span class="token keyword">self</span><span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="28"></span>				<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="29"></span>					<span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Pending</span>
<span class="ln-num" data-num="30"></span>				<span class="token punctuation">}</span>
<span class="ln-num" data-num="31"></span>			<span class="token punctuation">}</span>
<span class="ln-num" data-num="32"></span>		<span class="token punctuation">}</span>
<span class="ln-num" data-num="33"></span>	<span class="token punctuation">}</span>
<span class="ln-num" data-num="34"></span><span class="token punctuation">}</span>
<span class="ln-eof"></span></code></pre>
<p>你几乎不用在Rust中编写这样的代码，但是它给了你其底层是如何工作的重要见解，所以，我们谈论下它们。首先，我们定义我们的future类型为一个<code>enum</code>，用于跟踪我们当前正在等待什么。这是由于当我们返回了<code>Poll::Pending</code>，下一个<code>poll</code>调用将会在方法顶部开始执行，我们需要一些手段来了解我们之前正在做什么，这样我们就知道应该继续进行哪一个操作了。此外，我们需要持续跟踪不同的信息，这取决于我们当前正在做什么：如果我们正在等待一个<code>receive</code>结束，我们需要保存<code>ReceiveFuture</code>（它的定义没有在这个示例中展示）为了我们在下次自己被轮询时轮询它。对于<code>SendFuture</code>也一样，这里的<code>Options</code>可能让你感到奇怪，我们将会在稍后看回到这里。</p>
<p>当我们为<code>Forward</code>实现<code>Future</code>时，我们定义了它的输出类型为<code>()</code>，因为这个future并不实际地返回任何东西，取而代之，当future完成了从输入通道到输出通道的所有的转发后，它会解决（没有任何结果）。在一个更复杂的示例中，我们的转发类型的<code>Output</code>可能是一个<code>Result</code>，这样它就可以把来自<code>receive()</code>和<code>send()</code>的错误传回堆栈，传给正在轮询转发完成的函数。但是这个代码已经足够复杂了，所以我们把它留到以后再说。</p>
<p>当<code>Forward</code>被轮询，它需要恢复到它上次离开的位置，这是通过<code>match</code>匹配当前保存在<code>self</code>上的enum变体实现的。不论我们进入哪个分支，第一步都是轮询阻塞当前操作进度的future，如果我们正尝试接收，我们轮询<code>ReceiveFuture</code>，如果我们正尝试发送，我们轮询<code>SendFuture</code>。如果调用<code>poll</code>返回了一个<code>Poll::Pending</code>，我们可以不做任何推进，我们也返回<code>Poll::Pending</code>，但是如果当前的future解决了，我们必须推进！</p>
<p>当一个内部future解决，我们必须通过切换<code>self</code>中保存的enum变体来更新当前的操作。为了这样做，我们必须移出<code>self</code>，以调用<code>Receiver::reveive</code>或<code>Sender::send</code>——但我们不能这样做，因为我们只有一个<code>&amp;mut self</code>。所以，我们保存了需要移动的状态到一个<code>Option</code>中，我们会使用<code>Option::take</code>将它移出。这有点愚蠢，因为我们无论如何都要重写self，并且<code>Option</code>永远为<code>Some</code>，但为了让借用检查器开心，我们需要用上这些技巧。</p>
<blockquote>
<p>原文：When one of the inner futures resolves, we need to update what the current operation is by switching which enum variant is stored in self. In order to do so, we have to move out of self to call Receiver::receive or Sender::send—but we can’t do that because all we have is &amp;mut self. So, we store the state we have to move in an Option, which we move out of with Option::take. This is silly since we’re about to overwrite self anyway, and hence the Options will always be Some, but sometimes tricks are needed to make the borrow checker happy.</p>
</blockquote>
<p>最后，如果我们确实取得了进展，我们会再次轮询自己。因此，（上面的代码中）如果我们可以立即在pending的send或receive上去的进展，我们就轮询了自己。实际上，当你要实现一个真实的<code>Future</code>trait时，为了正确性，这样做是必要的。我们会在稍后讨论它，现在，你可以认为这是一种优化。</p>
<p>我们刚刚手写了一个状态机：一种具有几种可能的状态，并且在接收到特定事件时在这些状态间转换的类型。这只是一个十分简单的状态机，想象你必须为更复杂的用例（其中有额外的中间步骤）编写这样的代码！</p>
<p>除了编写笨拙的状态机之外，我们必须知道<code>Sender::send</code>和<code>Receiver::receive</code>返回的future类型让我们可以将它们存储在自己的类型中。如果这些方法没有返回<code>impl Future</code>，我们不可能写出我们的变体类型。这个<code>send</code>和<code>receive</code>方法也必须持有<code>sender</code>以及<code>receiver</code>的所有权，如果它们没有，它们返回的future将与<code>self</code>借用绑定在一起，其生命周期将在我们从<code>poll</code>中返回时结束。这是行不通的，因为我们尝试将这些future存储在<code>self</code>中。</p>
<blockquote>
<p><strong>注意</strong>：你可能已经注意到了，<code>Receiver</code>看起来很像一个异步版本的<code>Iterator</code>。其他人也注意到了这件事，并且标准库正准备为能够有意义地实现<code>poll_next</code>的类型添加一个特质。接下来，这些异步迭代器（通常被称为流）最终可能会有一流的语言支持，比如直接在它们上面进行循环的能力。</p>
</blockquote>
<p>最后，这个代码很难编写，很难阅读，并且很难修改。比如如果我们想添加错误处理，代码的复杂度将显著提高！很幸运，现在有一条更好的路。</p>
<h2 id="asyncawait">async/await<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#asyncawait" class="esa-anchor">#</a></h2>
<p>Rust 1.39给了我们<code>async</code>关键字，以及和它紧密相关的<code>await</code>后缀操作符，我们在Listing8.3中用到了它们。它们提供了一种更加便捷的机制来编写像Listing8.5中那样的异步状态机。特别的，它们让你可以以一种甚至看起来不像状态机的方式编写代码。</p>
<pre class="highlighter-prismjs language-rust prismjs-lines-highlighted code-theme-dark" highlighted="true"><code class="highlighter-prismjs language-rust hljsln"><span class="ln-bg"></span><span class="ln-num" data-num="1"></span><span class="token comment">// Listing 8-5</span>
<span class="ln-num" data-num="2"></span><span class="token keyword">async</span> <span class="token keyword">fn</span> <span class="token function-definition function">forward</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>rx<span class="token punctuation">:</span> <span class="token class-name">Receiver</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> tx<span class="token punctuation">:</span> <span class="token class-name">Sender</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="3"></span>	<span class="token keyword">while</span> <span class="token keyword">let</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">=</span> rx<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">await</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="4"></span>		tx<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">await</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="5"></span>	<span class="token punctuation">}</span>
<span class="ln-num" data-num="6"></span><span class="token punctuation">}</span>
<span class="ln-eof"></span></code></pre>
<p>如果你没有关于<code>async</code>和<code>await</code>的经验，Listing8-4和Listing8-5之间的区别可能让你了解到为什么Rust社区对它们的出现如此兴奋。但因为这只是一本中级的书，我们得再深入一些，我们要理解这么短的代码片段是怎样能够替换掉那么长的手动实现的。为了做到这一点，我们首先需要聊一聊<code>generators</code>（生成器）——<code>async</code>和<code>await</code>的实现机制。</p>
<h3 id="生成器">生成器<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#生成器" class="esa-anchor">#</a></h3>
<p>简单来说，生成器是一块代码，以及一些编译器生成的额外位，使其能够在执行中途停止或让步（yield），稍后可以在其最后让步的位置恢复执行。举个例子吧，让我们捡起Listing8-3中的<code>forward</code>函数，想象它调用了<code>send</code>，但是当前通道是满的，函数无法做任何推进，但是它也不能阻塞（不论怎么说，它是非阻塞代码），所以它需要返回。现在，假设通道最终被清空了，并且我们想要执行send，如果我们继续从顶部调用<code>forward</code>，那么它会再次调用<code>next</code>，于是上一次的发送尝试就将会丢失，这并不是我们所期待的。所以，我们将<code>forward</code>转换成了一个生成器。</p>
<p>当<code>forward</code>生成器无法推进进度时，它需要存储当前的状态到某些位置，以至于它最终能够恢复执行，它需要恢复到一个正确的位置并有着正确的状态。它会通过一个编译器生成的关联数据结构来保存状态，这个数据结构包含生成器在给定时间点的所有状态。然后，这个数据结构上的一个方法（也是生成的）允许生成器从该数据结构当前的状态恢复（保存在<code>&amp;mut self</code>中），并且当生成器再度无法推进时，重新更新状态。</p>
<p>这个“返回，但允许在稍后继续”的操作被称作让步（yielding），其有效的代表了在返回时保存一些额外状态，当我们稍后想要恢复一个<code>forward</code>的调用时，我们调用生成器的众所周知的入口（<code>resume</code>方法，也就是<code>async</code>生成器的<code>poll</code>），生成器会检查之前存储在<code>self</code>中的状态来决定接下来要做什么。这实际上和我们在Listing8-4中手动做的事情一样，换句话说，Listing8-5（async/await forward）中的代码大致等同于Listing8-6中的代码：</p>
<pre class="highlighter-prismjs language-rust prismjs-lines-highlighted code-theme-dark" highlighted="true"><code class="highlighter-prismjs language-rust hljsln"><span class="ln-bg"></span><span class="ln-num" data-num="1"></span><span class="token comment">// Listing 8-6</span>
<span class="ln-num" data-num="2"></span><span class="token keyword">fn</span> <span class="token function-definition function">forward</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>rx<span class="token punctuation">:</span> <span class="token class-name">Receiver</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> tx<span class="token punctuation">:</span> <span class="token class-name">Sender</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="3"></span>    <span class="token keyword">loop</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="4"></span>        <span class="token keyword">let</span> <span class="token keyword">mut</span> f <span class="token operator">=</span> rx<span class="token punctuation">.</span><span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="5"></span>        <span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span> <span class="token operator">=</span> f<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> r <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">yield</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="6"></span>        <span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span> <span class="token operator">=</span> r <span class="token punctuation">{</span>
<span class="ln-num" data-num="7"></span>            <span class="token keyword">let</span> <span class="token keyword">mut</span> f <span class="token operator">=</span> tx<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>t<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="8"></span>            <span class="token keyword">let</span> _ <span class="token operator">=</span> <span class="token keyword">if</span> <span class="token keyword">let</span> <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span> <span class="token operator">=</span> f<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> r <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">yield</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="9"></span>        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token keyword">break</span> <span class="token class-name">Poll</span><span class="token punctuation">::</span><span class="token class-name">Ready</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
<span class="ln-num" data-num="10"></span>    <span class="token punctuation">}</span>
<span class="ln-num" data-num="11"></span><span class="token punctuation">}</span>
<span class="ln-eof"></span></code></pre>
<p>当然，在我编写该书时，生成器实际还不能在Rust中使用——它们只能被编译器内部使用以实现<code>async/await</code>——但在未来可能有所改善。生成器在很多地方都非常好用，比如可以无需携带一个<code>struct</code>实现迭代器，或者实现一个<code>impl Iterator</code>，它知道如何一次生成一个条目。</p>
<p>如果你仔细观察了Listing8-5以及Listing8-6，它们看起来可能有些神奇。你知道每一个<code>await</code>或<code>yield</code>都实际从函数中返回了，总之，函数中有许多的本地变量，它并不清楚在稍后恢复执行时如何恢复它们，而这就是编译器所生成的部分。编译器透明的注入了代码来持久化这些变量到生成器关联的数据结构中，而不是在执行时从栈内读取它们。所以，如果你定义了一个本地变量<code>a</code>、写入或者读取它，你实际上在操作类似于<code>self.a</code>的东西，问题解决！这真的很神奇！</p>
<p>在手动<code>forward</code>实现和<code>async/await</code>版本的实现之间，一个微小但重要的不同是，后者可以在让步点之间持有引用。这让像Listing8-5中的<code>Receiver::next</code>以及<code>Sender::send</code>这样的函数可以持有<code>&amp;mut self</code>而不只是Listing8-4中的<code>self</code>。如果我们在手动的状态机实现中的这些方法里尝试使用一个<code>&amp;mut self</code>接收器，存储在<code>Forward</code>的<code>Recevier</code>不能在当<code>Receiver::next</code>被调用以及future返回解决时在其之间共享引用，借用检查器无法强迫这一点，所以，它将拒绝该代码。只有通过将<code>Receiver</code>移动到future中，我们才能说服编译器<code>Receiver</code>并不会在其它地方被访问。与此同时，使用<code>async/await</code>，借用检查器可以在编译器将它转换成状态机之前检查代码，并验证<code>rx</code>实际上在<code>await</code>返回时，一直到future销毁之后都不会再次访问。</p>
<blockquote>
<p>原文：One subtle but important difference between the manual forward implementation and the async/await version is that the latter can hold references across yield points. This enables functions like Receiver::next and Sender::send in Listing 8-5 to take &amp;mut self rather than the self they took in Listing 8-4.If we tried to use a &amp;mut self receiver for these methods in the manual state machine implementation, the borrow checker would have no way to enforce that the Receiver stored inside Forward cannot be referenced between when Receiver::next is called and when the future it returns resolves, and so it would reject the code. Only by moving the Receiver into the future can we convince the compiler that the Receiver is not otherwise accessible. Meanwhile, with async/await, the borrow checker can inspect the code before the compiler turns it into a state machine and verify that rx is indeed not accessed again until after the future is dropped, when the await on it returns.</p>
</blockquote>
<pre class="highlighter-prismjs language-text prismjs-lines-highlighted code-theme-dark" highlighted="true"><code class="highlighter-prismjs language-text hljsln"><span class="ln-bg"></span><span class="ln-num" data-num="1"></span>========== 生成器的大小 ==========
<span class="ln-num" data-num="2"></span>
<span class="ln-num" data-num="3"></span>用于备份生成器状态的数据结构必须能够保持在任意一个
<span class="ln-num" data-num="4"></span>让步点（yield point）的组合状态。如果你的async fn
<span class="ln-num" data-num="5"></span>包含一个[u8; 8192]，那么这个8KB的数据必须保存在生
<span class="ln-num" data-num="6"></span>成器内部，甚至如果你的async fn仅仅包含很小的本地
<span class="ln-num" data-num="7"></span>变量。它也必须包含它正在等待的任意一个future，因为
<span class="ln-num" data-num="8"></span>当它的poll被调用时，它必须能够在稍后去轮询这样的
<span class="ln-num" data-num="9"></span>future。
<span class="ln-num" data-num="10"></span>
<span class="ln-num" data-num="11"></span>这个嵌套意味着生成器，以及基于async函数或async块
<span class="ln-num" data-num="12"></span>的future，可以在你的代码中没有任何可以看见的大小增加
<span class="ln-num" data-num="13"></span>的情况下变得非常大。这可以反过来对你程序的运行时性能
<span class="ln-num" data-num="14"></span>带来冲击，因为这些巨大的生成器可能必须在函数调用间复
<span class="ln-num" data-num="15"></span>制，并在数据结构中进进出出，这需要相当多的内存复制。
<span class="ln-num" data-num="16"></span>事实上，当你的基于生成器的future的大小影响了性能时，
<span class="ln-num" data-num="17"></span>你通常可以通过查看在memcpy函数中的过量消耗来发现，
<span class="ln-num" data-num="18"></span>你可以在你应用程序的性能概要中查看。
<span class="ln-num" data-num="19"></span>
<span class="ln-num" data-num="20"></span>找到这些大的future并不总是容易的，相反，经常需要手动
<span class="ln-num" data-num="21"></span>的识别长而复杂的async函数链。Clippy可能能够在未来
<span class="ln-num" data-num="22"></span>帮助你，但是在写作时，你还必须靠你自己。当你找到一个
<span class="ln-num" data-num="23"></span>十分大的future，你有两个选择：你可以尝试减少async
<span class="ln-num" data-num="24"></span>函数所需要的本地状态，或者你可以移动future到堆中（通
<span class="ln-num" data-num="25"></span>过 <code>Box::pin</code>），因此，移动future仅仅需要移动它的指针。
<span class="ln-num" data-num="26"></span>一直以来，后一个是最简单的办法，但是它也需要引入一些
<span class="ln-num" data-num="27"></span>额外的分配以及一个指针重定向。你最好把有问题的future
<span class="ln-num" data-num="28"></span>放在堆上，测量你的性能，然后使用你的性能基准来指导您。
<span class="ln-eof"></span></code></pre>
<h2 id="固定和取消固定">固定和取消固定<button class="cnblogs-toc-button" title="显示目录导航" aria-expanded="false"></button><a href="#固定和取消固定" class="esa-anchor">#</a></h2>
<p>我们还没有结束，尽管生成器很简洁，但还有一个我之前提到的技术挑战。特别地，我们还不清楚如果生成器中的代码（或者说<code>async</code>块）拿了本地变量的一个引用会发生什么。在Listing8-5中，如果下一个消息不是立即可用的，<code>rx.next()</code>返回的<code>future</code>必须持有一个到<code>rx</code>的引用，以让它知道当生成器下一次恢复时，它应该去哪尝试。当生成器让步，future以及它的引用被隐藏在生成器中。但是如果现在生成器被移动了，会发生什么？看Listing8-7中的代码，它调用了<code>forward</code></p>
<pre class="highlighter-prismjs language-rust prismjs-lines-highlighted code-theme-dark" highlighted="true"><code class="highlighter-prismjs language-rust hljsln"><span class="ln-bg"></span><span class="ln-num" data-num="1"></span><span class="token comment">// Listing 8-7</span>
<span class="ln-num" data-num="2"></span><span class="token keyword">async</span> <span class="token keyword">fn</span> <span class="token function-definition function">try_forward</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>rx<span class="token punctuation">:</span> <span class="token class-name">Receiver</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">,</span> tx<span class="token punctuation">:</span> <span class="token class-name">Sender</span><span class="token operator">&lt;</span><span class="token class-name">T</span><span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">-&gt;</span> <span class="token class-name">Option</span><span class="token operator">&lt;</span><span class="token keyword">impl</span> <span class="token class-name">Future</span><span class="token operator">&gt;</span> <span class="token punctuation">{</span>
<span class="ln-num" data-num="3"></span>	<span class="token keyword">let</span> <span class="token keyword">mut</span> f <span class="token operator">=</span> <span class="token function">forward</span><span class="token punctuation">(</span>rx<span class="token punctuation">,</span> tx<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="ln-num" data-num="4"></span>	<span class="token keyword">if</span> f<span class="token punctuation">.</span><span class="token function">poll</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">is_pending</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token class-name">Some</span><span class="token punctuation">(</span>f<span class="token punctuation">)</span> <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token class-name">None</span> <span class="token punctuation">}</span>
<span class="ln-num" data-num="5"></span><span class="token punctuation">}</span>
<span class="ln-eof"></span></code></pre>
<p><code>try_forward</code>函数只轮询<code>forward</code>一次，以便在不阻塞的情况下尽可能多的转发消息。如果接收者依然可能生产更多消息（就是当他返回<code>Poll::Pending</code>而不是<code>Poll::Ready(None)</code>），通过给调用者返回转发future，调用者可能选择在它认为合适的时间重新轮询，于是这些消息在后面的某一时间被延期转发。</p>
<p>让我们用迄今为止对<code>async</code>以及<code>await</code>的了解来看看发生了什么。当我们轮询<code>forward</code>生成器时，它已经穿过了一个<code>while</code>循环不知多少次，并且如果接收者结束，它最终会返回<code>Poll::Ready(())</code>，或者其它情况，它会返回<code>Poll::Pending</code>，如果它返回<code>Poll::Pending</code>，生成器包含了一个从<code>rx.next()</code>或<code>tx.send(t)</code>中返回的future。这些future都包含了一个最初提供给<code>forward</code>的参数（分别是<code>rx</code>和<code>tx</code>）的引用，这是必须被保存在生成器中的。但是，当<code>try_forward</code>返回整个生成器，该生成器的属性也发生移动了。或许，<code>rx</code>和<code>tx</code>已经不在内存中的同一位置了，并且存储在隐藏的future中的引用也已经无法指向正确的数据。</p>

</div>
`;
</script>

<template>
  <HeaderVue title="章节"></HeaderVue>
  <div class="c-layout">
    <div class="side">
      <div class="toc">
        <div class="title">算法入门</div>

        <div class="toc-item" v-for="item in 9">
          <a href="">寻找牛刀，以便小试</a>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="markdown" v-html="content"></div>
      <div class="foot">
        <div class="prev"><a href="#">上一章</a></div>
        <div class="next"> <a href="">下一章</a></div>
      </div>
    </div>
    <!-- <div class="tools">
      工具箱
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.c-layout {
  margin-top: 16px;
  display: flex;
  align-items: flex-start;

  .side {
    flex: 0 0 196px;
    padding: 12px 12px 20px 12px;

    .title {
      font-size: 20px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 8px;
    }

    .toc-item {
      font-size: 14px;
      margin-bottom: 4px;
    }

    background-color: #fff;
  }

  .main {
    background-color: #fff;
    padding: 12px 20px;
    margin-left: 16px;
    flex: 0 0 694px;

    .foot {
      display: flex;
      justify-content: space-between;
      padding: 12px 20px;
      font-size: 20px;
      border-top: 1px solid #ccc;
    }
  }

  .tools {
    flex: 1;
    background-color: #fff;
    margin-left: 12px;
  }
}
</style>