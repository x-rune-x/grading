import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddClimb from '../views/AddClimb.vue'
import Climb from '../views/Climb.vue'
import Signup from '../views/Signup.vue'

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
  },
  {
    path: '/climb/:id',
    name: 'Climb',
    component: Climb,
    props: true
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
