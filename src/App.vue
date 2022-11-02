<script setup lang="ts">

</script>

<template>
  <header>
    <h1 class="logo">
      <router-link to="/">练习喵</router-link>
    </h1>
  </header>

  <RouterView></RouterView>
</template>

<style scoped>
header {
  height: 60px;
  background-color: var(--bg-primary);

  display: flex;
  align-items: center;
  justify-content: center;
}

header .logo {
  color: var(--fg-primary);
}
</style>
