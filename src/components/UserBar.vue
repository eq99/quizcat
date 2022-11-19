<script  lang="ts" setup>
import type { UserBar } from '@/types';
import Avatar from '@/components/Avatar.vue';
import { computed } from '@vue/reactivity';
const props = defineProps<{
  userbar: UserBar,
}>();

// computed
const username = computed(() => {
  const name = props.userbar.name
  return name.length > 30 ? `喵喵 ${name.split("-")[0]}` : name;
})
</script>

<template>
  <div class="userbar">
    <Avatar :link="userbar.avatar" :text="userbar.name.slice(0, 2)"></Avatar>
    <div class="detail">
      <div class="name">{{ username }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.userbar {
  display: flex;
  align-items: center;
  padding: 4px;

  .detail {
    margin-left: 4px;
  }
}
</style>