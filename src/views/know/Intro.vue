<script  lang="ts" setup>
import MarkdownVue from '@/components/know/Markdown.vue';
import { useBookStore } from '@/stores/book';
import { storeToRefs } from 'pinia';

//vars
const bookStore = useBookStore();


// states
const { book } = storeToRefs(bookStore);
</script>

<template>
  <div class="content">
    <MarkdownVue :markdown="book?.about || ''"></MarkdownVue>
  </div>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 16px;
}
</style>