<script  lang="ts" setup>
import { Dropdown, Avatar } from 'xiaui';
import UserInfo from '@/components/user/UserInfo.vue';

import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user';
import { useSigninStore } from '@/stores/token';

// vars
const { user } = storeToRefs(useUserStore());
const { openSignin } = useSigninStore();
</script>

<template>
  <Dropdown position="bottom-right">
    <template #head>
      <Avatar :link="user?.avatar" v-if="user"></Avatar>
      <div v-else class="avatar-text">登录</div>
    </template>
    <template #body>
      <div class="content">
        <div class="user-box" v-if="user">
          <UserInfo :user="user"></UserInfo>
        </div>
        <div class="login-box" v-else>
          <div class="note">登录发现新天地</div>
          <div class="login-btn" @click="openSignin">立即登录</div>
        </div>
      </div>
    </template>
  </Dropdown>
</template>

<style lang="scss" scoped>
.avatar-text {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  width: 300px;
  padding: 20px 16px;
  border-radius: 8px;
  border: 1px solid #eee;
  background-color: #fff;

  .login-box {
    text-align: center;

    .note {
      color: #999;
      margin-bottom: 20px;
    }

    .login-btn {
      font-size: 20px;
      color: #fff;
      background-color: var(--winter4);
      border-radius: 6px;
      padding: 6px 12px;
      cursor: pointer;
    }
  }
}
</style>