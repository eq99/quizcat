<script  lang="ts" setup>
import Split from '@/components/Split.vue';
import CMEditor from '@/components/CMEditor.vue';
import { ref } from 'vue';


const code = ref(`
export interface Props {
  horizontal?: boolean,
  ratio?: string,
}

// varibles
const props = withDefaults(defineProps<Props>(), {
  horizontal: false,
});

const one = ref<HTMLElement>();
const two = ref<HTMLElement>();
const [initGrow1, initGrow2] = parseRatio(props.ratio as string);
`)
</script>

<template>
  <Split class="page">
    <template #one>
      <CMEditor :code="code" class="editor"></CMEditor>
    </template>

    <template #two>
      <div class="right"></div>
    </template>
  </Split>
</template>

<style lang="scss" scoped>
.page {
  width: 100vw;
  height: 100vh;

  .left {
    height: 100%;
    background-color: pink;
  }

  .right {
    height: 100%;
  }
}
</style>