  <!-- 应用中心词语：
    space: 宇宙空间
    star : 星球, 就是单个APP
    -->

<script setup lang="ts">
import Star from '@/components/Star.vue';
import Galaxy from '@/components/Galaxy.vue';
import HeaderSpace from "@/components/HeaderSpace.vue"
</script>


<template>
  <HeaderSpace></HeaderSpace>
  <div class="space-box">
    <div class="container space">
      <Galaxy name="温柔地球">
        <Star icon="/icons/yang.webp" name="练习咩" bgColor="bg-grey" href="/exs"></Star>
        <Star icon="/icons/gou.webp" name="单词汪" bgColor="bg-brown" href="/words"></Star>
      </Galaxy>
    </div>
  </div>
</template>


<style lang="scss" scoped>
body {
  background-color: var(--winter1);
}
</style>