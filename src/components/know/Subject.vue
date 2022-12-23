<script  lang="ts" setup>
// types
export interface Subject {
  id: number,
  cover: string,
  name: string
}

// vars
const props = defineProps<{
  subject: Subject,
}>();
</script>

<template>
  <div class="subject">
    <RouterLink :to="`/book/${subject.id}`">
      <div class="cover"><img :src="subject.cover" alt="封面">
      </div>
      <div class="name">{{ subject.name }}</div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.subject {
  .cover {
    height: 140px;
    overflow: hidden;
  }

  .name {
    text-align: center;
  }
}
</style>