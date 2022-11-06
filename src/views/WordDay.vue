<script  lang="ts" setup>
import WordHeader from '@/components/WordHeader.vue';
import Switch from '@/components/Switch.vue';
import { onMounted, reactive, ref } from 'vue';
import { getWordSet } from "@/apis/words";
import { useRoute } from 'vue-router';

import type { Word } from "@/types";
import Flip from '@/components/Flip.vue';
import WordMark from '@/components/WordMark.vue';
import { computed } from '@vue/reactivity';

// types
interface State {
  curIndex: number,
  words: Word[],

}

// variables 
const colors = [
  "#bf242a",
  "#96514d",
  "#8d6449",
  "#7a4171",
  "#f08300",
  "#00552e",
  "#1e50a2",
  "#00a3af",
  "#ffb61e",
  "#000"
]

const bgColors = [
  '#fdeff2',
  '#e4d2d8',
  '#cca6bf',
  '#e7e7eb',
  '#d3cfd9',
  '#eaf4fc',
  '#c1e4e9',
  '#d4dcda'
]

const route = useRoute();

// states
const modeKey = ref<string>("en");
const answerKey = ref<string>("cn");
const frontColor = ref<string>(getRandomColor());
const frontBGColor = ref<string>(getRandomBGColor());
const backColor = ref<string>(getRandomColor());
const backBGColor = ref<string>(getRandomBGColor());

const state: State = reactive({
  curIndex: 0,
  words: [],
});

// computed
const frontWord = computed(() => {
  return state.words[state.curIndex] && state.words[state.curIndex][modeKey.value as keyof Word];
});

const backWord = computed(() => {
  return state.words[state.curIndex] && state.words[state.curIndex][answerKey.value as keyof Word];
});

// methods
function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomBGColor() {
  return bgColors[Math.floor(Math.random() * bgColors.length)]
}

function gotoWord(idx: number) {
  frontColor.value = getRandomColor();
  backColor.value = getRandomColor();
  frontBGColor.value = getRandomBGColor();
  backBGColor.value = getRandomBGColor();
  // update current index
  state.curIndex = idx;
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
  state.words = await getWordSet(route.params.setid as string)
})
</script>

<template>
  <WordHeader></WordHeader>

  <div class="container main">
    <Switch class="switch" @change="changeMode"></Switch>
    <Flip class="word">
      <template #front>
        <div class="content front" :style="{ color: frontColor, backgroundColor: frontBGColor }">
          {{ frontWord }}
        </div>
      </template>

      <template #back>
        <div class="content back" :style="{ color: backColor, backgroundColor: backBGColor }">
          {{ backWord }}
        </div>
      </template>
    </Flip>

    <div class="cards">
      <div class="line"></div>
      <WordMark v-for="(word, idx) in state.words" :key="word.id" @click="gotoWord(idx)"
        :content="word[modeKey as keyof Word] as string" :active="idx === state.curIndex">
      </WordMark>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  position: relative;
}

.switch {
  position: absolute;
  right: calc(50% - 400px);
}


.word {
  width: 500px;
  height: 300px;
  margin: 30px auto;

  .content {
    width: 500px;
    height: 260px;
    border-radius: 12px;
    padding: 16px 20px;
    font-size: 28px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .front {
    background-color: #006e54;
  }

  .back {
    background-color: #96514d;
  }
}

.cards {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 4px;
  display: flex;
  justify-content: center;

  .line {
    position: absolute;
    bottom: 216px;
    width: 100%;
    height: 2px;
    background-color: #e83929;
  }
}
</style>