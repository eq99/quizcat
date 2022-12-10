<script  lang="ts" setup>
import { Avatar } from 'xiaui';
</script>

<template>
  <div class="useritem">
    <Avatar link="https://api.multiavatar.com/f2d85385.png" class="avatar" size="32"></Avatar>
    <div class="detail">
      <div class="username s1">甜心森</div>
      <div class="lastmsg s1">你今天中午吃什么？你今天中午吃什么你今天中午吃什么</div>
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