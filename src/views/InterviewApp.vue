<script lang="ts" setup>
import Header from '@/components/Header.vue';
</script>

<template>
  <Header name="面试喵" homenav="/interviews"></Header>
  <RouterView></RouterView>
</template>

<style scoped lang="scss">
.b-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 60px;
}
</style>