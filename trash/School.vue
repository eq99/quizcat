<script  lang="ts" setup>

export interface Props {
  icon: string,
  name: string,
}

const props = defineProps<Props>();
</script>

<template>
  <div class="shcool container">
    <div class="hd">
      <i class="iconfont" :class="icon"></i>
      <h3 class="name">{{ name }}</h3>
    </div>
    <div class="bd">
      <slot></slot>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.shcool {
  padding: 20px 20px 0;

  .hd {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .iconfont {
      font-size: 24px;
      margin-right: 8px;
    }
  }

  .bd {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px;
  }
}
</style>