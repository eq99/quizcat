<script lang="ts">
// @ts-nocheck
import { quizs } from '@/apis/quiz';
import { debounce, renderMarkdown } from '@/lib';


const quizKinds = ["简答题"];


export default {
	name: 'Quiz',
	props: [],
	// components: {
	//   Child,
	// },
	data() {
		return {
			quizs: [],
			curIndex: 0,
			isSolutionShow: false,
			answer: "",
			debounceInput: () => { },
		}
	},

	computed: {
		quizKind() {
			return quizKinds[this.quizs[this.curIndex]?.kind] || "简答题";
		},

		quizLevel() {
			return '★'.repeat(this.quizs[this.curIndex]?.level);
		},

		htmlContent() {
			return renderMarkdown(this.quizs[this.curIndex]?.content)
		},
		htmlSolution() {
			return renderMarkdown(this.quizs[this.curIndex]?.solution)
		}
	},

	methods: {
		// 批量加载 quiz
		getQuizs() {
			this.quizs = quizs;
		},

		nextQuiz() {
			if (this.curIndex + 1 < this.quizs.length) {
				this.gotoQuiz(this.curIndex + 1)
			} else {
				alert("题目做完啦")
			}
		},

		prevQuiz() {
			if (this.curIndex > 0) {
				this.gotoQuiz(this.curIndex - 1);
			} else {
				alert("已经是第一个啦");
			}
		},

		showSolution() {
			this.isSolutionShow = !this.isSolutionShow;
		},

		gotoQuiz(idx: number) {
			// 隐藏解析区
			this.isSolutionShow = false;
			// 更新题号
			this.curIndex = idx;
			// 加载我的答案
			this.answer = this.quizs[this.curIndex].answer || "";
		},

		handleInput() {
			// save answer to quiz object
			this.quizs[this.curIndex]["answer"] = this.answer;
		},
	},

	mounted() {
		this.debounceInput = debounce(this.handleInput, 1000);
		this.getQuizs();
	},
}
</script>

<template>
	<div class="q-box">
		<div class="q-side">
			<h3 class="q-tips">练习喵为你准备了 {{ quizs.length }} 道练习</h3>
			<nav class="q-nav">
				<div class="nav-item " :class="{ active: quiz.answer }" v-for="(quiz, idx) in quizs"
					@click="gotoQuiz(idx)">
					{{ idx + 1 }}
				</div>
			</nav>
		</div>

		<div class="q-card">
			<div class="q-head">
				<span class="q-id">{{ curIndex + 1 }}</span>
				<span class="q-type">[{{ quizKind }}]</span>
				<span class="q-level">{{ quizLevel }}</span>
			</div>
			<div class="q-body">
				<div class="markdown" v-html='htmlContent'></div>
			</div>
			<div class="q-input-box">
				<textarea class="q-input" rows="10" placeholder="随便写写" v-model="answer"
					@input="debounceInput"></textarea>
			</div>
			<div class="q-action">
				<button class="btn" @click="showSolution">查看解析</button>
				<button class="btn ms-auto" @click="prevQuiz">上一题</button>
				<button class="btn " @click="nextQuiz">下一题</button>
			</div>
			<div class="q-solution" v-show="isSolutionShow">
				<div class="markdown" v-html="htmlSolution"></div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.q-box {
	display: flex;
	align-items: flex-start;
	padding-top: 8px;
}

.q-side {
	flex-shrink: 0;
	width: 300px;
	background-color: var(--bg-primary);
	margin: 0 8px;
	padding: 1rem 1rem 3rem 1rem;
}

.q-side .q-tips {
	color: var(--fg-primary);
	margin-bottom: 3rem;
}

.q-side .q-nav {
	display: flex;
	flex-wrap: wrap;
}

.q-side .q-nav .nav-item {
	background-color: var(--bg-secondary);
	padding: 1rem 1.5rem;
	margin-right: 1rem;
	margin-bottom: 1rem;
	cursor: pointer;
}

.q-side .q-nav .nav-item.active {
	background-color: var(--bg-green);
	color: var(--fg-green);
}

.q-card {
	width: 60%;
}

.q-head {
	padding: 8px 16px;
	background-color: var(--bg-secondary);

	display: flex;
	align-items: center;
}

.q-head .q-id {
	font-size: 24px;
	color: var(--fg-primary);
}

.q-head .q-id::after {
	content: ".";
	margin-right: 5px;
}

.q-head .q-level {
	color: var(--fg-gold);
	margin: 0 8px;
}

.q-body {
	background-color: var(--bg-primary);
	padding: 1rem .5rem 1rem 2rem;
}

.q-input {
	width: 100%;
	padding: 1rem 1rem 1rem 2rem;
	line-height: 1.5;
	resize: vertical;
	min-height: 6em;
	border: 1px solid transparent;
}

.q-input:focus {
	border-color: var(--fg-primary);
}

.q-action {
	display: flex;
}

.btn {
	cursor: pointer;
	padding: 1rem 2rem;
	margin-right: 1rem;
	background-color: var(--bg-primary);
	color: var(--fg-primary);
}

.q-solution {
	border: 1px solid var(--fg-primary);
	margin-top: 1rem;
	padding: 1rem;
}
</style>