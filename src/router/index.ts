import { createRouter, createWebHistory } from 'vue-router'

import Space from "@/views/Space.vue"
const Quiz = () => import("@/views/Quiz.vue")
const Exercises = () => import('@/views/Exercises.vue')
const Word = () => import("@/views/Words.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Space },
    { path: "/exs", component: Exercises },
    { path: '/ex/:exid', component: Quiz },
    { path: "/words", component: Word },
  ]
})

export default router
