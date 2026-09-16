import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/musician',
      name: 'musician',
      component: () => import('../views/MusicianView.vue'),
    },
    {
      path: '/developer',
      name: 'developer',
      component: () => import('../views/DeveloperView.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    // Instant: a smooth scroll gets cancelled by layout shifts while the new view mounts.
    if (to.hash) return { el: to.hash, top: 92, behavior: 'instant' }
    return { top: 0, behavior: 'instant' }
  },
})

export default router
