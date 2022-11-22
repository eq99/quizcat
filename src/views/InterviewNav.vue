<script  lang="ts" setup>

// states
const iquestions = [{
  id: 1,
  bookID: 1,
  body: 'CAD设计中零部件序号、标注及明细表的自动生成',
}, {
  id: 2,
  bookID: 1,
  body: '说一说cookie sessionStorage localStorage 区别？',
},
{
  id: 3,
  bookID: 1,
  body: 'CSS颜色设置',
},
]
</script>

<template>
  <div class="container">
    <dl class="contents">
      <dt>
        <RouterLink to="/interviews/1">JavaScript</RouterLink>
      </dt>
      <dd v-for="(question, idx) in iquestions" :key="question.id">
        <RouterLink :to="`/interviews/${question.bookID}/${question.id}`" class="c-link">
          <span class="order">{{ idx + 1 }}. </span>
          <span class="s1">{{ question.body }}</span>
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