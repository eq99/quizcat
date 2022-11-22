<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { formatTime } from "@/lib";

import InterviewBook from '@/components/InterviewBook.vue';


import { getExcercises } from "@/apis/exercise";

// states

const books = [{
  id: 1,
  name: "JavaScript JavaScript JavaScript",
  cover: "https://cdn.pixabay.com/photo/2022/10/28/11/14/leaves-7552915_1280.png",
  createdAt: "'2022-11-21T06:07:39.833Z'",
  updatedAt: "'2022-11-21T06:07:39.833Z'",
},
{
  id: 2,
  name: "你好",
  cover: "https://cdn.pixabay.com/photo/2022/10/28/11/14/leaves-7552915_1280.png",
  createdAt: "'2022-11-21T06:07:39.833Z'",
  updatedAt: "'2022-11-21T06:07:39.833Z'",
},
{
  id: 3,
  name: "你好",
  cover: "https://cdn.pixabay.com/photo/2022/10/28/11/14/leaves-7552915_1280.png",
  createdAt: "'2022-11-21T06:07:39.833Z'",
  updatedAt: "'2022-11-21T06:07:39.833Z'",
},
{
  id: 4,
  name: "你好",
  cover: "https://cdn.pixabay.com/photo/2022/10/28/11/14/leaves-7552915_1280.png",
  createdAt: "'2022-11-21T06:07:39.833Z'",
  updatedAt: "'2022-11-21T06:07:39.833Z'",
},
{
  id: 4,
  name: "你好",
  cover: "https://cdn.pixabay.com/photo/2022/10/28/11/14/leaves-7552915_1280.png",
  createdAt: "'2022-11-21T06:07:39.833Z'",
  updatedAt: "'2022-11-21T06:07:39.833Z'",
},
{
  id: 5,
  name: "你好",
  cover: "https://cdn.pixabay.com/photo/2022/10/28/11/14/leaves-7552915_1280.png",
  createdAt: "'2022-11-21T06:07:39.833Z'",
  updatedAt: "'2022-11-21T06:07:39.833Z'",
}]

// life cicle
onMounted(async () => {

});
</script>

<template>
  <div class="b-list">
    <InterviewBook v-for="book in books" :key="book.id" :book="book"></InterviewBook>
  </div>
</template>

<style scoped lang="scss">
.b-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 60px;
}
</style>