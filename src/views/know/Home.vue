<script  lang="ts" setup>
import SubjectVue from '@/components/know/Subject.vue';
import { getNewBooks } from '@/apis/book';
import type { Book } from "@/types";
import { onMounted, ref } from 'vue';

const newBooks = ref<Book[]>([]);

// lifes
onMounted(async () => {
  newBooks.value = await getNewBooks();
});
</script>

<template>
  <div class="subject-box">
    <div class="hd"> <i class="iconfont icon-new"></i> <span>最新</span> </div>
    <div class="subjects">
      <SubjectVue v-for="subject in newBooks" :subject="subject"></SubjectVue>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.subject-box {
  padding: 4px 24px;

  .hd {
    font-size: 20px;

    .iconfont {
      font-size: 24px;
    }
  }

  .subjects {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;

    .subject {
      .cover {
        height: 140px;
        overflow: hidden;
      }

      .name {
        text-align: center;
      }
    }
  }
}
</style>