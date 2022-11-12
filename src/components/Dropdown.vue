<script  lang="ts" setup>

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

</script>

<template>
  <div class="drop">
    <div class="hd-box">
      <slot name='head'>
      </slot>
    </div>
    <div class="bd-box" :class="position">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drop {
  display: inline-block;
  position: relative;

  &:hover,
  &.hover {
    .bd-box {
      visibility: visible;
    }
  }

  .bd-box {
    position: absolute;
    visibility: hidden;
    transition: .3s;

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