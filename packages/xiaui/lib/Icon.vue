<script  lang="ts" setup>
// types
export interface Props {
  name: string,
  fontSize?: string,
  color?: string,
  pointer?: boolean
}

//vars
const props = withDefaults(defineProps<Props>(), {
  fontSize: '16px',
  color: "#333",
  pointer: false
})
</script>

<template>
  <i class="iconfont" :class="[name, pointer?'pointer':'']" :style="{fontSize, color }"></i>
</template>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>