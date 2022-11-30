<script  lang="ts" setup>
import { ref } from 'vue';
import { useSigninStore } from '@/stores/token';
import Pagenate from '@/components/Pagenate.vue'


const { openSignin, closeSignin } = useSigninStore();

function handleChange(data: number | string) {
  console.log("goto", data)
}
</script>

<template>
  <Pagenate pageSize="10" total="12000" @change="handleChange"></Pagenate>
  <Pagenate pageSize="10" total="80"></Pagenate>
  <Pagenate pageSize="10" total="70"></Pagenate>
  <Pagenate pageSize="10" total="50"></Pagenate>
</template>

<style lang="scss" scoped>
.content {
  width: 300px;
  height: 200px;
  background-color: cyan;
}
</style>