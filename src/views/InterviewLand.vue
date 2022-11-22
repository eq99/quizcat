<script  lang="ts" setup>
import { storeToRefs } from 'pinia';

import { useInterviewStore } from '@/stores/interview';

const { iquestions, comments } = storeToRefs(useInterviewStore());

</script>

<template>
  <div class="card">
    <h3 class="c-hd">我的进度</h3>
    <div class="progress-box">
      <progress :value="comments.length" :max="iquestions.length"></progress>
      <span>{{ comments.length }}</span> /
      <span>{{ iquestions.length }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-hd {
  margin-top: 20px;
}

.progress-box {
  display: flex;
  align-items: center;
}
</style>