<script  lang="ts" setup>
import HeaderVue from '@/components/site/Header.vue';
import MarkdownVue from '@/components/know/Markdown.vue';
import { useBookStore, useChapterStore } from "@/stores/book";
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { getChapterContent } from "@/apis/book";

// types
interface ChapterContent {
  content: string
}

// vars
const route = useRoute();
const bookStore = useBookStore();
const chapterStore = useChapterStore();
const { chapters } = chapterStore;
const { book } = bookStore;

// states
const content = ref("");

// computed
const chapterId = computed(() => {
  return Number(route.params.chapterId as string);
})

const prev = computed(() => {
  let prev = chapters.find((c) => c.nextId === chapterId.value);
  return prev ? prev.id : 0;
});

const chapter = computed(() => {
  return chapters.find(c => c.id === chapterId.value);
});

// life cicles
onMounted(async () => {
  content.value = (await getChapterContent(chapterId.value) as ChapterContent).content;
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.chapterId !== from.params.chapterId) {
    content.value = (await getChapterContent(to.params.chapterId as string) as ChapterContent).content;
    window.scrollTo(0, 0);
  }
});
</script>

<template>
  <HeaderVue :title="chapter?.name || '章节'"></HeaderVue>
  <div class="c-layout">
    <div class="side">
      <div class="toc">
        <div class="title">
          <RouterLink :to="`/book/${book?.id}`">{{ book?.name }}</RouterLink>
        </div>
        <div class="toc-item" v-for="chapter in chapters">
          <RouterLink :to="`/book/${book?.id}/chapters/${chapter.id}`">{{ chapter.name }}</RouterLink>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- <div class="markdown" v-html="content"></div> -->
      <MarkdownVue :markdown="content"></MarkdownVue>
      <div class="foot">
        <div class="prev">
          <RouterLink :to="`/book/${book?.id}/chapters/${prev}`" v-show="prev > 0">上一章</RouterLink>
        </div>
        <div class="next">
          <RouterLink :to="`/book/${book?.id}/chapters/${chapter?.nextId}`" v-show="chapter?.nextId">下一章</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.c-layout {
  margin-top: 16px;
  display: flex;
  align-items: flex-start;

  .side {
    flex: 0 0 196px;

    .toc {
      width: 200px;
      box-sizing: border-box;
      position: fixed;
      background-color: #fff;
      padding: 12px 12px 20px 12px;
    }

    .router-link-exact-active {
      color: var(--fg-primary);
    }

    .title {
      font-size: 20px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ccc;
      margin-bottom: 8px;
    }

    .toc-item {
      font-size: 14px;
      margin-bottom: 4px;
    }

  }

  .main {
    background-color: #fff;
    padding: 12px 20px;
    margin-left: 16px;
    flex: 0 0 694px;

    .foot {
      display: flex;
      justify-content: space-between;
      padding: 12px 20px;
      margin-top: 24px;
      font-size: 20px;
      border-top: 1px solid #ccc;
    }
  }

  .tools {
    flex: 1;
    background-color: #fff;
    margin-left: 12px;
  }
}
</style>