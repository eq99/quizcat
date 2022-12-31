<script setup lang="ts">
import Logo from '@/components/site/Logo.vue';
import UserCut from '../user/UserDrop.vue';
import ChatBadge from '@/components/chat/Badge.vue';
import { useTitleStore } from '@/stores/site';
import { storeToRefs } from 'pinia';
// vars
const { title } = storeToRefs(useTitleStore());
</script>

<template>
  <header>
    <div class="container">
      <div class="logo-box">
        <RouterLink to="/" class="logo">
          <Logo />
        </RouterLink>
      </div>
      <div class="title">{{ title }}</div>
      <div class="info">
        <ChatBadge></ChatBadge>
        <UserCut></UserCut>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
header {
  // background-color: var(--bg-base2);

  .container {
    display: flex;
    align-items: center;
  }

  .title {
    margin: auto;
    font-size: 24px;
  }

  .info {
    margin: 0 40px;
    display: flex;
    align-items: center;
  }
}
</style>