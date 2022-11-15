<script setup lang="ts">
import UserCut from './UserCut.vue';
</script>

<template>
  <header>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">学习喵の窝</RouterLink>
      </h1>
      <div class="info">
        <UserCut></UserCut>
      </div>
    </div>
  </header>
</template>


<style scoped lang="scss">
header {
  background-color: var(--winter3);

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    font-size: 36px;
    margin: 0 0 0 40px;
    padding: 8px 0 12px;
    color: var(--winter4);
    text-align: center;
  }

  .info {
    margin-right: 40px;
    margin-left: auto;
  }
}
</style>