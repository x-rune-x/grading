<template>
  <div>
    <form @submit.prevent="handleLogin" name="login" id="login">
      <h2>Login</h2>
      <section>
        <label for="email">Enter email</label>
        <input type="email" name="email" v-model="email" required autocomplete="email">
      </section>
      
      <section>
        <div class="password">
          <label for="password">Enter password</label>
          <span @click="toggleDisplayPassword()" class="show-password" ref="showPassword">show password</span>
        </div>        
        <input id="current-password" type="password" name="password" v-model="password" required autocomplete="current-password" ref="passwordElement">
      </section>      

      <div class="login">
        <button>Login</button>
        <div v-if="error" class="error">{{ error }}</div>
      </div>      
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

    const passwordElement = ref(null)
    const showPassword = ref(null)

    const { error, isPending, login } = useLogin()

    const handleLogin = async () => {
      await login(email.value, password.value)

      if (!error.value) {
        router.push('/')
      }
    }

    const toggleDisplayPassword = () => {
      if (passwordElement.value.type === 'password') {
        passwordElement.value.type = 'text'
        showPassword.value.textContent = 'hide password'
      }
      else {
        passwordElement.value.type = 'password'
        showPassword.value.textContent = 'show password'
      }
    }

    return { handleLogin, toggleDisplayPassword, email, password, error, passwordElement, showPassword }
  }
}
</script>

<style>
  h2 {
    text-align: center;
    padding-bottom: 15px;
  }
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .show-password {
    justify-self: right;
    padding-left: 20px;
    color: rgb(160, 160, 160);
    text-align: end;
  }
  .show-password:hover {
    cursor: pointer;
  }
  .password {
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding-top: 20px;
  }
</style>