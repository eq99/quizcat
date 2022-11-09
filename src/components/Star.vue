<script setup lang="ts">
import type { RouterLink } from 'vue-router';


defineProps<{
  icon: string,
  bgColor: string,
  name: string,
  href: string,
}>();
</script>

<template>
  <div class="star">
    <RouterLink :to="href">
      <div class="icon" :class="bgColor"><img :src="icon" alt="图标"></div>
      <div class="name">{{ name }}</div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.star {
  margin: 16px 24px;

  .bg-grey {
    background-color: rgba(154, 179, 195, 0.5);
  }

  .bg-brown {
    background-color: rgba(140, 98, 57, 0.5);
  }

  .bg-pink {
    background-color: #fad1ea;
  }

  .icon {
    width: 64px;
    height: 64px;
    border-radius: 16px;
    padding: 8px;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  .name {
    margin-top: 8px;
    text-align: center;
  }
}
</style>