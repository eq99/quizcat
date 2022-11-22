<script  lang="ts" setup>
// types

// variables
const props = defineProps({
  link: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '登录'
  },
  small: {
    type: Boolean,
    default: false,
  }
});
</script>

<template>
  <div class="avatar" :class="{ small: props.small }">
    <img v-if="link" :src="link" alt="头像">
    <div v-else class="text">{{ text }}</div>
  </div>
</template>


<style lang="scss" scoped>
.avatar {
  width: 48px;
  height: 48px;
  cursor: pointer;

  &.small {
    width: 32px;
    height: 32px;
  }

  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }

  .text {
    width: 100%;
    height: 100%;
    background-color: var(--bg-helper);
    color: var(--fg-base1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>