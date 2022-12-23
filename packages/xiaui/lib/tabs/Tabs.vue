<script lang="ts" setup>
import { computed, toRef, useSlots } from 'vue'

// vars
const props = defineProps<{
  modelValue: string | number,
}>();

const modelValue = toRef(props, 'modelValue');

const emit = defineEmits<{
  (e: 'update:modelValue', name: string): void
  (e: 'click', name: string): void
}>();

const slots = useSlots();

// computed
const tabList = computed(() => {
  if (!slots.default) return []
  return slots.default().map(item => ({
    name: item.props?.name,
    label: item.props?.label
  }));
})

// methods
function handleClick(name: string) {
  // auto update modelValue
  emit('update:modelValue', name);
  emit('click', name);
}
</script>

<template>
  <div>
    <ul class="title-wrapper">
      <li v-for="item in tabList" :key="item.name" :class="{ active: modelValue == item.name }"
        @click.stop="handleClick(item.name)">{{ item.label }}</li>
    </ul>

    <div class="content-wrap">
      <slot />
    </div>
  </div>
</template>

<style scoped lang='scss'>
.title-wrapper {
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  border-bottom: 3px solid #ddd;

  &>li {
    min-width: 40px;
    padding: 8px 8px 12px 12px;
    margin: 0 10px 0 0;
    cursor: pointer;
    position: relative;
    text-align: center;


    &.active::after {
      content: "";
      display: block;
      height: 5px;
      width: 28px;
      background-color: var(--fg-primary);
      border-radius: 4px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -4px;
    }
  }
}
</style>