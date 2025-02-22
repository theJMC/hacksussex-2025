import { createRouter, createWebHistory } from 'vue-router'
import LessonView from '../views/LessonView.vue'
import CardView from '../views/CardView.vue'
import BrunoTransition from '@/views/BrunoTransition.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LessonView,
    },
    {
      path: '/cards',
      name: 'cards',
      component: CardView,
    },
    {
      path: '/bruno',
      name: 'bruno',
      component: BrunoTransition,
    },
  ],
})

export default router
