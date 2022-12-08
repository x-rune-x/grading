<template>
  <div>
    <form @submit.prevent="handleLogin" name="login" id="login">
      <div class="close">
        <span class="action" v-if="!showLogin" @click="toggleLoginOrResend(true)">close</span>
      </div> 

      <h2 v-if="showLogin">Login</h2>
      <h2 v-else>Send password reset email</h2>
      <section>
        <label for="email">Enter email</label>
        <input type="email" name="email" v-model="email" required autocomplete="email">
      </section>
      
      <section v-if="showLogin">
        <div class="password">
          <label for="password">Enter password</label>
          <span @click="toggleDisplayPassword()" class="action show-password" ref="showPassword">show password</span>
        </div>        
        <input id="current-password" type="password" name="password" v-model="password" required autocomplete="current-password" ref="passwordElement">
        <div>
          <span class="action forgot-password" @click="toggleLoginOrResend(false)">Forgot password?</span>
        </div>
      </section>      

      <div class="login">
        <button v-if="showLogin">Login</button>
        <button v-else @click="handlePasswordReset()">Send</button>
        <div v-if="error" class="error">{{ error }}</div>
        <div v-if="message">{{ message }}</div>
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
    const showLogin = ref(true)
    const message = ref(null)

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

    const toggleLoginOrResend = (displayLogin) => {
      showLogin.value = displayLogin
    }

    const handlePasswordReset = () => {
      sendPasswordResetEmail(auth, user.value.email).then(() => {
        console.log('Sending password reset email.')
        message.value = 'Password reset email has been sent.'
      }).catch((err) => {
        error.value = err.message
      })
    }

    return { handleLogin, toggleDisplayPassword, toggleLoginOrResend, handlePasswordReset, email, password, error, passwordElement, showPassword, showLogin, message }
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
    transition: all ease 0.1s;
    text-align: end;
  }
  .password {
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding-top: 20px;
  }
  .forgot-password {    
    color: rgb(160, 160, 160);
    transition: all ease 0.1s;
    padding-bottom: 15px;
  }
  .action {
    color: rgb(160, 160, 160);
    transition: all ease 0.1s;
  }
  .action:hover {
    cursor: pointer;
    color: rgb(179, 179, 179);
    transition: all ease 0.1s;
  }
  .close {
    display: flex;
    justify-content: end;
  }
</style>