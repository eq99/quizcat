<script  lang="ts" setup>
import UserBar from '@/components/UserBar.vue';
import { renderMarkdown, formatTime } from '@/lib';
import type { ISolution } from '@/types';
import { computed } from 'vue';


// vars
const props = defineProps<{
  solution: ISolution
}>()

// computed
const htmlSolution = computed(() => {
  return renderMarkdown(props.solution.content);
});

const userbar = computed(() => {
  return {
    id: props.solution.userid,
    name: props.solution.username,
    avatar: props.solution.avatar,
  }
});
</script>

<template>
  <div class="s-card">
    <div class="s-hd">
      <UserBar :userbar="userbar"></UserBar>
      <div class="time">{{ formatTime(solution.updatedAt) }}</div>
    </div>
    <div class="s-body">
      <div class="markdown" v-html="htmlSolution"></div>
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