<script  lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';

import Modal from '@/components/Modal.vue';

import { useNotificationStore } from '@/stores/notification';
import { useUserStore } from '@/stores/user';
import { useSigninStore } from '@/stores/token';
import { useTokenStore } from '@/stores/token';

import { sendCaptcha, signin } from '@/apis/user';
import { validateEmail } from '@/lib'
import type { Token } from '@/types';

//vars
const modalEle = ref<InstanceType<typeof Modal>>();

const signinStore = useSigninStore();
const tokenStore = useTokenStore();
const { pushNoti } = useNotificationStore();
const { saveUser } = useUserStore();
const { closeSignin } = signinStore;
const { token } = storeToRefs(tokenStore);
const { saveToken } = tokenStore;

const MAX_SECOND = 61;

// subscribs
signinStore.$subscribe((mutation, state) => {
  // 未登录并且收到登录请求时打开
  if (state.isOpen && !token.value) {
    modalEle.value?.show();
  }

  // 收到关闭请求时关闭
  if (!state.isOpen) {
    modalEle.value?.hide();
  }
})

// states
const countDown = ref(MAX_SECOND);
let intervalId = ref(0);
const email = ref('');
const captcha = ref('');

// computed
const captText = computed(() => {
  return countDown.value < MAX_SECOND ? `${countDown.value} 秒重新获取` : '获取验证码'
});

const disabled = computed(() => {
  return countDown.value < MAX_SECOND
});

// methods
function handleSendCaptcha() {
  const msg = validateEmail(email.value);

  if (msg) {
    pushNoti({
      title: '邮箱验证错误',
      detail: msg,
      type: 'error',
    });

    return;
  }

  sendCaptcha(email.value).then(data => {
    pushNoti({
      title: '获取验证码成功',
      detail: '验证码已成功发送到邮箱'
    });
  }).catch(err => {
    pushNoti({
      title: '验证码发送失败',
      detail: '验证码发送失败, 请稍后重试',
      type: 'error',
    });
  });

  intervalId.value = setInterval(() => {
    countDown.value -= 1;
    if (countDown.value === 0) {
      clearInterval(intervalId.value);
      countDown.value = MAX_SECOND;
    }
  }, 1000);
}

function handleSubmit() {
  if (captcha.value.length !== 4) {
    pushNoti({
      title: '验证码格式错误',
      detail: '验证码格式错误，请输入正确的四位验证码',
      type: 'error',
    });

    return;
  }

  signin(email.value, captcha.value).then((data) => {
    const token: Token = {
      value: data.value,
      updatedAt: data.updatedAt
    }

    saveToken(token);
    saveUser(data.user);

    pushNoti({
      title: "登录成功",
      detail: "登录成功，开启喵喵之家",
    });

    //close modal
    closeSignin();
  }).catch(err => {
    pushNoti({
      title: '登录失败',
      detail: '登录失败，请联系管理员',
      type: 'error',
    });
  });
}
</script>

<template>
  <Modal ref="modalEle">
    <div class="login-card">
      <div class="logo">学习喵</div>
      <div class="close" @click="closeSignin"><i class="iconfont icon-close-bold"></i> </div>
      <fieldset>
        <label>请使用邮箱注册</label>
        <div class="input-wrapper">
          <input type="text" placeholder="miao@miao.com" v-model="email">
        </div>
      </fieldset>
      <fieldset>
        <label for="">请填写邮箱验证码</label>
        <div class="input-wrapper">
          <input type="text" placeholder="1234" class="cpat-input" v-model="captcha">
          <button class="capt-btn" :class="{ disabled }" @click="handleSendCaptcha" :disabled="disabled">{{ captText
          }}</button>
        </div>
      </fieldset>
      <button class="submit-btn" @click="handleSubmit">登录/注册</button>
    </div>
  </Modal>
</template>

<style lang="scss" scoped>
.login-card {
  background-color: #fff;
  width: 375px;
  border-radius: 20px;
  padding: 20px 20px 60px;

  position: relative;

  .logo {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .close {
    position: absolute;
    top: 8px;
    right: -36px;
    cursor: pointer;
    color: #ccc;

    .iconfont {
      font-size: 32px;
    }
  }

  fieldset {
    margin-bottom: 16px;

    label {
      display: block;
      margin-bottom: 12px;
    }
  }

  .input-wrapper {
    padding: 8px;
    border: 1px solid #eee;
    border-radius: 4px;
    display: flex;

    input {
      flex: 1;
      font-size: 20px;
    }
  }

  .cpat-input {
    letter-spacing: 8px;
  }

  .capt-btn {
    margin-left: 8px;
    cursor: pointer;

    &:hover {
      color: var(--fg-primary);
    }

    &.disabled {
      color: #999;
      cursor: not-allowed;
    }
  }

  .submit-btn {
    padding: 12px 20px;
    width: 100%;
    background-color: var(--winter4);
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
