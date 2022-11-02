import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
const Quiz = () => import("@/views/Quiz.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/ex/:exid', component: Quiz },
  ]
})

export default router
