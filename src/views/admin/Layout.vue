<script  lang="ts" setup>
import { useTitleStore } from '@/stores/site';

// vars
const { setTitle } = useTitleStore();

// lifes
setTitle("管理");
</script>

<template>
  <div class="layout">
    <div class="left">
      <RouterLink to="/admin" class="nav-item">DashBorad</RouterLink>
      <RouterLink to="/admin/book" class="nav-item">Book</RouterLink>
    </div>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;

  .left {
    margin-top: 32px;
    flex: 0 0 180px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;

    .nav-item {
      line-height: 40px;
      padding: 0 20px;
    }

    .router-link-exact-active {
      color: var(--fg-primary);
    }
  }

  .main {
    flex: 1;
  }
}
</style>