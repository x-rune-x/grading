<template>
  <div class="header">
    <nav>
      <div class="leftComponents">
        <router-link :to="{ name: 'Home' }">
          <h1 class="title headerComponent">Urban Climb lead grades</h1>
        </router-link>

        <router-link :to="{ name: 'AddClimb' }">
          <button class="headerComponent">Add climb</button>
        </router-link>
      </div>      

      <div v-if="!user" class="headerComponent user">
        <router-link :to="{ name: 'Signup' }">
          <span>Sign up</span>
        </router-link>

        <router-link :to="{ name: 'Login' }">
          <span>Login</span>
        </router-link>
      </div>      

      <div v-if="user" class="headerComponent user">          
        <router-link :to="{ name: 'UserDetails' }">
          <span class="headerComponent userComp">{{ user.displayName }}</span>
        </router-link>   
        <button @click="handleSignout">Logout</button>     
      </div>
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

<style scoped>
  .header {
    border-bottom: solid 1px var(--secondary);
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
  nav {   
    display: flex;
    align-items: center;
    width: 80vw;
    padding: 20px 0;
    justify-content: space-between;
  }
  .headerComponent {
    display: inline-block;
  }
  .title {
    font-size: 32px;
    padding-right: 20px;
  }
  .userComp {
    padding: 0 10px;
  }
  .leftComponents {
    display: flex;
    align-items: center;
  }
</style>