<script  lang="ts" setup>
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

// variables
const modalEle = ref<InstanceType<typeof Modal>>();
</script>

<template>
  <button @click="modalEle?.show">open</button>
  <Modal ref="modalEle">
    <div class="content">
      <button @click="modalEle?.hide">close</button>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.content {
  width: 300px;
  height: 200px;
  background-color: cyan;
}
</style>