<script lang="ts" setup>
import { getCurrentInstance, computed } from 'vue';

const props = defineProps<{
  label: string,
  name: string
}>();

const parentModelValue = computed(() => getCurrentInstance()?.parent?.props.modelValue)
</script>

<template>
  <div v-show="parentModelValue == props.name">
    <slot />
  </div>
</template>