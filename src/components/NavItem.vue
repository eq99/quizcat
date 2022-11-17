<script  lang="ts" setup>
import { RouterLink } from 'vue-router';
const props = defineProps<{
  link?: string,
  title: string,
  icon: string,
}>();
</script>

<template>
  <RouterLink :to="link" v-if="link">
    <div class="nav-item">
      <i class="iconfont icon1" :class="icon"></i>
      <span class="title">{{ title }}</span>
      <i class="iconfont icon-arrow"></i>
    </div>
  </RouterLink>

  <div class="nav-item" v-else>
    <i class="iconfont icon1" :class="icon"></i>
    <span class="title">{{ title }}</span>
    <i class="iconfont icon-arrow" v-if="link"></i>
  </div>
</template>


<style lang="scss" scoped>
.nav-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 4px 14px;
  border-radius: 8px;

  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, .1);
  }

  .icon1 {
    font-size: 24px;
  }

  .title {
    margin-left: 16px;
  }

  .icon-arrow {
    margin-left: auto;
  }
}
</style>