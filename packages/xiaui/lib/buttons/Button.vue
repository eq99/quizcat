<script  lang="ts" setup>
import { computed } from 'vue';

//types
export type ButtonKind = 'primary' | 'danger' | 'ok' | 'helper' | 'base3'

export interface Props {
  kind?: ButtonKind,
}

//vars
const props = withDefaults(defineProps<Props>(), {
  kind: 'primary',
});

// computed
const buttonKind = computed(() => {
  return props.kind as string
})
</script>

<template>
  <div class="btn" :class="[buttonKind]">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 4px;

  &.primary {
    background-color: var(--bg-primary);
    color: var(--fg-base1);
  }

  &.danger {
    background-color: var(--bg-danger);
    color: var(--fg-base1);
  }

  &.ok {
    background-color: var(--bg-ok);
    color: var(--fg-base1);
  }

  &.helper {
    background-color: var(--bg-helper);
    color: var(--fg-base1);
  }

  &.base3 {
    background-color: var(--bg-base3);
    color: var(--fg-base1);
  }
}
</style>