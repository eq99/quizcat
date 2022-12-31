<script  lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useBookStore } from '@/stores/book';
import { useTitleStore } from '@/stores/site';


//vars
const route = useRoute();
const { setTitle } = useTitleStore();

// computed
const bookId = computed(() => {
  return Number(route.params.bookId as string);
});

// lifes
setTitle("管理");
</script>

<template>
  <div class="manage">
    <div class="navs">
      <RouterLink :to="`/book/${bookId}/manage`" class="nav-item">基本信息</RouterLink>
      <!-- <RouterLink :to="`/book/${bookId}/manage/user`" class="nav-item">基本信息</RouterLink> -->
    </div>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.manage {
  display: flex;

  .navs {
    flex: 0 0 160px;
    border-right: 1px solid #ccc;
    margin-top: 32px;
    display: flex;
    flex-direction: column;


    .router-link-exact-active {
      color: var(--fg-primary);
      background-color: #fff;
    }

    .nav-item {
      line-height: 20px;
      padding: 12px 24px;
    }
  }
}
</style>