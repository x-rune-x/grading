import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddClimb from '../views/AddClimb.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/AddClimb',
    name: 'AddClimb',
    component: AddClimb
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
