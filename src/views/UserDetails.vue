<template>
  <div class="profileDetails">
    <h3>Profile</h3>
    <div class="detail">Email: {{ user.email }}</div>
    <div class="detail">Display name: {{ user.displayName }}</div>
    <button @click="handlePasswordReset">Reset password</button>   
    <div class="detail" v-if="message">{{ message }}</div> 
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase/config';
import getUser from '../composables/getUser';
import { sendPasswordResetEmail } from '@firebase/auth';

export default {
  name: 'User details',
  setup() {
    const { user } = getUser()    
    const message = ref(null)

    window.scrollTo({ top: 0, behavior: 'smooth' })

    const handlePasswordReset = () => {
      sendPasswordResetEmail(auth, user.value.email).then(() => {
        console.log('Sending password reset email.')
        message.value = 'Password reset email has been sent.'
      }).catch((error) => {
        message.value = error.message
      })
    }

    return { user, handlePasswordReset, message }
  }
}
</script>

<style scoped>
  .profileDetails {
    padding: 10px;
  }
  h3 {
    padding-bottom: 10px;
  }
  .detail {
    padding-bottom: 10px;
  }
</style>