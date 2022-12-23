<script  lang="ts" setup>
import { computed } from 'vue';
import { renderMarkdown } from '@/lib';

// vars
const props = defineProps<{
  markdown: string,
}>();

const htmlContent = computed(() => {
  return renderMarkdown(props.markdown);
});
</script>

<template>
  <div class="markdown" v-html='htmlContent'></div>
</template>

<style lang="scss" scoped>
.markdown {
  ul {
    list-style-type: disc;

    li {
      display: list-item;
      padding-left: 4px;
      text-align: -webkit-match-parent;
    }
  }
}
</style>