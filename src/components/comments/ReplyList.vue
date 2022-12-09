<script  lang="ts" setup>
import Reply from "./Reply.vue";
import type { Reply as ReplyT } from '@/types';

// vars
const props = defineProps<{
  commentId: string | number,
}>();

// states
const replies: ReplyT[] = [{
  id: 1,
  likeNum: 12345,
  commentId: 12,
  updatedAt: '2022-12-02 12:30',
  content: '回复 @少北呆又呆丶 :鬼泣大病区的排面，源自某个mod，把维吉尔的坐下的地方变成了大排档椅子',
  userId: 12,
  avatar: 'https://api.multiavatar.com/f2d853285.png',
  username: '甜心菜'
},];
</script>

<template>
  <div class="replies">
    <Reply v-for="reply in replies" :reply="reply"></Reply>
  </div>
</template>

<style lang="scss" scoped>

</style>