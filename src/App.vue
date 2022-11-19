<script setup lang="ts">
import Notification from '@/components/Notification.vue';
import LoginModal from './components/LoginModal.vue';
import Fab from '@/components/Fab.vue';
</script>

<template>
  <Notification></Notification>
  <RouterView></RouterView>
  <Fab></Fab>
  <LoginModal></LoginModal>
</template>
