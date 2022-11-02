import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AddClimb from '../views/AddClimb.vue'
import Climb from '../views/Climb.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'
import UserDetails from '../views/UserDetails.vue'
import Verify from '../views/Verify.vue'
import About from '../views/About.vue'

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
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/UserDetails',
    name: 'UserDetails',
    component: UserDetails
  },
  {
    path: '/Verify',
    name: 'Verify',
    component: Verify
  },
  {
    path: '/About',
    name: 'About',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
