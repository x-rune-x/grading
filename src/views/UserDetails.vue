<template>
  <div>
    <h3>Profile</h3>
    <span>Email: {{ user.email }}</span>
    <span>Display name: {{ user.displayName }}</span>
    <button @click="displayPasswordChange=true">Change password</button>

    <form v-if="displayPasswordChange" @submit.prevent="handleChangePassword">
      <label for="current">Current password</label>
      <input name="current" type="password" v-model="currentPassword" required>

      <label for="new1">Type new password</label>
      <input name="new1" type="text" v-model="newPassword1" required>

      <label for="new2">Confirm password</label>
      <input name="new2" type="password" v-model="newPassword2" required>

      <button>Save</button>
      <button @click="displayPasswordChange=false">Cancel</button>

      <span v-if="message">{{ message }}</span>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase/config';
import getUser from '../composables/getUser';
import { updatePassword } from '@firebase/auth';

export default {
  name: 'User details',
  setup() {
    const { user} = getUser()
    const currentPassword = ref(null)
    const newPassword1 = ref(null)
    const newPassword2 = ref(null)
    const message = ref(null)

    const displayPasswordChange = ref(false)

    const handleChangePassword = () => {
      if (currentPassword == user.password && currentPassword != null) {
        if (newPassword1 == newPassword2 && newPassword1 != null & newPassword2 != null) {
          updatePassword(user, newPassword1).then(() => {
            message = 'Password update successful.'
            currentPassword = null
            newPassword1 = null
            newPassword2 = null

            setTimeout(() => { displayPasswordChange = false }, 2000)            
          }).catch((err) => {
            message = 'There was a problem with updating the password.'
          })
        }
        else {
          message = 'The passwords you entered do not match.'
        }
      }
      else {
        message = 'Current password is incorrect.'
      }      
    }

    return { user, displayPasswordChange, handleChangePassword, currentPassword, newPassword1, newPassword2, message }
  }
}
</script>

<style>

</style>