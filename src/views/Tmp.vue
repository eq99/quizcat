<script  lang="ts" setup>
import { ref } from 'vue';
import { useSigninStore } from '@/stores/token';


const { openSignin, closeSignin } = useSigninStore();
</script>

<template>
  <button @click="openSignin">开启</button>
  <button @click="closeSignin">关闭</button>
</template>

<style lang="scss" scoped>
.content {
  width: 300px;
  height: 200px;
  background-color: cyan;
}
</style>