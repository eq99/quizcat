<!-- 应用中心词语：
    space: 宇宙空间
    star : 星球, 就是单个APP
-->

<script setup lang="ts">
import Star from '@/components/Star.vue';
import Galaxy from '@/components/Galaxy.vue';
import SpaceHeader from "@/components/SpaceHeader.vue"
</script>


<template>
  <SpaceHeader></SpaceHeader>
  <div class="space-box">
    <div class="container space">
      <Galaxy name="温柔地球">
        <Star icon="/icons/yang.webp" name="作业喵" bgColor="bg-grey" href="/exs"></Star>
        <Star icon="/icons/gou.webp" name="单词喵" bgColor="bg-brown" href="/words"></Star>
        <Star icon="/icons/tu.webp" name="编程喵" bgColor="bg-pink" href="/play"></Star>
      </Galaxy>
    </div>
  </div>
</template>
