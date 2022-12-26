<script  lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Avatar } from 'xiaui';
import HeaderVue from '@/components/site/Header.vue';
import BookHeaderVue from '@/components/know/BookHeader.vue';
import { useBookStore } from "@/stores/book";
import { storeToRefs } from 'pinia';
import { getManagers } from '@/apis/book';

import type { Manager } from "@/types";
//vars 
const route = useRoute();
const bookStore = useBookStore();
const { fetchBook } = bookStore;

// states
const { book } = storeToRefs(bookStore);
const managers = ref<Manager[]>([]);

// life cicles
fetchBook(route.params.bookId as string);
onMounted(async () => {
  managers.value = await getManagers(route.params.bookId as string);
})
</script>

<template>
  <HeaderVue title="Book"></HeaderVue>

  <div class="container wrapper">
    <div class="main">
      <BookHeaderVue :book="book" :chapterId="1">
      </BookHeaderVue>

      <div class="nav">
        <RouterLink class="nav-item" :to="`/book/${book?.id}`">简介</RouterLink>
        <RouterLink class="nav-item" :to="`/book/${book?.id}/exs`">练习</RouterLink>
      </div>

      <RouterView></RouterView>
    </div>
    <!-- 侧边栏 -->
    <div class="side">
      <div class="card">
        <div class="hd">成员</div>
        <div class="bd">
          <Avatar :link="manager.avatar" v-for="manager in managers"></Avatar>
        </div>
      </div>
      <div class="card">
        <div class="hd">赞助</div>
        <div class="bd">
          <Avatar link="https://api.multiavatar.com/f2d85385.png"></Avatar>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

.main {
  width: 694px;

  .nav {
    display: flex;
    border-bottom: 1px solid #ccc;

    .nav-item {
      flex: 0 0 72px;
      text-align: center;
      display: inline-block;
      padding: 16px 0;
      position: relative;

      &.router-link-exact-active::after {
        content: "";
        width: 20px;
        height: 5px;
        border-radius: 2px;
        background-color: var(--fg-primary);

        position: absolute;
        bottom: -3px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}

.side {
  width: 296px;
  margin-left: 10px;

  .card {
    background: #fff;
    padding: 12px 16px;
    margin-bottom: 12px;

    .hd {
      margin-bottom: 8px;
      font-size: 20px;
    }
  }
}
</style>