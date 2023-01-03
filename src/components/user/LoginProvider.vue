<script  lang="ts" setup>
import { storeToRefs } from 'pinia';
import { computed, provide, ref } from 'vue';
import { useMessage } from "naive-ui";

import { useUserStore } from '@/stores/user';
import { useTokenStore } from '@/stores/token';

import { sendCaptcha, signin } from '@/services/user';

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
const emailName = ref('');
const domain = ref("");
const captcha = ref('');
const showRef = ref(false);
const allowedDomains = ref([
  {
    label: 'qq',
    value: '@qq.com'
  },
  {
    label: '163',
    value: '@163.com'
  },
  {
    label: 'gmail',
    value: '@gmail.com'
  },
  {
    label: 'sina',
    value: '@sina.com'
  },
  {
    label: 'outlook',
    value: '@outlook.com'
  },

]);

// computed
const captText = computed(() => {
  return countDown.value < MAX_SECOND ? `${countDown.value} 秒重新获取` : '获取验证码'
});

const disabled = computed(() => {
  return countDown.value < MAX_SECOND
});

const email = computed(() => {
  return emailName.value + domain.value;
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

function validateEmail(): string {
  if (emailName.value.length < 1) {
    return "请填写邮箱";
  }

  if (emailName.value.includes("@")) {
    return "邮箱域名只支持可选的";
  }

  if (domain.value.length < 1) {
    return "请选择邮箱域名";
  }

  return ""
}

function handleSendCaptcha() {
  const msg = validateEmail();
  if (msg.length !== 0) {
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
    message.error(`验证码的长度为 4, 请检查`);
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
        <n-input-group>
          <n-input v-model:value="emailName" placeholder="请输入邮箱" :style="{ width: '70%' }" />
          <n-select v-model:value="domain" :style="{ width: '30%' }" :options="allowedDomains" placeholder="选择邮箱" />
        </n-input-group>
      </n-form-item>
      <n-form-item label="请填写邮箱验证码" path="captcha">
        <n-input-group>
          <n-input v-model:value="captcha" placeholder="1 2 3 4" />
          <n-button type="primary" :disabled="disabled" @click="handleSendCaptcha">
            {{ captText }}
          </n-button>
        </n-input-group>
      </n-form-item>
      <button class="submit-btn" @click="handleSubmit">登录/注册</button>
    </div>
  </n-modal>
</template>

<style lang="scss" scoped>
.login-card {
  background-color: #fff;
  width: 375px;
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
