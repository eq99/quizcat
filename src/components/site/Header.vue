<script setup lang="ts">
import Logo from '@/components/site/Logo.vue';
import UserCut from '../UserDrop.vue';

// vars
const props = defineProps<{
  title: string,
}>();
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

  .logo-box {
    height: 72px;
  }

  .logo {
    transform: scale(.5);
  }

  .info {
    margin: 0 40px;
  }
}
</style>