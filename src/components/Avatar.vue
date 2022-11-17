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
  }
})
</script>

<template>
  <div class="avatar">
    <img v-if="link" :src="link" alt="头像">
    <div v-else class="text">{{ text }}</div>
  </div>
</template>


<style lang="scss" scoped>
.avatar {
  width: 48px;
  height: 48px;
  cursor: pointer;

  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }

  .text {
    width: 100%;
    height: 100%;
    background-color: var(--bg21);
    color: var(--fg4);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>