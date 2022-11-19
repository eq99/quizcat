<script setup lang="ts">
import type { Quiz, Exercise, Solution } from '@/types';
import { reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { debounce, renderMarkdown } from '@/lib';

import ExHeader from '@/components/ExHeader.vue';
import Button from '@/components/buttons/Button.vue';
import SolutionCard from '@/components/SolutionCard.vue';

import { useSigninStore, useTokenStore } from "@/stores/token";
import { useUserStore } from '@/stores/user';
import { storeToRefs } from "pinia";

import {
  getQuizzesByExerciseID,
  getExcerciseByID,
  saveSolution,
  getSolutionsByQuizId,
} from '@/apis/exercise';


// types
interface State {
  quizzes: Quiz[],
  exercise: Exercise | null,
  curIndex: number,
  isSolutionShow: boolean,
  answer: string,
  answers: string[],
  solutions: Solution[][],
}

// constant
const QuizKinds: string[] = ["简答题"];

// variables
const route = useRoute();
const { token } = storeToRefs(useTokenStore());
const { user } = storeToRefs(useUserStore());
const { openSignin } = useSigninStore();

// state
const state: State = reactive({
  quizzes: [],
  exercise: null,
  curIndex: 0,
  isSolutionShow: false,
  answer: "",
  answers: [], // 保存用户每个题答案, 采用自然数组序号，而不是 quizid
  solutions: [],// 保存每个题所有用户答案, 采用自然数组序号
});

// methods
function nextQuiz() {
  if (state.curIndex + 1 < state.quizzes.length) {
    gotoQuiz(state.curIndex + 1);
  } else {
    alert("题目做完啦")
  }
}

function prevQuiz() {
  if (state.curIndex > 0) {
    gotoQuiz(state.curIndex - 1);
  } else {
    alert("已经是第一个啦");
  }
}

function showSolution() {
  let solutions = state.solutions[state.curIndex];
  if (!solutions) {
    getSolutionsByQuizId(state.quizzes[state.curIndex].id).then(data => {
      state.solutions[state.curIndex] = data;

      // find answer to user
      if (!user.value) return;
      for (let i = 0; i < data.length; i++) {
        if (data[i].userid === user.value.id) {
          state.answer = data[i].content;
          return;
        }
      }
    });
  }
  state.isSolutionShow = !state.isSolutionShow;
}

function gotoQuiz(idx: number) {
  // hide solution
  state.isSolutionShow = false;
  // update current index
  state.curIndex = idx;
  // load my answer
  state.answer = state.answers[idx] || '';
}

function handleInput() {
  // save answer to quiz object
  state.answers[state.curIndex] = state.answer;
}

const debounceInput = debounce(handleInput, 1000);

function saveAnswer() {
  if (!token.value) {
    openSignin();
    return;
  }

  if (state.answer.length < 1 || state.answer.length > 4000) {
    alert('回答长度：1~4000字');
    return;
  }

  saveSolution(state.answer, state.quizzes[state.curIndex].id, token.value.value).then((data => {
    alert('保存成功');
  })).catch(err => {
    alert('保存失败,请稍后再试');
  })
}

// computed
const quizKind = computed(() => {
  return QuizKinds[state.quizzes[state.curIndex]?.kind] || "简答题";
});

const quizLevel = computed(() => {
  return '★'.repeat(state.quizzes[state.curIndex]?.level);
});

const htmlContent = computed(() => {
  return renderMarkdown(state.quizzes[state.curIndex]?.content);
});

const htmlSolution = computed(() => {
  return renderMarkdown(state.quizzes[state.curIndex]?.solution);
});

// life ciclef
onMounted(async () => {
  state.quizzes = await getQuizzesByExerciseID(route.params.exid as string);
  state.exercise = await getExcerciseByID(route.params.exid as string);
});
</script>

<template>
  <ExHeader></ExHeader>
  <div class="q-box">
    <div class="q-side">
      <h3 class="q-title">{{ state.exercise?.title }}</h3>
      <nav class="q-nav">
        <div class="nav-item " v-for="(quiz, idx) in state.quizzes" :key="quiz.id"
          :class="{ active: state.answers[idx] }" @click="gotoQuiz(idx)">
          {{ idx + 1 }}
        </div>
      </nav>
    </div>

    <div class="q-card">
      <div class="q-head">
        <span class="q-id">{{ state.curIndex + 1 }}</span>
        <span class="q-type">[{{ quizKind }}]</span>
        <span class="q-level">{{ quizLevel }}</span>
      </div>
      <div class="q-body">
        <div class="markdown" v-html='htmlContent'></div>
      </div>
      <div class="q-input-box">
        <textarea class="q-input" rows="10" placeholder="将答案复制到这里可以分享哦" v-model="state.answer"
          @input="debounceInput"></textarea>
      </div>
      <div class="q-action">
        <Button @click="showSolution">查看解析</Button>
        <Button class="ms-auto" kind="base3" @click="saveAnswer">保存答案</Button>
        <Button @click="prevQuiz">上一题</Button>
        <Button @click="nextQuiz">下一题</Button>
      </div>
      <div class="q-solution" v-show="state.isSolutionShow">
        <SolutionCard v-for="solution in state.solutions[state.curIndex]" :solution="solution" :key="solution.id">
        </SolutionCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.q-box {
  display: flex;
  align-items: flex-start;
  padding: 8px 0 16px;
}

.q-side {
  flex-shrink: 0;
  width: 300px;
  background-color: var(--bg-base1);
  margin: 0 8px 0 16px;
  padding: 1rem 1rem 3rem 1rem;
}

.q-side .q-title {
  color: var(--fg-primary);
  margin-bottom: 3rem;
}

.q-side .q-nav {
  display: flex;
  flex-wrap: wrap;
}

.q-side .q-nav .nav-item {
  background-color: var(--bg-base2);
  padding: 1rem 1.5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.q-side .q-nav .nav-item.active {
  background-color: var(--bg-ok-light);
  color: var(--fg-base4);
}

.q-card {
  width: 60%;
}

.q-head {
  padding: 8px 16px;
  background-color: var(--bg-base3);
  color: var(--fg-base1);

  display: flex;
  align-items: center;
}

.q-head .q-id {
  font-size: 24px;
}

.q-head .q-id::after {
  content: ".";
  margin-right: 5px;
}

.q-head .q-level {
  color: gold;
  margin: 0 8px;
}

.q-body {
  background-color: var(--bg-base1);
  padding: 1rem .5rem 1rem 2rem;
}

.q-input {
  width: 100%;
  padding: 1rem 1rem 1rem 2rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 6em;
  border: 1px solid transparent;
}

.q-input:focus {
  border-color: var(--fg-primary);
}

.q-action {
  display: flex;
}

.q-solution {
  margin-top: 1rem;
}
</style>