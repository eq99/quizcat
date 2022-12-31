<script  lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';
import MarkdownVue from '@/components/know/Markdown.vue';
import { Button } from 'xiaui';
import { useBookStore, useExerciseEditStore, useExerciseStore, useManagerStore } from '@/stores/book';
import { getExerciseContent } from "@/apis/book";

// types
interface ExerciseDetail {
  content: string,
  solution: string,
}

// vars
const route = useRoute();
const bookStore = useBookStore();
const exerciseStore = useExerciseStore();
const managerStore = useManagerStore();
const exerciseEditStore = useExerciseEditStore();
const { isManager } = managerStore;
const { fetchExercises } = exerciseStore;
const { exercises } = storeToRefs(exerciseStore);
const { fetchBook } = bookStore;
const { book } = storeToRefs(bookStore);
const { setExerciseData } = exerciseEditStore;


// states
const detail = ref<ExerciseDetail>();
const isHidden = ref(true);

const answer = ref("");

// computed
const bookId = computed(() => {
  return Number(route.params.bookId as string);
})

const exerciseId = computed(() => {
  return Number(route.params.exerciseId as string);
});

const exercise = computed(() => {
  return exercises.value.find(e => e.id === exerciseId.value);
});


// methods
function showSolution() {
  isHidden.value = !isHidden.value;
}

function handleSave() {

}

// life cicles
if (exercises.value.length < 1) {
  fetchExercises(bookId.value);
}

if (!book.value) {
  fetchBook(bookId.value);
}

onMounted(async () => {
  detail.value = await getExerciseContent(exerciseId.value);
});

onBeforeRouteLeave(async (to, from) => {
  if (to.path.includes("edit")) {
    if (to.query.type === "update") {
      setExerciseData(
        exercise.value?.title || "",
        detail.value?.content || "",
        detail.value?.solution || "",
        exercise.value?.tags || "",
        exercise.value?.hard || 1,
      );
    } else {
      setExerciseData("", "", "", "", 1);
    }
  }
});

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.exerciseId !== from.params.exerciseId) {
    detail.value = await getExerciseContent(to.params.exerciseId as string);
    window.scrollTo(0, 0);
  }
});
</script>

<template>
  <div class="ex-layout">
    <div class="side">
      <dl class="contents">
        <dt>
          <RouterLink :to="`/book/${bookId}`">{{ book?.name }}</RouterLink>
        </dt>
        <dd v-for="(ex, idx) in exercises" :key="ex.id">
          <RouterLink :to="`/book/${bookId}/exs/${ex.id}`" class="c-link">
            <span class="order">{{ idx + 1 }}. </span>
            <span class="s1">{{ ex.title }}</span>
          </RouterLink>
        </dd>
      </dl>
    </div>

    <div class="main">
      <div class="question">
        {{ exercise?.title }}
      </div>

      <div class="content">
        <MarkdownVue :markdown="detail?.content || ``"></MarkdownVue>
      </div>

      <div class="write">
        <textarea class="input" rows="10" placeholder="草稿纸" v-model="answer"></textarea>
      </div>

      <div class="actions">
        <Button @click="showSolution">查看解析</Button>
        <Button @click="handleSave">保存答案</Button>
        <Button v-if="isManager(bookId)">
          <RouterLink :to="`/book/${bookId}/exs/${exerciseId}/edit?type=update`">修改题目</RouterLink>
        </Button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ex-layout {
  display: flex;

  .side {
    flex: 0 0 240px;
    background-color: #fff;

    .contents {
      font-size: 12px;

      dt {
        font-size: 16px;
        padding: 12px;
        margin-bottom: 8px;
      }

      dd {
        margin: 12px 0;
        padding-right: 6px;
        max-width: 232px;
      }

      .c-link {
        display: flex;
        align-items: center;

        &.success {
          color: var(--fg-ok-light);
        }

        &.router-link-exact-active {
          color: var(--fg-primary);
        }

        .order {
          flex-shrink: 0;
          margin: 0 6px;
        }
      }
    }
  }

  .main {
    flex: 0 0 900px;
    margin-left: 12px;

    .question {
      padding: 12px 0;
      color: var(--fg-base1);
      font-size: 24px;
      background-color: var(--bg-base3);
      padding: 12px;
    }

    .content {
      background-color: #fff;
      padding: 12px;
      border: 1px solid #eee;
    }

    .solution {
      margin: 16px 0;
      border: 1px solid var(--fg-primary);
      padding: 12px;
    }

    .write {
      background-color: var(--bg-base1);

      textarea {
        width: 100%;
        padding: 16px;
        line-height: 1.75;

        resize: vertical;
      }
    }

    .actions {
      margin-top: 12px;
      display: flex;
    }

    .comment {
      padding-bottom: 28px;
    }

    .comment-hd {
      margin-top: 24px;
      color: var(--fg-base3);
    }
  }
}
</style>