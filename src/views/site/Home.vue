<script setup lang="ts">
import Star from '@/components/site/Star.vue';
import { useTitleStore } from '@/stores/site';
import Footer from "@/components/site/Footer.vue";

// vars
const stars = [
  {
    id: 1,
    name: "知识宇宙",
    imgUrl: 'https://pic.imgdb.cn/item/639338d5b1fccdcd362fecc2.png',
    link: '/know',
    bgColor: ''
  },
]

const { setTitle } = useTitleStore();
setTitle("我的桌面");
</script>

<template>
  <div class="container">
    <div class="main">
      <Star v-for="star in stars" :icon="star.imgUrl" :name="star.name" bgColor="bg-grey" :href="star.link"></Star>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-rows: 1fr auto;

  .main {
    display: flex;
    justify-content: center;
    padding: 36px 72px;
    flex: 1;
  }
}
</style>