<script setup lang="ts">

</script>

<template>
  <header>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/exs"> 练习咩</RouterLink>
      </h1>
    </div>
  </header>
</template>


<style scoped lang="scss">
header {
  background-color: var(--bg-primary);

  .logo {
    font-size: 36px;
    text-align: center;
    margin: 0;
    padding: 8px 0 12px;
    color: var(--fg-primary);
  }
}
</style>