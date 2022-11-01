import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/components/Home.vue'
import Quiz from '@/components/Quiz.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/quiz/:qid', component: Quiz },
  ]
})

export default router
