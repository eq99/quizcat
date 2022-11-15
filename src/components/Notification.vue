<script  lang="ts" setup>
import { useNotificationStore } from '@/stores/notification'

// types
interface NotiClass {
  error: string,
  success: string,
}

// vars
const { notifications } = useNotificationStore();

const notiClass: NotiClass = {
  error: 'icon-error error',
  success: 'icon-success success'
}

// methods
function notiTypeClass(ntype: string | undefined): string {
  ntype = ntype || 'success';
  return notiClass[ntype as keyof NotiClass];
}
</script>

<template>
  <div class="n-box">
    <div class="n-item" v-for="noti in notifications">
      <div class="n-title"><i class="iconfont" :class="notiTypeClass(noti?.type)"></i> {{ noti.title }}</div>
      <div class="n-detail">{{ noti.detail }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.n-box {
  position: fixed;
  top: 48px;
  right: 24px;
  z-index: 20;

  .n-item {
    padding: 12px;
    width: 280px;
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 12px;

    .iconfont {
      font-size: 20px;
      margin-right: 8px;
    }

    .error {
      color: #f56c6c;
    }

    .success {
      color: #67c23a;
    }

    .n-title {
      margin-bottom: 4px;
      display: flex;
      align-items: center;
    }

    .n-detail {
      color: #999;
    }
  }
}
</style>