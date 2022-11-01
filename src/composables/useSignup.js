import { ref } from 'vue'

import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, displayName) => {
  error.value = null
  isPending.value = true

  try {
    await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user
      updateProfile(user, {displayName: displayName})
      sendEmailVerification(user)
    }).catch((updateProfileError) => {
      console.log(updateProfileError)
      throw new Error('Could not complete signup')
    })
  } catch (err) {
    error.value = err.message
    isPending = false
  }
}

const useSignup = () => {
  return { error, isPending, signup }
}

export default (useSignup)