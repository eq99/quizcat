<script  lang="ts" setup>
import { ref } from 'vue';

// states
const isShown = ref(false);

function handleShown() {
  isShown.value = !isShown.value;
}

function handleMouseLeave() {
  isShown.value = false;
}
</script>

<template>
  <div class="abuse" @mouseleave="handleMouseLeave">
    <i class="iconfont icon-dots" @click="handleShown"></i>
    <div class="blank"></div>
    <div class="menu" v-show="isShown">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.abuse {
  margin-left: auto;
  position: relative;
  z-index: 0;

  .iconfont {
    cursor: pointer;

    &:hover {
      color: var(--fg-primary);
    }
  }

  .blank {
    height: 30px;
    width: 90px;
    background-color: transparent;
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }

  .menu {
    width: 90px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 8px #999;
    border-radius: 4px;
    overflow: hidden;

    position: absolute;
    right: 0;
  }
}
</style>