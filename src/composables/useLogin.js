import { ref } from 'vue'

import { auth } from '../firebase/config'
import { signInWithEmailAndPassword } from 'firebase/auth'

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
  } catch (err) {
    error.value = err.message
    isPending = false
  }
}

const useLogin = () => {
  return { error, isPending, login }
}

export default (useLogin)