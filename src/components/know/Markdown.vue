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

</style>