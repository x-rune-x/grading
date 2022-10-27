<template>
  <div>
    <form @submit.prevent="handleSignup">
      <label for="email">Enter email</label>
      <input type="email" name="email" v-model="email" required>

      <label for="displayName">Enter username</label>
      <input type="text" name="displayName" v-model="displayName" required>

      <label for="password">Enter password</label>
      <input type="password" name="password" v-model="password" required>

      <button>Signup</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup.js'
import { useRouter } from 'vue-router'

export default {
  name: "Signup",
  setup() {
    const email = ref(null)
    const displayName = ref(null)
    const password = ref(null)

    const { error, isPending, signup } = useSignup()
    const router = useRouter()

    const handleSignup = async () => {
      console.log(email.value, displayName.value, password.value)

      await signup(email.value, password.value, displayName.value)

      if (!error.value) {
        router.push('/')
      }
    }

    return { handleSignup, email, displayName, password, error }
  }
}
</script>

<style>

</style>