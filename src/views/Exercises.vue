<script lang="ts" setup>
import type { Exercise } from "@/types";

import DataPill from '@/components/DataPill.vue';
import { getExcercises } from "@/apis/exercise"
import ExHeader from '@/components/ExHeader.vue';
import { formatTime } from "@/lib"
import { onMounted, reactive } from 'vue';

// types
interface State {
  exercises: Exercise[],
}

// state
const state: State = reactive({
  exercises: [],
});

//methods
function isNew(createdAt: string) {
  const d = new Date(createdAt);
  const today = new Date()

  return today.getTime() - d.getTime() < 2 * 24 * 3600000;
}

// life cicle
onMounted(async () => {
  state.exercises = await getExcercises();
});
</script>

<template>
  <ExHeader></ExHeader>
  <div class="q-list">
    <router-link :to="'/ex/' + ex.id" v-for="ex in state.exercises" :key="ex.id" class="q-item">
      <div class="mark" v-if="isNew(ex.createdAt)">new</div>
      <h3 class="title">{{ ex.title }}</h3>
      <div class="foot">
        <DataPill text="练习数" :data="ex.quizNum"></DataPill>
        <time class="time"> {{ formatTime(ex.updatedAt) }} </time>
      </div>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.q-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0 60px;
}

.q-item {
  width: 20%;
  background-color: var(--bg-base1);
  padding: 8px 16px;
  margin: 12px 8px;

  position: relative;
  transition: .3s;

  &:hover {
    box-shadow: 1px 4px 8px var(--bg-base2);
    transform: scale(1.01);
  }

  .mark {
    width: 30px;
    height: 20px;
    padding: 0 4px;
    background-color: var(--bg-ok-light);
    color: var(--fg-danger);
    font-size: small;
    text-align: center;
    position: absolute;
    top: 0px;
    right: -10px;
  }

  .mark:before {
    content: '';

    border: 10px solid;
    border-color: transparent var(--bg-ok-light) transparent transparent;
    position: absolute;
    right: 38px;
    top: 0px;
  }

  .mark:after {
    content: '';
    width: 10px;
    border: 10px solid;
    border-color: transparent transparent transparent #58661C;
    border-top: 0;
    right: -20px;
    position: absolute;
    top: 20px;
  }
}

.q-item .title {
  color: var(--fg-primary);
  margin-bottom: 8px;
}

.q-item .foot {
  display: flex;
  align-items: center;
}

.q-item .foot .time {
  margin-left: auto;
}
</style>