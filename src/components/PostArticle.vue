<script setup lang="ts">
import type { PostArticle } from '@/types';

//types
export interface Props {
  detail: PostArticle
}

//vars
const props = defineProps<Props>();
</script>

<template>
  <a :href="detail.link" class="s2">
    {{ detail.content }}
  </a>
</template>

<style scoped lang="scss">
a {
  font-size: 14px;
}
</style>