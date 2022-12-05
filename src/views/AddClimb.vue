<template>  
  <form @submit.prevent="handleSubmit">
    <div class="close">
      <span @click="navigateBack()">close</span>
    </div>  

    <h3>Add Climb</h3>
    <label for="anchor">Anchor</label>
    <input type="text" name="anchor" v-model="anchor">

    <label for="colour">Colour</label>
    <input type="text" name="colour" v-model="colour">

    <label for="grade">Grade - If climb grade is ? enter 0</label>
    <input type="number" name="grade" v-model="grade">

    <div class="submitClimb">
      <button>Add climb</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div>    
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { db } from '../firebase/config'
import { addDoc, collection, serverTimestamp } from '@firebase/firestore'
import getUser from '../composables/getUser';
import { useRouter } from 'vue-router';

export default {
  name: 'AddClimb',
  setup() {
    const anchor = ref('')
    const colour = ref('')
    const grade = ref('')
    const error = ref(null)
    
    const { user } = getUser()
    const router = useRouter()

    window.scrollTo({ top: 0, behavior: 'smooth' })

    const handleSubmit = async () => {
      if (user.value) {
        const climbsRef = collection(db, 'climbs')
        const adjustedGrade = grade.value == 0 ? "?" : parseInt(grade.value)

        await addDoc(climbsRef, {
          anchor: parseInt(anchor.value),
          grade: adjustedGrade,
          colour: colour.value.toLowerCase(),
          current: true,        
          sGrades: [{ "number": 1, "sGrade": adjustedGrade, "user": "setter", "userId": 0}],
          dateAdded: serverTimestamp(),
          userId: user.value.uid
        })

        anchor.value = ''
        colour.value = ''
        grade.value = ''
      } 
      else {
        error.value = "Please login to add a new climb."
      }     
    }

    const navigateBack = () => {
      router.go(-1)
    }

    return { handleSubmit, anchor, colour, grade, error, navigateBack }
  }
}
</script>

<style scoped>
  p {
    padding: 10px 0;
  }
  h3 {
    margin: 0 auto 15px auto;
    width: 50%;
    text-align: center;
  }
  .submitClimb {
    display: flex;
    flex-direction: column;
    align-items: center;
  }  
  .close {
    display: flex;
    justify-content: end;
  }
  span {    
    color: rgb(160, 160, 160);
    transition: all ease 0.1s;
  }
  span:hover {
    cursor: pointer;
    color: rgb(179, 179, 179);
    transition: all ease 0.1s;
  }
</style>