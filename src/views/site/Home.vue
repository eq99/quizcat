<script setup lang="ts">
import Star from '@/components/site/Star.vue';
import Galaxy from '@/components/Galaxy.vue';
import Header from "@/components/site/Header.vue"

const stars = [
  {
    id: 1,
    name: "知识宇宙",
    imgUrl: 'https://pic.imgdb.cn/item/639338d5b1fccdcd362fecc2.png',
    link: '/know',
    bgColor: ''
  },
  {
    id: 1,
    name: "时尚达人",
    imgUrl: 'https://pic.imgdb.cn/item/63933d7fb1fccdcd363898e3.png',
    link: "/",
    bgColor: ''
  },
]
</script>

<template>
  <Header title="我的桌面"></Header>
  <div class="container space">
    <Star v-for="star in stars" :icon="star.imgUrl" :name="star.name" bgColor="bg-grey" :href="star.link"></Star>
  </div>
</template>

<style lang="scss" scoped>
.space {
  display: flex;
  justify-content: center;
  padding: 36px 72px;
}
</style>