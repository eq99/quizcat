<!-- usage:
<script  lang="ts" setup>
import Modal from '@/components/Modal.vue';
import { ref } from 'vue';

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
-->

<script  lang="ts" setup>
import TransitionFade from '@/components/transitions/Fade.vue';
import { ref } from 'vue';

//states
const isHide = ref(true);

function show() {
  isHide.value = false;
}

function hide() {
  isHide.value = true;
}

// expose
defineExpose({
  show,
  hide
});
</script>

<template>
  <TransitionFade>
    <div class="modal" v-show="!isHide">
      <slot></slot>
    </div>
  </TransitionFade>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(0 0 0 /0.4);
}
</style>