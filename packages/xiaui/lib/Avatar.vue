<script  lang="ts" setup>
// types
export interface Props {
  link: string, // image link
  size?: string | number, // avatar size
}

// variables
const props = withDefaults(defineProps<Props>(), {
  size: 48
});
</script>

<template>
  <div class="avatar" :style="{ width: size + 'px', height: size + 'px' }">
    <img :src="link" alt="头像">
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
  }
}
</style>