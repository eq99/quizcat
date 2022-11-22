<script  lang="ts" setup>
import type { InterviewBook } from '@/types'
const props = defineProps<{
  book: InterviewBook,
}>();
</script>

<template>
  <div class="card">
    <RouterLink :to="`/interviews/${book.id}`">
      <div class="cover"><img :src="book.cover" alt=""></div>
      <div class="name s1">{{ book.name }}</div>
    </RouterLink>
  </div>
</template>


<style lang="scss" scoped>
.card {
  width: 20%;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0 8px;

  transition: .4s;

  &:hover {
    transform: scale(1.05);

    .name {
      color: var(--fg-primary);
    }
  }

  .cover {
    width: 100%;
    height: 128px;
    border-radius: 8px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .name {
    margin-top: 8px;
    padding-right: 8px;
    text-align: center;

  }
}
</style>