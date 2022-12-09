<script setup lang="ts">
import { onMounted, ref } from 'vue';
import type { RouterLink } from 'vue-router';
import { getImageColor } from '@/lib';

// vars
const props = defineProps<{
  icon: string,
  // bgColor: string,
  name: string,
  href: string,
}>();

// states
const bgColor = ref("");
const img = ref<HTMLImageElement>();

onMounted(async () => {
  // Make sure image is finished loading
  // if (img.value?.complete) {
  //   getImageColor(img.value);
  // } else {
  //   img.value?.addEventListener('load', function () {
  //     getImageColor(img.value as HTMLImageElement);
  //   });
  // }
})
</script>

<template>
  <div class="star">
    <RouterLink :to="href">
      <div class="icon" :style="{ backgroundColor: bgColor }"><img :src="icon" alt="图标" ref="img"></div>
      <div class="name">{{ name }}</div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.star {
  margin: 16px 24px;
  width: 100px;

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
    margin: auto;

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