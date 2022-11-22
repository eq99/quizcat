<script  lang="ts" setup>
import { useRoute } from 'vue-router';

import UserBar from '@/components/UserBar.vue';
import Button from '@/components/buttons/Button.vue';
import ICommentCard from '@/components/ICommentCard.vue';
import { ref } from 'vue';

//vars
const route = useRoute();

// states
const isHidden = ref(true);

const comments = [
  {
    id: 1, voteNum: 0, updatedAt: '2022-11-22T00:02:36.465Z', IQuestionID: 1, content: '得分点 数据存储位置、生命周期、存储大小、写入方式、数据共享、发送请求时是否携带、应用场景 标准回答 Cookie、SessionStorage、 LocalStorage都是浏览器的本地存储。 它们的共同点：都是存储在浏览器本地的 它们的区别：cookie是由服务器端写入的，而SessionStorage、 LocalStorage都是由前端写入的，cookie的生命周期是由服务器端在写入的时候就设置好的，LocalStorage是写入就一直存在，除非手动清除，SessionStorage是页面关闭的时候就会自动清除。cookie的存储空间比较小大概4KB，SessionStorage、 LocalStorage存储空间比较大，大概5M。Cookie、SessionStorage、 LocalStorage数据共享都遵循同源原则，SessionStorage还限制必须是同一个页面。在前端给后端发送请求的时候会自动携带Cookie中的数据，但是SessionStorage、 LocalStorage不会 加分回答 由于它们的以上区别，所以它们的应用场景也不同，Cookie一般用于存储登录验证信息SessionID或者token，LocalStorage常用于存储不易变动的数据，减轻服务器的压力，SessionStorage可以用来检测用户是否是刷新进入页面，如音乐播放器恢复播放进度条的功能。', userid: 1, username: "哈哈", avatar: "https://images.nowcoder.com/images/20211213/688024883_1639371344326/D6969C98BC2C0947BA4D4AA0CDF33902?x-oss-process=image/resize,m_mfit,h_100,w_100"
  },
  {
    id: 2, voteNum: 0, updatedAt: '2022-11-22T00:02:36.465Z', IQuestionID: 1, content: '得分点 数据存储位置、生命周期、存储大小、写入方式、数据共享、发送请求时是否携带、应用场景 标准回答 Cookie、SessionStorage、 LocalStorage都是浏览器的本地存储。 它们的共同点：都是存储在浏览器本地的 它们的区别：cookie是由服务器端写入的，而SessionStorage、 LocalStorage都是由前端写入的，cookie的生命周期是由服务器端在写入的时候就设置好的，LocalStorage是写入就一直存在，除非手动清除，SessionStorage是页面关闭的时候就会自动清除。cookie的存储空间比较小大概4KB，SessionStorage、 LocalStorage存储空间比较大，大概5M。Cookie、SessionStorage、 LocalStorage数据共享都遵循同源原则，SessionStorage还限制必须是同一个页面。在前端给后端发送请求的时候会自动携带Cookie中的数据，但是SessionStorage、 LocalStorage不会 加分回答 由于它们的以上区别，所以它们的应用场景也不同，Cookie一般用于存储登录验证信息SessionID或者token，LocalStorage常用于存储不易变动的数据，减轻服务器的压力，SessionStorage可以用来检测用户是否是刷新进入页面，如音乐播放器恢复播放进度条的功能。', userid: 1, username: "哈哈", avatar: "https://images.nowcoder.com/images/20211213/688024883_1639371344326/D6969C98BC2C0947BA4D4AA0CDF33902?x-oss-process=image/resize,m_mfit,h_100,w_100"
  },
]

// methods
function showSolution() {
  isHidden.value = !isHidden.value;
}
</script>

<template>
  <div class="question">
    说一说cookie sessionStorage localStorage 区别？
  </div>

  <div class="write">
    <textarea class="input" rows="10" placeholder="写思路"></textarea>
  </div>

  <div class="solution" v-show="!isHidden">
    得分点 数据存储位置、生命周期、存储大小、写入方式、数据共享、发送请求时是否携带、应用场景 标准回答 Cookie、SessionStorage、 LocalStorage都是浏览器的本地存储。 它们的共同点：都是存储在浏览器本地的
    它们的区别：cookie是由服务器端写入的，而SessionStorage、
    LocalStorage都是由前端写入的，cookie的生命周期是由服务器端在写入的时候就设置好的，LocalStorage是写入就一直存在，除非手动清除，SessionStorage是页面关闭的时候就会自动清除。cookie的存储空间比较小大概4KB，SessionStorage、
    LocalStorage存储空间比较大，大概5M。Cookie、SessionStorage、
    LocalStorage数据共享都遵循同源原则，SessionStorage还限制必须是同一个页面。在前端给后端发送请求的时候会自动携带Cookie中的数据，但是SessionStorage、 LocalStorage不会 加分回答
    由于它们的以上区别，所以它们的应用场景也不同，Cookie一般用于存储登录验证信息SessionID或者token，LocalStorage常用于存储不易变动的数据，减轻服务器的压力，SessionStorage可以用来检测用户是否是刷新进入页面，如音乐播放器恢复播放进度条的功能。
  </div>

  <div class="actions">
    <Button @click="showSolution">查看解析</Button>
    <Button>保存答案</Button>
  </div>

  <div class="comment">
    <div class="comment-hd">分享区</div>
    <ICommentCard v-for="comment in comments" :comment="comment"></ICommentCard>
  </div>
</template>


<style lang="scss" scoped>
.question {
  padding: 12px 0;
  color: var(--fg-base4);
  font-size: 28px;
}

.solution {
  margin: 16px 0;
  border: 1px solid var(--fg-primary);
  padding: 12px;
}

.write {
  background-color: var(--bg-base1);

  textarea {
    width: 100%;
    padding: 16px;
    line-height: 1.75;

    resize: vertical;
  }
}

.actions {
  margin-top: 12px;
  display: flex;
}

.comment {
  padding-bottom: 28px;
}

.comment-hd {
  margin-top: 24px;
  color: var(--fg-base3);
}
</style>