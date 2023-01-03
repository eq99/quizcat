<script setup lang="ts">
import Fab from '@/components/Fab.vue';
import HeaderVue from '@/components/site/Header.vue';
import LoginProvider from './components/user/LoginProvider.vue';
</script>

<template>
  <n-message-provider>
    <LoginProvider>
      <div class="site-layout">
        <HeaderVue></HeaderVue>
        <RouterView class="site-main"></RouterView>
      </div>
    </LoginProvider>
  </n-message-provider>
</template>

<style lang="scss">
.site-layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
