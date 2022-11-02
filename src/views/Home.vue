<script lang="ts" setup>
// @ts-nocheck
import DataPill from '@/components/DataPill.vue';
import { getExcercises } from "@/apis/exercise"
import { formatTime } from "@/lib"
import { onMounted, reactive } from 'vue';

const state = reactive({
  exercises: [],
});

onMounted(async () => {
  state.exercises = await getExcercises("/exercises");
});
</script>

<template>
  <div class="q-list">
    <router-link :to="'/ex/' + ex?.id" v-for="(ex, idx) in state.exercises" class="q-item">
      <h3 class="title">{{ ex?.title }}</h3>
      <div class="foot">
        <DataPill text="练习数" :data="ex?.quiz_num"></DataPill>
        <time class="time"> {{ formatTime(ex?.updated_at) }} </time>
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