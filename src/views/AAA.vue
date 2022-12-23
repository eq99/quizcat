<script  lang="ts" setup>
import { ref } from 'vue';
import { Carousel, Zoom } from 'xiaui';
import { TabItem, Tabs } from 'xiaui';

const activeTab = ref('b')

function handleClick(name: string) {
  console.log(name);
}
</script>

<template>
  <Tabs v-model="activeTab" @click="handleClick">
    <tab-item label='标签一' name='a'>This is tab a</tab-item>
    <tab-item label='标签二' name='b'>This is tab b</tab-item>
    <tab-item label='标签三' name='c'>This is tab c</tab-item>
  </Tabs>
</template> 

<style lang="scss" scoped>
.box {
  margin-top: 100px;
  margin-left: 30px;
}
</style>