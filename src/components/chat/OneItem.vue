<script  lang="ts" setup>
import { Avatar } from 'xiaui';
import type { OneChat } from '@/types';

// types
export interface Props {
  onechat: OneChat
}
  
// vars
const props = defineProps<Props>();
</script>

<template>
  <div class="useritem">
    <Avatar :link="onechat.avatar" class="avatar" size="32"></Avatar>
    <div class="detail">
      <div class="username s1">{{ onechat.name }}</div>
      <div class="lastmsg s1">{{ onechat.last }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.useritem {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;

  &.active {
    background-color: #eee;
  }

  .detail {
    margin-left: 8px;
    width: 206px;

    .username {
      font-size: 14px;
    }

    .lastmsg {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>