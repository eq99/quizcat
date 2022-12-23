<script  lang="ts" setup>
import HeaderVue from '@/components/site/Header.vue';


// vars
const navs = [
  {
    name: "首页",
    icon: "icon-home",
    link: "/know"
  },
  {
    name: "数学",
    icon: "icon-math-compass",
    link: "/know/math",
  },
  {
    name: "英语",
    icon: "icon-language",
    link: "/know/lang",
  },
  {
    name: "电脑",
    icon: "icon-terminal",
    link: "/know/cs",
  },
]
</script>

<template>
  <HeaderVue title="知识宇宙" />

  <div class="container wrapper">
    <div class="nav">
      <div class="nav-item" v-for="nav in navs">
        <RouterLink :to="nav.link">
          <i class="iconfont" :class="nav.icon"></i> <span>{{ nav.name }}</span>
        </RouterLink>
      </div>
    </div>
    <div class="main">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;

  .nav {
    flex-shrink: 0;
    flex-basis: 172px;
    height: 700px;
    padding-top: 20px;
    background-color: lightblue;

    .nav-item {
      font-size: 20px;
      padding-left: 32px;
      margin: 8px 0;

      .iconfont {
        font-size: 24px;
      }
    }
  }
}
</style>