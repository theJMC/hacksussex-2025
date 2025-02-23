import { createRouter, createWebHistory } from 'vue-router'
import LessonView from '../views/LessonView.vue'
import CardView from '../views/CardView.vue'
import BrunoTransition from '@/views/BrunoTransition.vue'
import NetworkView from '@/views/NetworkView.vue'
import WordStoryView from '@/views/WordStoryView.vue'
import MainApp from '@/views/MainApp.vue'
import HomePage from '@/views/Homepage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
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
    {
      path: '/network',
      name: 'network',
      component: NetworkView,
    },
    {
      path: '/word-story',
      name: 'story',
      component: WordStoryView,
    },
    {
      path: '/main',
      name: 'main',
      component: MainApp,
    },
    {
      path: '/practice',
      name: 'practice',
      component: LessonView,
    }
  ],
})

export default router
