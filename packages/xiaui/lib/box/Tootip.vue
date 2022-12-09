<script  lang="ts" setup>
import { ref } from 'vue';

export interface Props {
  tip: string,
  position?: string,
}
// vars
const props = withDefaults(defineProps<Props>(), {
  position: "top"
});
let timer = 0;

// states
const isShown = ref(false);

// methods
function handleMouseEnter() {
  timer = window.setTimeout(() => {
    isShown.value = true;
    clearTimeout(timer);
  }, 1000)
}

function handleMouseLeave() {
  isShown.value = false;
  clearTimeout(timer)
}
</script>

<template>
  <div class="tooltip" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
    <div class="tip " :class="position" v-show="isShown"> {{ tip }}</div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  --bg: #666;

  .tip {
    white-space: nowrap;
    position: absolute;
    background-color: var(--bg);
    color: #fff;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;

    &::before {
      content: "";
      height: 0;
      width: 0;
      border-width: 4px;
      border-style: solid;
      position: absolute;

    }

    &.right {
      left: calc(100% + 4px);
      top: 50%;
      transform: translateY(-50%);
    }

    &.right::before {
      border-color: transparent var(--bg) transparent transparent;
      left: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    &.left {
      right: calc(100% + 4px);
      top: 50%;
      transform: translateY(-50%);
    }

    &.left::before {
      border-color: transparent transparent transparent var(--bg);
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
    }

    &.top {
      left: 50%;
      bottom: calc(100% + 4px);
      transform: translateX(-50%);
    }

    &.top::before {
      border-color: var(--bg) transparent transparent transparent;
      left: 50%;
      bottom: -8px;
      transform: translateX(-50%);
    }


    &.bottom {
      left: 50%;
      top: calc(100% + 4px);
      transform: translateX(-50%);
    }

    &.bottom::before {
      border-color: transparent transparent var(--bg) transparent;
      left: 50%;
      top: -8px;
      transform: translateX(-50%);
    }
  }
}
</style>