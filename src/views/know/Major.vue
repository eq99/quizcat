<script  lang="ts" setup>
import { onMounted, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

import SubjectVue from '@/components/know/Subject.vue';
import type { Book } from "@/types";
import { getBooksByCategory } from "@/apis/book";
import { groupBooksBySubCategory } from "@/lib"
// vars 
const route = useRoute();

// states
const books = ref<Map<string, Book[]>>(new Map());

onMounted(async () => {
  books.value = groupBooksBySubCategory(await getBooksByCategory(route.params.subject as string));
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.subject !== from.params.subject) {
    books.value = groupBooksBySubCategory(await getBooksByCategory(to.params.subject as string));
  }
});
</script>

<template>
  <div class="subject-box" v-for="entry in books">
    <div class="hd"> <i class="iconfont icon-terminal"></i> <span>{{ entry[0] }}</span> </div>
    <div class="subjects">
      <SubjectVue v-for="subject in entry[1]" :subject="subject"></SubjectVue>
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