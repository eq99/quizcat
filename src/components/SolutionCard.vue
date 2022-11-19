<script  lang="ts" setup>
import UserBar from '@/components/UserBar.vue';
import { renderMarkdown } from '@/lib';
import type { Solution } from '@/types';
import { computed } from 'vue';


// vars
const props = defineProps<{
  solution: Solution
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
    <UserBar :userbar="userbar"></UserBar>
    <div class="s-body">
      <div class="markdown" v-html="htmlSolution"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.s-card {
  margin-bottom: 12px;
  padding: 8px 12px 16px;
  background-color: var(--bg-base1);

  .s-body {
    margin-top: 16px;
    padding: 8px;
  }
}
</style>