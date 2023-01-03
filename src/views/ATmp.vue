<script  lang="ts" setup>
import { ref } from 'vue';
import { useLogin } from '@/components/user/use-login'

const login = useLogin();
</script>

<template>
  <button @click="login.open">登录</button>
</template> 

<style lang="scss" scoped>
.box {
  margin-top: 100px;
  margin-left: 30px;
}
</style>