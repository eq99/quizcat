<script setup lang="ts">

</script>

<template>
  <header>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">学习喵の窝</RouterLink>
      </h1>
    </div>
  </header>
</template>


<style scoped lang="scss">
header {
  background-color: var(--winter3);

  .logo {
    font-size: 36px;
    margin: 0;
    padding: 8px 0 12px;
    color: var(--winter4);
    text-align: center;
  }
}
</style>