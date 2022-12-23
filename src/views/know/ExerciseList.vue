<script  lang="ts" setup>

// vars
const exs = [
  {
    id: 1,
    name: "php excel导出十万数据的解决方案？",
    doNum: 5,
    tags: 'JavaScript 变量'
  },
  {
    id: 2,
    name: "php excel导出十万数据的解决方案？",
    doNum: 500,
    tags: 'JavaScript variable'
  }
]
</script>

<template>
  <div class="exs">
    <div class="ex-item" v-for="(ex, idx) in exs">
      <div class="left">
        {{ idx + 1 }}
      </div>
      <div class="right">

        <div class="hd">
          <RouterLink :to="`/book/1/exs/${ex.id}`" class="name">{{ ex.name }}</RouterLink>
        </div>
        <div class="bd">
          <div class="tags">
            <div class="tag" v-for="tag in ex.tags.split(' ')">{{ tag }}</div>
          </div>
          <div class="meta">{{ ex.doNum }}人练过</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.exs {
  margin-top: 16px;

  .ex-item {
    display: flex;
    background-color: #fff;
    margin-bottom: 12px;
    padding: 8px 12px;

    .left {
      flex-shrink: 0;
      font-size: 32px;
      margin-right: 16px;
    }

    .right {
      flex: 1;

      .hd {
        .name {
          font-size: 20px;
        }
      }

      .bd {
        display: flex;
        margin-top: 8px;

        .tag {
          display: inline-block;
          font-size: 14px;
          padding: 6px;
          height: 18px;
          line-height: 18px;
          border-radius: 4px;
          background-color: rgba(0, 150, 94, .1);
          margin: 0 4px;
        }

        .meta {
          margin-left: auto;
        }
      }
    }
  }
}
</style>