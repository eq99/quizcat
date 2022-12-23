<script  lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { getICommentsByUserId, getIQuestionsByBookId } from '@/apis/interviews'
import { useInterviewStore } from '@/stores/interview'
import { useTokenStore } from '@/stores/token';
import type { InterviewBook } from '@/types';

// states
const book = ref<InterviewBook>();

const interviewStore = useInterviewStore();
const { iquestions, comments } = storeToRefs(interviewStore);
const { loadQuestions, loadComments, getIBookById } = interviewStore;

const route = useRoute();
const { token } = storeToRefs(useTokenStore());

// methods
function answered(qid: number): boolean {
  return comments.value.findIndex(c => c.iQuestionID === qid) > -1
}

// life cicle
onMounted(async () => {
  loadQuestions(await getIQuestionsByBookId(route.params.bookId as string));
  loadComments(await getICommentsByUserId(route.params.bookId as string, token.value?.value || ""))
  book.value = getIBookById(route.params.bookId as string);
});
</script>

<template>
  <div class="container">
    <dl class="contents">
      <dt>
        <RouterLink :to="`/interviews/${book?.id}`">{{ book?.name }}</RouterLink>
      </dt>
      <dd v-for="(question, idx) in iquestions" :key="question.id">
        <RouterLink :to="`/interviews/${question.bookID}/${question.id}`" class="c-link"
          :class="{ success: answered(question.id) }">
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