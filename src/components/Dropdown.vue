<script  lang="ts" setup>
import { ref } from 'vue';
import TransitionFade from '@/components/transitions/Fade.vue';

// types
export type Position = "bottom-center" | 'bottom-right' | 'bottom-left';

export interface Props {
  position?: Position
}

//vars
const props = withDefaults(defineProps<Props>(), {
  position: 'bottom-center'
});

// states
const isHidden = ref(true);

// methods
function hide() {
  isHidden.value = true;
}

function show() {
  isHidden.value = false;
}
</script>

<template>
  <div class="drop" @mouseenter="show" @mouseleave="hide">
    <div class="hd-box">
      <slot name='head'>
      </slot>
    </div>
    <TransitionFade>
      <div class="bd-box" v-show="!isHidden" :class="position">
        <slot name="body"></slot>
      </div>
    </TransitionFade>
  </div>
</template>

<style lang="scss" scoped>
.drop {
  display: inline-block;
  position: relative;

  .bd-box {
    position: absolute;
    z-index: 1;

    &.bottom-center {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }

    &.bottom-right {
      top: 100%;
      right: 0;
    }

    &.bottom-left {
      top: 100%;
      left: 0;
    }
  }
}
</style>