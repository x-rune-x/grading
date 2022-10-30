<template>
  <div class="header">
    <nav>
      <router-link :to="{ name: 'Home' }">
        <h1 class="title">Urban Climb lead grades</h1>
      </router-link>

      <div v-if="!user">
        <router-link :to="{ name: 'Signup' }">
          <span>Sign up</span>
        </router-link>

        <router-link :to="{ name: 'Login' }">
          <span>Login</span>
        </router-link>
      </div>      

      <div v-if="user">
        <button @click="handleSignout">Logout</button>
        <router-link :to="{ name: 'UserDetails' }">
          <span>{{ user.displayName }}</span>
        </router-link>        
      </div>

      <router-link :to="{ name: 'AddClimb' }">
        <button>Add climb</button>
      </router-link>
    </nav>
  </div>
</template>

<script>
import { auth } from '../firebase/config';
import { signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';
import getUser from '../composables/getUser';

export default {
  setup() {
    const router = useRouter()
    const { user } = getUser()

    const handleSignout = () => {
      signOut(auth)

      router.push('/')
    }

    return { handleSignout, user }
  }
}
</script>

<style>
  .header {
    border-bottom: solid 1px black;
    margin-bottom: 10px;
  }
</style>