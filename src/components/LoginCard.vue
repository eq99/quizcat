<script  lang="ts" setup>
import { computed, ref } from 'vue';
import { useNotificationStore } from '@/stores/notification';


//vars
const MAX_SECOND = 61;
const emit = defineEmits<{
  (e: 'close'): void,
}>();

const { pushNoti } = useNotificationStore();

// states
const countDown = ref(MAX_SECOND);
let intervalId = ref(0);

// computed
const captText = computed(() => {
  return countDown.value < MAX_SECOND ? `${countDown.value} 秒重新获取` : '获取验证码'
});

const disabled = computed(() => {
  return countDown.value < MAX_SECOND
});

// methods
function sendCaptcha() {
  intervalId.value = setInterval(() => {
    countDown.value -= 1;
    if (countDown.value === 0) {
      clearInterval(intervalId.value);
      countDown.value = MAX_SECOND;
    }
  }, 1000);
}

function close() {
  emit('close');
}

function handleSubmit() {
  pushNoti({
    title: "标题",
    detail: "登录成功",
    type: 'error',
  });
}
</script>

<template>
  <div class="login-card">
    <div class="logo">学习喵</div>
    <div class="close" @click="close"><i class="iconfont icon-close-bold"></i> </div>
    <fieldset>
      <label>请使用邮箱注册</label>
      <div class="input-wrapper">
        <input type="text" placeholder="miao@miao.com">
      </div>
    </fieldset>
    <fieldset>
      <label for="">请填写邮箱验证码</label>
      <div class="input-wrapper">
        <input type="text" placeholder="1234" class="cpat-input">
        <button class="capt-btn" :class="{ disabled }" @click="sendCaptcha" :disabled="disabled">{{ captText
        }}</button>
      </div>
    </fieldset>
    <button class="submit-btn" @click="handleSubmit">登录/注册</button>
  </div>
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