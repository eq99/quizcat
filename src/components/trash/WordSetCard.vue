<script setup lang="ts">
defineProps<{
  setid: number,
  cover: string,
  title: string,
}>()
</script>

<template>
  <div class="word-card col-5">
    <RouterLink :to="`/words/${setid}`">
      <div class="cover"><img :src="cover" alt="">
      </div>
      <div class="title s1">{{ title }}</div>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.word-card {
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 0 8px;

  transition: .4s;

  &:hover {
    transform: scale(1.05);

    .title {
      color: var(--pink4);
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

  .title {
    margin-top: 8px;
    padding-right: 8px;
  }
}
</style>