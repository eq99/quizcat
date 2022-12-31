<script  lang="ts" setup>
import { useTitleStore } from '@/stores/site';

// vars
const { setTitle } = useTitleStore();

// lifes
setTitle("喵喵的主页");
</script>

<template>
  <div class="land">
    <div class="main">
      <div class="info-card">
        <div class="avatar">
          <img src="https://api.multiavatar.com/f2d85385.png" alt="">
        </div>
        <div class="detail">
          <div class="row">
            <div class="username">甜心森</div>
          </div>
          <div class="row">
            <div class="bio">世上无难事只怕有心人。</div>
          </div>
        </div>
      </div>
      <div class="nav">
        <RouterLink class="nav-item" to="/user/1">动态</RouterLink>
        <RouterLink class="nav-item" to="/user/1/collect">收藏</RouterLink>
      </div>

      <RouterView></RouterView>
    </div>
    <div class="side">
      <div class="achievement">
        <div class="title">个人成就</div>
        <div class="item">发布文章:200</div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.land {
  display: flex;
  justify-content: center;
}

.main {
  width: 800px;
}

.info-card {
  margin-top: 12px;
  box-sizing: border-box;
  background-color: var(--bg-base1);
  display: flex;
  padding: 12px;

  .avatar {
    width: 80px;
    height: 80px;
    margin: 0 12px;
  }

  .username {
    color: var(--fg-helper);
    font-size: 18px;
  }
}

.side {
  width: 240px;
  margin-left: 16px;
  box-sizing: border-box;
}

.achievement {
  margin-top: 12px;
  background-color: var(--bg-base1);
  padding: 8px;

  .title {
    font-size: 18px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 8px;
  }

  .item {
    margin: 12px 0;
  }
}

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
</style>