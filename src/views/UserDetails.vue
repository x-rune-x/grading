<template>
  <div>
    <h3>Profile</h3>
    <span>Email: {{ user.email }}</span>
    <span>Display name: {{ user.displayName }}</span>
    <button @click="handlePasswordReset">Reset password</button>   
    <span v-if="message">{{ message }}</span> 
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

<style>

</style>