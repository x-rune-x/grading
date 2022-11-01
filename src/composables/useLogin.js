import { ref } from 'vue'

import { auth } from '../firebase/config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const error = ref(null)
const isPending = ref(false)

const login = async (email, password) => {
  error.value = null
  isPending.value = true

  try {
    const res = await signInWithEmailAndPassword(auth, email, password)

    if (!res) {
      throw new Error('Could not login.')
    }

    if (res.user.emailVerified == false) {
      signOut(auth)
      error.value = "Please verify your email address."
    }
  } catch (err) {
    error.value = err.message
    isPending = false
  }
}

const useLogin = () => {
  return { error, isPending, login }
}

export default (useLogin)