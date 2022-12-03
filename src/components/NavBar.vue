<template>
  <div class="header">
    <nav>
      <router-link :to="{ name: 'Home' }">
        <h1 class="title headerComponent">Urban Climb lead grades</h1>
      </router-link>

      <div class="actions">
        <div class="leftComponents">
          <router-link :to="{ name: 'AddClimb' }">
            <button class="headerComponent">Add climb</button>
          </router-link>
        </div>      

        <div v-if="!user" class="headerComponent user">
          <router-link :to="{ name: 'Signup' }">
            <span class="userComp">Sign up</span>
          </router-link>

          <router-link :to="{ name: 'Login' }">
            <span class="userComp">Login</span>
          </router-link>
        </div>      

        <div v-if="user" class="headerComponent user">          
          <router-link :to="{ name: 'UserDetails' }">
            <span class="headerComponent userComp">{{ user.displayName }}</span>
          </router-link>   
          <button @click="handleSignout">Logout</button>     
        </div>
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
    border-bottom: solid 2px var(--secondary);
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
  }
  nav {   
    width: 85vw;
    padding: 20px 0 15px 0;
  }
  .actions {
    padding-top: 15px;
    margin: 0 auto 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .headerComponent {
    display: inline-block;
  }
  .title {
    font-size: 25px;
    text-align: left;
  }
  .userComp {
    padding: 5px 10px;
    font-size: large;
  }
  .userComp:hover {
    border-bottom: solid 2px rgb(173, 173, 190);
  }
  .leftComponents {
    display: flex;
    align-items: center;
  }
</style>