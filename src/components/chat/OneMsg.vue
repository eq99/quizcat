<script  lang="ts" setup>
import { Avatar } from 'xiaui';

//types
export interface Props {
  right?: boolean
}

//vars
const props = withDefaults(defineProps<Props>(), {
  right: false
})
</script>

<template>
  <div class="one-msg" :class="{ right }">
    <Avatar link="https://api.multiavatar.com/f2d85385.png" size="32"></Avatar>
    <div class="msg">
      {{ '这是黑客说的公开内测频道，频道内所有的内容都可被公开访问。你可以在这里反馈网站的问题，帮助我们改进。' }}
    </div>
    <div class="time">{{ '2小时前' }}</div>
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