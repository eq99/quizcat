<script  lang="ts" setup>
import type { User } from '@/types';
import NavItem from '@/components/NavItem.vue';
import { computed } from 'vue';
import { signout } from '@/apis/user';
import { useTokenStore } from '@/stores/token';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from '@/stores/notification';

//vars
const props = defineProps<{
  user: User | null
}>();

const { clearUser } = useUserStore();
const tokenStore = useTokenStore();
const { clearToken } = tokenStore;
const { token } = storeToRefs(tokenStore);
const { pushNoti } = useNotificationStore();


// computed
const username = computed(() => {
  let name = props.user?.name || '喵喵';
  if (name.length > 20) {
    return '喵喵 ' + name.split('-')[0];
  }

  return name;
})


// methods
function handleLogout() {
  let tokenStr = (token.value?.value) || '';
  signout(tokenStr).then(data => {
    clearToken();
    clearUser();
  }).catch(err => {
    pushNoti({
      title: "退出登录",
      detail: '退出登录出错了，请稍后再试',
      type: 'error'
    })
  })
}
</script>

<template>
  <div class="user-info">
    <div class="username">{{ username }}</div>
    <div class="nav-list">
      <NavItem :link="`/user/${user?.id}`" title="个人中心" icon="icon-user"></NavItem>
      <NavItem title="退出登录" icon="icon-logout" @click="handleLogout"></NavItem>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.user-info {
  .username {
    text-align: center;
    font-size: 24px;
    margin-bottom: 12px;
    color: var(--fg21)
  }
}
</style>