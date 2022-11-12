<script  lang="ts" setup>
import DropdownVue from '@/components/Dropdown.vue';
import AvatarVue from '@/components/Avatar.vue';
</script>

<template>
  <div class="wrapper">
    <DropdownVue position="bottom-center">
      <template #head>
        <AvatarVue></AvatarVue>
      </template>
      <template #body>
        <div class="content"></div>
      </template>
    </DropdownVue>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  margin-left: 500px;
}

.content {
  width: 300px;
  height: 200px;
  background-color: cyan;
}
</style>