<script setup lang="ts">
// @ts-nocheck
import { getQuizzesByExerciseID } from '@/apis/quiz';
import { getExcerciseByID } from "@/apis/exercise";
import { debounce, renderMarkdown } from '@/lib';
import { reactive, computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// constant
const QuizKinds: [string] = ["简答题"];

// variables
const route = useRoute()

// state
const state = reactive({
  quizzes: [],
  exercise: null,
  curIndex: 0,
  isSolutionShow: false,
  answer: "",
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
  state.isSolutionShow = !state.isSolutionShow;
}

function gotoQuiz(idx: number) {
  // hide solution
  state.isSolutionShow = false;
  // update current index
  state.curIndex = idx;
  // load my answer
  state.answer = state.quizzes[state.curIndex].answer || "";
}

function handleInput() {
  // save answer to quiz object
  state.quizzes[state.curIndex]["answer"] = state.answer;
}

const debounceInput = debounce(handleInput, 1000);

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
  state.quizzes = await getQuizzesByExerciseID(route.params.exid);
  state.exercise = await getExcerciseByID(route.params.exid);
});
</script>

<template>
  <div class="q-box">
    <div class="q-side">
      <h3 class="q-tips">{{ state.exercise?.title }}</h3>
      <nav class="q-nav">
        <div class="nav-item " :class="{ active: quiz.answer }" v-for="(quiz, idx) in state.quizzes"
          @click="gotoQuiz(idx)">
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
        <textarea class="q-input" rows="10" placeholder="随便写写" v-model="state.answer" @input="debounceInput"></textarea>
      </div>
      <div class="q-action">
        <button class="btn" @click="showSolution">查看解析</button>
        <button class="btn ms-auto" @click="prevQuiz">上一题</button>
        <button class="btn " @click="nextQuiz">下一题</button>
      </div>
      <div class="q-solution" v-show="state.isSolutionShow">
        <div class="markdown" v-html="htmlSolution"></div>
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
  background-color: var(--bg-primary);
  margin: 0 8px 0 16px;
  padding: 1rem 1rem 3rem 1rem;
}

.q-side .q-tips {
  color: var(--fg-primary);
  margin-bottom: 3rem;
}

.q-side .q-nav {
  display: flex;
  flex-wrap: wrap;
}

.q-side .q-nav .nav-item {
  background-color: var(--bg-secondary);
  padding: 1rem 1.5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
}

.q-side .q-nav .nav-item.active {
  background-color: var(--bg-green);
  color: var(--fg-green);
}

.q-card {
  width: 60%;
}

.q-head {
  padding: 8px 16px;
  background-color: var(--bg-secondary);

  display: flex;
  align-items: center;
}

.q-head .q-id {
  font-size: 24px;
  color: var(--fg-primary);
}

.q-head .q-id::after {
  content: ".";
  margin-right: 5px;
}

.q-head .q-level {
  color: var(--fg-gold);
  margin: 0 8px;
}

.q-body {
  background-color: #fafafa;
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

.btn {
  cursor: pointer;
  padding: 1rem 2rem;
  margin-right: 1rem;
  background-color: var(--bg-primary);
  color: var(--fg-primary);
}

.q-solution {
  border: 1px solid var(--fg-primary);
  margin-top: 1rem;
  padding: 1rem;
}
</style>