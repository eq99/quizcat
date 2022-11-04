<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'change', mode: boolean): void
}>()

const mode = ref<boolean>(false);

function change() {
  mode.value = !mode.value;
  emit("change", mode.value);
}
</script>

<template>
  <div class="switch" :class="{ mode }" @click="change">
    <div class="cn">中</div>
    <div class="en">en</div>
    <div class="switcher" :class="{ mode }"></div>
  </div>
</template>

<style>
/* 模式切换 */
.switch {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 30px;
  width: 60px;
  background-color: #e7e7eb;
  border-radius: 30px;
  padding: 4px 6px;
  cursor: pointer;
  font-size: 20px;
  transition: .4s;

  position: relative;
}

.switch.mode {
  background-color: #e60033;
}

.switcher {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border-radius: 50%;

  position: absolute;
  transition: 0.5s;
}

.cn {
  padding: 4px;
  color: #e7e7eb;
}

.en {
  padding: 4px;
  color: #e60033;
}

.switcher.mode {
  transform: translateX(30px);
}
</style>