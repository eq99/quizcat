<script  lang="ts" setup>
import { Button } from 'xiaui';


// types
export interface Props {
  cover: string,
  name: string,
};

//vars
const props = defineProps<Props>();
</script>

<template>
  <div class="box">
    <div class="cover"><img :src="cover" alt=""></div>
    <div class="detail">
      <div class="name">{{ name }}</div>
      <div class="grow"></div>
      <Button>
        <RouterLink to="/book/1/chapters/121421">开始</RouterLink>
      </Button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  background-color: #fff;

  .cover {
    flex: 0 0 280px;
  }

  .detail {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;

    .name {
      font-size: 20px;
    }
  }
}
</style>