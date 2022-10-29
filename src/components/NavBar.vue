<template>
  <div class="header">
    <nav>
      <router-link :to="{ name: 'Home' }">
        <h1 class="title">Urban Climb lead grades</h1>
      </router-link>

      <router-link :to="{ name: 'Signup' }">
        <span>Sign up</span>
      </router-link>

      <router-link :to="{ name: 'Login' }">
        <span>Login</span>
      </router-link>

      <button @click="handleSignout">Logout</button>
    </nav>
  </div>
</template>

<script>
import { auth } from '../firebase/config';
import { signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter()
    const handleSignout = () => {
      signOut(auth)

      router.push('/')
    }

    return { handleSignout }
  }
}
</script>

<style>
  .header {
    border-bottom: solid 1px black;
    margin-bottom: 10px;
  }
</style>