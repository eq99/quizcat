<script  lang="ts" setup>
import HeaderVue from '@/components/site/Header.vue';
import MarkdownVue from '@/components/know/Markdown.vue';
import { useBookStore, useChapterEditStore, useChapterStore } from "@/stores/book";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { getChapterContent } from "@/apis/book";
import { storeToRefs } from 'pinia';

// types
interface ChapterContent {
  content: string
}

// vars
const route = useRoute();
const bookStore = useBookStore();
const chapterStore = useChapterStore();
const chapterEditStore = useChapterEditStore();
const { chapters } = storeToRefs(chapterStore);
const { book } = storeToRefs(bookStore);
const { fetchBook } = bookStore;
const { fetchChapters } = chapterStore;
const { setChapterData } = chapterEditStore;

// states
const content = ref("");

// computed
const chapterId = computed(() => {
  return Number(route.params.chapterId as string);
});

const bookId = computed(() => {
  return Number(route.params.bookId as string);
})

const prev = computed(() => {
  let prev = chapters.value.find((c) => c.nextId === chapterId.value);
  return prev ? prev.id : 0;
});

const chapter = computed(() => {
  return chapters.value.find(c => c.id === chapterId.value);
});

// life cicles
if (chapters.value.length < 1) {
  fetchChapters(bookId.value);
}

if (!book.value) {
  fetchBook(bookId.value);
}

onMounted(async () => {
  try {
    content.value = (await getChapterContent(chapterId.value) as ChapterContent).content;
  } catch (e) {
    content.value = "## 获取文章内容出错了";
  }
});

onBeforeRouteLeave(async (to, from) => {
  if (to.path.includes("edit")) {
    if (to.query.type === "update") {
      setChapterData(chapter.value?.name || "", chapter.value?.part || "", content.value);
    } else {
      setChapterData("", "", "");
    }
  }
});

onBeforeRouteUpdate(async (to, from) => {
  // go to edit page
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
          <RouterLink :to="`/book/${bookId}`">{{ book?.name }}</RouterLink>
        </div>
        <div class="toc-item" v-for="chapter in chapters">
          <RouterLink :to="`/book/${bookId}/chapters/${chapter.id}`">{{ chapter.name }}</RouterLink>
        </div>
      </div>
    </div>
    <div class="main">
      <MarkdownVue :markdown="content"></MarkdownVue>
      <div class="foot">
        <div class="prev">
          <RouterLink :to="`/book/${bookId}/chapters/${prev}`" v-show="prev > 0">上一章</RouterLink>
        </div>
        <div class="next">
          <RouterLink :to="`/book/${bookId}/chapters/${chapter?.nextId}`" v-show="chapter?.nextId">下一章</RouterLink>
        </div>
      </div>
    </div>

    <div class="tools">
      <div class="tool">
        <RouterLink :to="`/book/${bookId}/chapters/${chapterId}/edit?type=create`">
          <i class="iconfont icon-createtask"></i>
          <div class="name">新建</div>
        </RouterLink>
      </div>
      <div class="tool">
        <RouterLink :to="`/book/${bookId}/chapters/${chapterId}/edit?type=update`">
          <i class="iconfont icon-edit"></i>
          <div class="name">修改</div>
        </RouterLink>
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
    padding: 12px;
    margin-right: 12px;
    margin-left: 12px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .tool {
      display: flex;
      flex-direction: column;
      align-items: center;

      .iconfont {
        font-size: 24px;
      }
    }
  }
}
</style>