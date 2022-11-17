<script  lang="ts" setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const fabEle = ref<HTMLElement>();
</script>

<template>
  <div class="fab-box" ref="fabEle">
    <div class="fab-icon">
      <RouterLink to="/" class="fab-link"><i class="iconfont icon-homefill"></i></RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fab-box {
  position: fixed;
  right: 32px;
  bottom: 32px;
  width: 64px;
  height: 64px;
}

.fab-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 50%;
  overflow: hide;
  background-color: var(--bg11);

  .iconfont {
    color: var(--fg4);
    font-size: 28px;
  }

  .fab-link {
    display: block;
  }
}
</style>