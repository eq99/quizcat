<script  lang="ts" setup>
import Icon from "../Icon.vue";

function handleMention() {
  alert("还没实现，你干嘛哟");
}
</script>

<template>
  <div class="mention">
    <Icon @click="handleMention" name="icon-at" font-size="24px" color="#666" pointer></Icon>
  </div>
</template>

<style lang="scss" scoped>

</style>