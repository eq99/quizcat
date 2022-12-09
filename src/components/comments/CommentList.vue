<script  lang="ts" setup>
import Comment from "./Comment.vue";
import type { Comment as CommentT } from '@/types';

// vars
const props = defineProps<{
  articleId: string | number,
}>();

// states
const comments: CommentT[] = [
  {
    id: 1,
    likeNum: 12345,
    articleId: 12,
    updatedAt: '2022-12-02 12:30',
    content: '草 莓 是 怎 样 疯 掉 的🍓',
    userId: 12,
    avatar: 'https://api.multiavatar.com/f2d85385.png',
    username: '萝卜头'
  },
  {
    id: 1,
    likeNum: 12345,
    articleId: 12,
    updatedAt: '2022-12-02 12:30',
    content: '玩因游和不玩因游的都沉默了[脱单doge]',
    userId: 12,
    avatar: 'https://api.multiavatar.com/f2d835385.png',
    username: '甜心菜'
  },
  {
    id: 1,
    likeNum: 12345,
    articleId: 12,
    updatedAt: '2022-12-02 12:30',
    content: '我和阿婆主同一间病房的，他剪视频，我剪他吊瓶[OK][OK]',
    userId: 12,
    avatar: 'https://api.multiavatar.com/f2d85385s.png',
    username: '辣椒油'
  },  
];
</script>

<template>
  <div class="comments">
    <Comment v-for="comment in comments" :comment="comment"></Comment>
  </div>
</template>

<style lang="scss" scoped>

</style>