<script  lang="ts" setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { renderMarkdown } from '@/lib';

import Button from '@/components/buttons/Button.vue';
import ICommentCard from '@/components/ICommentCard.vue';

import { useInterviewStore } from '@/stores/interview';
import { getICommentsByQestionId, saveIComment } from '@/apis/interviews';
import { useSigninStore, useTokenStore } from '@/stores/token';

import type { IQuestion, ICommentWithUser } from '@/types';

// states:
const isHidden = ref(true);
const iQuestion = ref<IQuestion>();
const comments = ref<ICommentWithUser[]>();
const content = ref<string>("");

const route = useRoute();
const { getIQuestionById, getMyComments } = useInterviewStore();
const { token } = storeToRefs(useTokenStore());
const { openSignin } = useSigninStore();

// methods
function showSolution() {
  isHidden.value = !isHidden.value;
}

function handleSave() {
  if (!token.value) {
    openSignin();
    return;
  }

  if (content.value.length < 1 || content.value.length > 4000) {
    alert('回答长度：1~4000字');
    return;
  }

  saveIComment(content.value, iQuestion.value?.id!, iQuestion.value?.bookID!, token.value.value).then((data => {
    alert('保存成功');
  })).catch(err => {
    alert('保存失败,请稍后再试');
  });
}

// life cicles
onMounted(async () => {
  iQuestion.value = getIQuestionById(route.params.questionId as string);
  comments.value = await getICommentsByQestionId(route.params.questionId as string);
  content.value = getMyComments(route.params.questionId as string)?.content || '';
});

onBeforeRouteUpdate(async (to, from) => {
  // set new question
  if (to.params.questionId !== from.params.questionId) {
    iQuestion.value = getIQuestionById(to.params.questionId as string);
    comments.value = await getICommentsByQestionId(to.params.questionId as string)

    // hide solution
    isHidden.value = true;
    content.value = getMyComments(to.params.questionId as string)?.content || '';
  }
});
</script>

<template>
  <div class="question">
    {{ iQuestion?.body }}
  </div>

  <div class="write">
    <textarea class="input" rows="10" placeholder="写思路" v-model="content"></textarea>
  </div>

  <div class="solution" v-show="!isHidden">
    <div class="markdown" v-html='renderMarkdown(iQuestion?.solution)'></div>
  </div>

  <div class="actions">
    <Button @click="showSolution">查看解析</Button>
    <Button @click="handleSave">保存答案</Button>
  </div>

  <div class="comment">
    <div class="comment-hd">其他回答</div>
    <ICommentCard v-for="comment in comments" :comment="comment"></ICommentCard>
  </div>
</template>


<style lang="scss" scoped>
.question {
  padding: 12px 0;
  color: var(--fg-base4);
  font-size: 28px;
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
</style>