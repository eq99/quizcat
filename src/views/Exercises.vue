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

// life cicle
onMounted(async () => {
  state.exercises = await getExcercises();
});
</script>

<template>
  <ExHeader></ExHeader>
  <div class="q-list">
    <router-link :to="'/ex/' + ex.id" v-for="ex in state.exercises" :key="ex.id" class="q-item">
      <h3 class="title">{{ ex.title }}</h3>
      <div class="foot">
        <DataPill text="练习数" :data="ex.quizNum"></DataPill>
        <time class="time"> {{ formatTime(ex.updatedAt) }} </time>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
.q-list {
  width: 50%;
  margin: 0 auto;
}

.q-item {
  display: block;
  background-color: var(--bg-primary);
  padding: 8px 16px;
  margin: 12px 0;
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