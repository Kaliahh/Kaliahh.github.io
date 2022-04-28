import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChordsView from '@/views/ChordsView'
import TonesView from '@/views/TonesView'
import CircleView from '@/views/CircleView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/chords',
    name: 'chords',
    component: ChordsView
  },
  {
    path: '/tones',
    name: 'tones',
    component: TonesView
  },
  {
    path: '/circle',
    name: 'circle',
    component: CircleView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
