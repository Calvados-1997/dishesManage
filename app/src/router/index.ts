import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DishCountPage from '@/pages/DishCountPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/dish-count/:stdPrice',
      name: 'dish-count',
      component: DishCountPage,
    },
  ],
})

export default router
