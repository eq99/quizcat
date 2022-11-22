<script  lang="ts" setup>

</script>

<template>
  <div class="container">
    <dl class="contents">
      <dt>
        <RouterLink to="/interviews/1">JavaScript</RouterLink>
      </dt>
      <dd>
        <RouterLink to="/interviews/1/1" class="c-link">
          <span class="order">1. </span>
          <span class="s1">{{ 'CAD设计中零部件序号、标注及明细表的自动生成' }}</span>
        </RouterLink>
      </dd>
      <dd>
        <RouterLink to="/interviews/1/2" class="c-link s1">
          <span class="order">2. </span>
          <span>{{ 'CSS颜色设置' }}</span>
        </RouterLink>
      </dd>
      <dd>
        <RouterLink to="/interviews/1/3" class="c-link">
          <span class="order">3. </span>
          <span class="s1">{{ '说一说cookie sessionStorage localStorage 区别？' }}</span>
        </RouterLink>
      </dd>
    </dl>
    <div class="detail">
      <div class="inner">
        <RouterView></RouterView>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.container {
  display: flex;

  .contents {
    width: 24%;
    font-size: 12px;

    dt {
      font-size: 16px;
      padding: 12px;
      background-color: var(--bg-base1);
      margin-bottom: 8px;
    }

    dd {
      margin: 12px 0;
      padding-right: 6px;
    }

    .c-link {
      display: flex;
      align-items: center;

      .order {
        flex-shrink: 0;
        margin: 0 6px;
      }
    }

    .router-link-exact-active {
      color: var(--fg-primary);
    }
  }

  .detail {
    flex-grow: 1;
    border-left: 1px solid var(--fg-base2);

    .inner {
      margin-left: 20px;
      width: 80%;
    }
  }
}
</style>