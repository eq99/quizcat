<script  lang="ts" setup>

//vars
const props = defineProps<{
  text: string,
  action: string  // action url 
}>();


function handleClick() {

}
</script>

<template>
  <div class="item" @click="handleClick">{{ text }}</div>
</template>

<style lang="scss" scoped>
.item {
  padding: 8px 16px;
  cursor: pointer;
  background-color: #fff;

  &:hover {
    background-color: #eee;
    color: var(--fg-primary);
  }
}
</style>