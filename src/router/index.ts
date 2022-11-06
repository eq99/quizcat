import { createRouter, createWebHistory } from 'vue-router';

import Space from "@/views/Space.vue";
const Tmp = () => import('@/views/Tmp.vue');
const Quiz = () => import("@/views/Quiz.vue");
const Exercises = () => import('@/views/Exercises.vue');
const WordSet = () => import("@/views/WordSet.vue");
const WordDay = () => import("@/views/WordDay.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Space },
    { path: '/tmp', component: Tmp },
    { path: "/exs", component: Exercises },
    { path: '/ex/:exid', component: Quiz },
    { path: "/words", component: WordSet },
    { path: "/words/:setid", component: WordDay },
  ]
})

export default router
