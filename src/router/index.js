import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/components/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemon/',
      name: 'pokemon',
      component: () => import('@/components/Pokemon.vue')
    },
    {
      path: '/pokemon/:name',
      name: 'pokemon-detail',
      component: () => import('@/Views/PokeView.vue')
    }
  ]
})

export default router