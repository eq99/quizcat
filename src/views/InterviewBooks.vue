<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

import InterviewBook from '@/components/InterviewBook.vue';

import { getInterviewBooks } from "@/apis/interviews";
import { useInterviewStore } from '@/stores/interview';

import type { InterviewBook as InterviewBookT } from '@/types';


// types
interface States {
  books: InterviewBookT[],
}

// states
const states: States = reactive({
  books: [],
});

const interviewStore = useInterviewStore();
const { loadBooks } = interviewStore;

// life cicle
onMounted(async () => {
  states.books = await getInterviewBooks()
  loadBooks(states.books);
});
</script>

<template>
  <div class="b-list">
    <InterviewBook v-for="book in states.books" :key="book.id" :book="book"></InterviewBook>
  </div>
</template>

<style scoped lang="scss">
.b-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 60px;
}
</style>