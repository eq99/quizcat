<script setup lang="ts">
import Quiz from './components/Quiz.vue';
</script>

<template>
  <header>
    <h1 class="logo">练习喵</h1>
  </header>
  <Quiz></Quiz>
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
  margin-left: 2rem;
  color: var(--fg-primary);
}
</style>
