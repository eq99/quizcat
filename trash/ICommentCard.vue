<script  lang="ts" setup>
import UserBar from '@/components/UserBar.vue';
import { renderMarkdown, formatTime } from '@/lib';
import type { ICommentWithUser } from '@/types';
import { computed } from 'vue';

// vars
const props = defineProps<{
  comment: ICommentWithUser
}>();

// computed
const htmlContent = computed(() => {
  return renderMarkdown(props.comment.content);
});

const userbar = computed(() => {
  return {
    id: props.comment.userid,
    name: props.comment.username,
    avatar: props.comment.avatar,
  }
});
</script>

<template>
  <div class="s-card">
    <div class="s-hd">
      <UserBar :userbar="userbar"></UserBar>
      <div class="time">{{ formatTime(comment.updatedAt) }}</div>
    </div>
    <div class="s-body">
      <div class="markdown" v-html="htmlContent"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-card {
  margin: 12px 0;
  padding: 8px 12px 16px;
  background-color: var(--bg-base1);

  .s-hd {
    display: flex;
    align-items: center;

    .time {
      margin-left: auto;
      font-size: 12px;
      color: var(--fg-base2);
    }
  }

  .s-body {
    margin-top: 8px;
    margin-left: 48px;
  }
}
</style>