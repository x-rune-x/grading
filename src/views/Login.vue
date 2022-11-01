<template>
  <div>
    <form @submit.prevent="handleLogin">
      <h3>Login</h3>
      <label for="email">Enter email</label>
      <input type="email" name="email" v-model="email" required autocomplete="email">

      <label for="password">Enter password</label>
      <input type="password" name="password" v-model="password" required autocomplete="current-password">

      <button>Signin</button>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useLogin from '../composables/useLogin.js'

export default {
  name: "Signin",
  setup() {
    const email = ref(null)
    const password = ref(null)
    const router = useRouter()

    const { error, isPending, login } = useLogin()

    const handleLogin = async () => {
      await login(email.value, password.value)

      if (!error.value) {
        router.push('/')
      }
    }

    return { handleLogin, email, password, error }
  }
}
</script>

<style>

</style>