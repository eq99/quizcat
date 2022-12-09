<script  lang="ts" setup>
// types
export interface Props {
  rotatex?: boolean
}
// props
withDefaults(defineProps<Props>(), {
  rotatex: false,
})

</script>

<template>
  <div class="scene">
    <div class="flip" :class="rotatex ? 'rotatex' : 'rotatey'">
      <div class="f-box">
        <slot name="front"></slot>
      </div>
      <div class="b-box" :class="rotatex ? 'rotatex' : 'rotatey'">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scene {
  perspective: 1000px;

  &:hover,
  .hover {
    .flip.rotatey {
      transform: rotateY(180deg);
    }

    .flip.rotatex {
      transform: rotateX(180deg);
    }
  }

  .flip {
    transform-style: preserve-3d;
    position: relative;
    transition: .6s;

    .f-box {
      position: absolute;
      backface-visibility: hidden;
      z-index: 1;
    }

    .b-box {
      position: absolute;
      backface-visibility: hidden;
      z-index: 0;
    }

    .b-box.rotatey {
      transform: rotateY(180deg);
    }

    .b-box.rotatex {
      transform: rotateX(180deg);
    }
  }
}
</style>