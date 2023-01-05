<script  lang="ts" setup>
import { useTitleStore } from '@/stores/site';
import { h } from 'vue'
import { RouterLink } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { Icon } from 'xiaui';

// methods
function renderIcon(iconName: string) {
  return () => h(Icon, { name: iconName });
}

// vars
const { setTitle } = useTitleStore();
const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: "/admin"
        },
        { default: () => 'DashBoard' }
      ),
    key: 'go-dashboard',
    icon: renderIcon('icon-homefill')
  },
  {
    label: 'Book',
    key: 'book',
    icon: renderIcon('icon-homefill'),
    children: [
      {
        label: () =>
          h(
            RouterLink,
            {
              to: "/admin/book/list"
            },
            { default: () => 'Book List' }
          ),
        key: 'book-list',
        icon: renderIcon('icon-homefill')
      },
      {
        label: () =>
          h(
            RouterLink,
            {
              to: "/admin/book"
            },
            { default: () => 'Create Book' }
          ),
        key: 'sheep-man',
        icon: renderIcon('icon-homefill')
      }
    ]
  }
]

// lifes
setTitle("管理");
</script>

<template>
  <div class="layout">
    <div class="left">
      <n-menu :options="menuOptions" :indent="12" />
    </div>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  display: flex;

  .left {
    margin-top: 32px;
    flex: 0 0 180px;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #ccc;
  }

  .main {
    flex: 1;
    margin-left: 12px;
    margin-top: 32px;
  }
}
</style>