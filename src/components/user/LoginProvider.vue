<script  lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, provide, ref } from 'vue';
import { useMessage } from "naive-ui";

import { useUserStore } from '@/stores/user';
import { useTokenStore } from '@/stores/token';

import { sendCaptcha, signin } from '@/services/user';
import { validateEmail } from '@/lib'

//types
export interface LoginApiInjection {
  open: () => void
  close: () => void
}

//vars
const tokenStore = useTokenStore();
const { saveUser } = useUserStore();

const { token } = storeToRefs(tokenStore);
const { saveToken } = tokenStore;
const message = useMessage();

const MAX_SECOND = 61;

// states
const countDown = ref(MAX_SECOND);
let intervalId = ref(0);
const email = ref('');
const captcha = ref('');
const showRef = ref(false);

// computed
const captText = computed(() => {
  return countDown.value < MAX_SECOND ? `${countDown.value} 秒重新获取` : '获取验证码'
});

const disabled = computed(() => {
  return countDown.value < MAX_SECOND
});

// methods
const api: LoginApiInjection = {
  open() {
    showRef.value = true;
  },
  close() {
    showRef.value = false;
  }
}

function handleSendCaptcha() {
  const msg = validateEmail(email.value);

  if (msg) {
    message.error(msg);
    return;
  }

  sendCaptcha(email.value).then((data) => {
    message.success("验证码已成功发送到邮箱");
  }).catch(err => {
    message.error(`验证码发送失败: ${err}`);
  });

  intervalId.value = window.setInterval(() => {
    countDown.value -= 1;
    if (countDown.value === 0) {
      clearInterval(intervalId.value);
      countDown.value = MAX_SECOND;
    }
  }, 1000);
}

function handleSubmit() {
  if (captcha.value.length !== 4) {
    message.error(`验证码格式错误，请输入正确的四位验证码`);
    return;
  }

  signin(email.value, captcha.value).then(({ data }) => {
    saveToken({
      value: data.token,
      expiredAt: data.expiredAt,
      isAdmin: data.isAdmin,
    });

    saveUser({
      id: data.id,
      name: data.name,
      avatar: data.avatar
    });
    message.success(`登录成功，马上开启喵喵之旅`);

    api.close();
  }).catch(err => {
    message.error(`登录失败，请联系管理员: ${err}`);
  });
}

// provides
provide('login-api', api);
</script>

<template>
  <slot></slot>
  <n-modal v-model:show="showRef">
    <div class="login-card">
      <div class="logo">森喵喵</div>
      <div class="close" @click="api.close"><i class="iconfont icon-close-bold"></i> </div>
      <n-form-item label="请使用邮箱注册" path="email">
        <n-input v-model:value="email" placeholder="please enter email" />
      </n-form-item>
      <fieldset>
        <label for="">请填写邮箱验证码</label>
        <div class="input-wrapper">
          <input type="text" placeholder="1234" class="cpat-input" v-model="captcha">
          <button class="capt-btn" :class="{ disabled }" @click="handleSendCaptcha" :disabled="disabled">
            {{ captText }}</button>
        </div>
      </fieldset>
      <button class="submit-btn" @click="handleSubmit">登录/注册</button>
    </div>
  </n-modal>
</template>

<style lang="scss" scoped>
.login-card {
  background-color: #fff;
  width: 375px;
  border-radius: 12px;
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
