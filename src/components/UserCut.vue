<!--
  short cut info for user, mainly used at header nav
 -->

<script  lang="ts" setup>
import Dropdown from '@/components/Dropdown.vue';
import Avatar from '@/components/Avatar.vue';
import Modal from '@/components/Modal.vue';
import LoginCard from '@/components/LoginCard.vue';
import { ref } from 'vue';

// vars
const modalEle = ref<InstanceType<typeof Modal>>();

//states
const isLogin = ref(false)
</script>

<template>
  <Dropdown position="bottom-right">
    <template #head>
      <Avatar></Avatar>
    </template>
    <template #body>
      <div class="content">
        <div class="login-box">
          <div class="note">登录发现新天地</div>
          <div class="login-btn" @click="modalEle?.show">立即登录</div>
        </div>
      </div>
    </template>
  </Dropdown>
  <Modal ref="modalEle">
    <div class="login-card">
      <LoginCard @close="modalEle?.hide"></LoginCard>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
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