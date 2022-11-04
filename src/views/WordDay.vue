<script setup lang="ts">
import WordHeader from '@/components/WordHeader.vue';
import Switch from '@/components/Switch.vue';

import { onMounted, reactive, ref } from 'vue';
// types
interface Word {
  id: string | number,
  en: string,
  cn: string,
}

interface State {
  word: Word,
  freshWords: Word[],
  cookedWords: Word[],
}

// states
const isAnswerHide = ref<boolean>(true);
const input = ref<string>("");
const modeKey = ref<string>("en");
const answerKey = ref<string>("cn");

const state: State = reactive({
  word: { id: 0, en: "Press any key to continue...", cn: "按任意键继续!" },
  freshWords: [],
  cookedWords: [],
});

// methods
function getStarted() {
  document.removeEventListener("keyup", getStarted);
  loadWord();
}

function showAnswer() {
  isAnswerHide.value = !isAnswerHide.value;
}

function clearInput() {
  input.value = "";
}

function loadWord() {
  if (state.freshWords.length > 0) {
    isAnswerHide.value = true;
    state.word = state.freshWords.shift()!;
    clearInput();
  } else {
    state.word = { id: -1, en: "Congratulations!!!", cn: "单词背完啦!" };
  }
}

function cookWord() {
  if (state.word.id > 0) {
    // ignore first or last
    state.cookedWords.unshift(state.word);
  }

  loadWord();
}

function meltdown() {
  if (state.word.id > 0) {
    state.freshWords.push(state.word);
  }

  loadWord();
}

function changeMode(mode: boolean) {
  if (mode) {
    modeKey.value = 'cn';
    answerKey.value = 'en';
  } else {
    modeKey.value = 'en';
    answerKey.value = 'cn';
  }
}

// life cicle
onMounted(async () => {
  state.freshWords = [
    {
      id: 1,
      en: "justify-content",
      cn: "弹性盒子主轴对齐属性",
    },
    {
      id: 2,
      en: "flex",
      cn: "弹性盒子属性值或弹性元素属性弹性盒子属性值或弹性元素属性",
    }
  ]

  document.addEventListener("keyup", getStarted);
})
</script>

<template>
  <WordHeader></WordHeader>

  <div class="container page">
    <aside class="fresh">
      <ul id="fresh-box" class="text-lg">
        <!-- 单词列表 -->
        <li class="w-item" v-for="(word) in state.freshWords" :key="word.id">
          <span>{{ word[modeKey as keyof Word] }}</span>
          <i class="iconfont icon-question text-lg"></i>
        </li>
      </ul>
    </aside>
    <main class="main">
      <Switch @change="changeMode" class="switch"></Switch>
      <!-- 单词 -->
      <h1 class="word-box s1 text-xl">
        {{ state.word[modeKey as keyof Word] }}
      </h1>
      <!-- 答案 -->
      <div class="answer text-lg s2" :class="{ hide: isAnswerHide }">
        {{ state.word[answerKey as keyof Word] }}
      </div>
      <!-- 笔记区 -->
      <div class="write-box">
        <textarea class="write text-xl" rows="3" placeholder="随便写点啥" v-model="input" autofocus></textarea>
      </div>
      <!-- 操作区 -->
      <div class="action">
        <button class="btn btn-primary" @click="showAnswer">查看答案</button>
        <button class="btn btn-success" @click="cookWord">斩杀单词</button>
        <button class="btn btn-danger" @click="meltdown">再记一遍</button>
      </div>
      <!-- 提示信息 -->
      <div class="info">
        <h3>单词汪操作手册</h3>
        <ul>
          <li>左手边是还没记的单词</li>
          <li>右手边是已经记住的单词</li>
          <li>输入框可以写单词意思或根据中文写单词</li>
          <li>查看答案可以查看答案，仅供参考~o( =∩ω∩= )m</li>
          <li>切换中英文模式</li>
        </ul>
      </div>
    </main>
    <aside class="cooked">
      <ul id="cooked-box" class="text-lg">
        <!-- 单词列表 -->
        <li class="w-item" v-for="(word) in state.cookedWords" :key="word.id">
          <i class="iconfont icon-check text-lg"></i>
          <span>{{ word[modeKey as keyof Word] }}</span>
        </li>
      </ul>
    </aside>
  </div>
</template>


<style scoped lang="scss">
.page {
  display: flex;

  // 一些工具样式
  .text-lg {
    font-size: 24px;
  }

  .hide {
    opacity: 0;
  }

  .text-xl {
    font-size: 32px;
  }

  // 左边栏
  .fresh {
    flex-shrink: 0;

    box-sizing: border-box;
    width: 300px;
    height: calc(100vh - var(--header-height));
    background-color: #e9dfe5;
    padding: 2rem 1rem 0;

    font-family: Consolas, "Courier New", Courier, FreeMono, monospace, YouYuan;
    text-align: right;
    line-height: 1.5;
    color: #bb5548;

    overflow-y: auto;

    .w-item {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      transition: .3s;
    }
  }

  // 右边栏
  .cooked {
    flex-shrink: 0;

    box-sizing: border-box;
    width: 300px;
    height: calc(100vh - var(--header-height));
    background-color: #e7e7eb;
    padding: 2rem 1rem 0;
    line-height: 1.5;

    font-family: Consolas, "Courier New", Courier, FreeMono, monospace, YouYuan;
    color: #38b48b;
    overflow-y: auto;

    .w-item {
      display: flex;
      align-items: center;
      transition: .3s;
    }
  }

  .main {
    flex-grow: 1;
    overflow: hidden;

    box-sizing: border-box;
    background-color: #d3cfd9;
    height: calc(100vh - var(--header-height));
    padding-top: 16px;

    font-family: "Comic Sans MS", YouYuan;
    position: relative;

    .switch {
      position: absolute;
      right: 8px;
      top: 6px;
    }
  }

  .word-box {
    padding: 0 12px;
    text-align: center;
    margin-bottom: 32px;

    transition: .3s;
  }

  .answer {
    text-align: center;
    padding: 0 24px;
    margin-bottom: 32px;
    color: #333;

    transition: .3s;
  }

  .write-box {
    display: flex;
    justify-content: center;

    .write {
      width: 100%;
      text-align: center;
      background-color: transparent;
      padding: 0 24px;
      resize: none
    }
  }

  .action {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }

  .btn {
    padding: 4px 8px;
    font-size: 1.5rem;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn:hover {
    opacity: 0.7;
  }

  .btn-primary {
    background-color: #dbd0e6;
    border: 2px solid #4a488e;
    color: #4a488e;
  }

  .btn-success {
    background-color: #badcad;
    border: 2px solid #47885e;
    color: #47885e;
  }

  .btn-danger {
    background-color: #fde8d0;
    border: 2px solid #bb5548;
    color: #bb5548;
  }

  .action .btn:not(:first-child) {
    margin-left: 1rem;
  }

  .info {
    width: 100%;
    box-sizing: border-box;
    padding: 16px 48px;
    line-height: 1.5;

    color: #00adb5;
    background-color: #eeeeee;
    border-left: 3px solid #3fc1c9;
    position: absolute;
    bottom: 0;
  }

  .info ul {
    list-style: disc;
  }
}
</style>