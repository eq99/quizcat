<script setup lang="ts">
defineProps<{
  name: string,
}>();
</script>

<template>
  <div class="galaxy">
    <!-- <div class="head">{{ name }}</div> -->
    <div class="body-wrapper">
      <div class="body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.galaxy {
  margin: 0 auto 16px;

  .head {
    background-color: var(--winter2);
    height: 36px;
    padding: 8px 12px;
    font-size: 24px;
    color: var(--winter4);
    text-align: center;
  }

  .body-wrapper {
    background-color: var(--winter1);
    padding-left: 80px;

    .body {
      width: 70%;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>