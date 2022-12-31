<script setup lang="ts">
import { ref, onMounted, toRef, onUnmounted } from 'vue';
import Vditor from 'vditor';

// vars
const randomId = String(new Date().getTime());
const props = defineProps<{
  modelValue?: string,
  minHeight?: number
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

// states
const vditor = ref<Vditor | null>(null);
const modelValue = toRef(props, 'modelValue');

// lifes
onMounted(() => {
  vditor.value = new Vditor(randomId, {
    after: () => {
      vditor.value!.setValue(modelValue.value || '');
    },
    input(value: string) {
      emit('update:modelValue', value);
    }
  });
});

onUnmounted(() => {
  // fix storage
  localStorage.removeItem(`vditor${randomId}`);
})
</script>

<template>
  <div :id="randomId" class="vditor" :style="{ minHeight: minHeight + 'px' }"></div>
</template>