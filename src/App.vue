<script setup lang="ts">
import Notification from '@/components/Notification.vue';
import LoginModal from '@/components/user/Login.vue';
import Fab from '@/components/Fab.vue';
import HeaderVue from '@/components/site/Header.vue';
</script>

<template>
  <n-message-provider>
    <Notification></Notification>
    <div class="site-layout">
      <HeaderVue></HeaderVue>
      <RouterView class="site-main"></RouterView>
    </div>
    <Fab></Fab>
    <LoginModal></LoginModal>
  </n-message-provider>
</template>

<style lang="scss">
.site-layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr;
}
</style>
