<script  lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';

import { getIQuestionsByBookId } from '@/apis/interviews'
import { useInterviewStore } from '@/stores/interview'


import { storeToRefs } from 'pinia';

// states
const interviewStore = useInterviewStore();
const { iquestions } = storeToRefs(interviewStore);
const { loadQuestions } = interviewStore;

const route = useRoute();

// life cicle
onMounted(async () => {
  loadQuestions(await getIQuestionsByBookId(route.params.bookId as string))
});

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