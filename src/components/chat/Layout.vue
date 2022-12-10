<script  lang="ts" setup>
import Search from '@/components/chat/Search.vue';
</script>

<template>
  <div class="msg">
    <div class="left">
      <Search></Search>
      <slot name="left"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.msg {
  --border-color: #eee;
  display: flex;
  flex: 1;

  .left {
    width: 260px;
    flex-shrink: 0;
    border-right: 1px solid var(--border-color);
  }

  .right {
    flex: 1;
  }
}
</style>