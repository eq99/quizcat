<script  lang="ts" setup>
import { ref } from 'vue';
import { TabItem, Tabs, Avatar } from 'xiaui';
import HeaderVue from '@/components/site/Header.vue';
import BookHeaderVue from '@/components/know/BookHeader.vue';

// vars
const activeTab = ref('tab1');

</script>

<template>
  <HeaderVue title="book name"></HeaderVue>

  <div class="container wrapper">
    <div class="main">
      <BookHeaderVue name="算法初级" cover="https://cdn.pixabay.com/photo/2022/06/21/16/18/orange-7276122_640.jpg">
      </BookHeaderVue>

      <div class="nav">
        <RouterLink class="nav-item" to="/book/1">简介</RouterLink>
        <RouterLink class="nav-item" to="/book/1/exs">练习</RouterLink>
      </div>

      <RouterView></RouterView>
    </div>
    <!-- 侧边栏 -->
    <div class="side">
      <div class="card">
        <div class="hd">成员</div>
        <div class="bd">
          <Avatar link="https://api.multiavatar.com/f2d85385.png"></Avatar>
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