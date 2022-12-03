<template>
  <div>
    <form @submit.prevent="handleSignup">
      <h3>Sign up</h3>

      <label for="email">Enter email</label>
      <input type="email" name="email" v-model="email" required autocomplete="email">

      <label for="displayName">Enter username</label>
      <input type="text" name="displayName" v-model="displayName" required autocomplete="username">

      <label for="password">Enter password</label>
      <input type="password" name="password" v-model="password" required autocomplete="new-password">

      <div class="signup">
        <button>Sign up</button>
        <div v-if="error" class="error">{{ error }}</div>
      </div>      
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
      await signup(email.value, password.value, displayName.value)

      if (!error.value) {
        router.push({name: 'Verify'})
      }
    }

    return { handleSignup, email, displayName, password, error }
  }
}
</script>

<style scoped>
  h3 {
    text-align: center;
    padding-bottom: 15px;
  }
  .signup {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>