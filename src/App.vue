<script setup lang="ts">
import Notification from '@/components/Notification.vue';
import LoginModal from '@/components/user/LoginModal.vue';
import Fab from '@/components/Fab.vue';
</script>

<template>
  <n-message-provider>
    <Notification></Notification>
    <RouterView></RouterView>
    <Fab></Fab>
    <LoginModal></LoginModal>
  </n-message-provider>
</template>
