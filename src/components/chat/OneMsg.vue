<script  lang="ts" setup>
import { Avatar } from 'xiaui';
import type { DirectMessage } from '@/types/chat';


//types
export interface Props {
  right?: boolean,
  msg: DirectMessage
}

//vars
const props = withDefaults(defineProps<Props>(), {
  right: false
})
</script>

<template>
  <div class="one-msg" :class="{ right }">
    <Avatar :link="msg.avatar" size="32"></Avatar>
    <div class="msg">
      {{ msg.content }}
    </div>
    <div class="time">{{ msg.createdAt }}</div>
  </div>
</template>

<style lang="scss" scoped>
.one-msg {
  display: flex;
  font-size: 14px;
  margin: 0 8px 20px;

  &.right {
    flex-direction: row-reverse;

    .msg {
      border-radius: 8px 0 8px 8px;
      background-color: #a0d8ef;
    }
  }

  .msg {
    max-width: 50%;
    margin: 0 8px;
    border-radius: 0 8px 8px 8px;
    background-color: #fff;
    padding: 8px 12px;
  }

  .time {
    font-size: 12px;
    color: #999;
  }
}
</style>