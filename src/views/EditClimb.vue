<template>  
  <form @submit.prevent="editClimb">
    <h3>Edit Climb</h3>
    <label for="anchor">Anchor</label>
    <input type="text" name="anchor" v-model="anchor">

    <label for="colour">Colour</label>
    <input type="text" name="colour" v-model="colour">

    <label for="grade">Grade - If climb grade is ? enter 0</label>
    <input type="number" name="grade" v-model="grade">

    <div class="submitClimb">
      <button>Edit climb</button>      
    </div>
    
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { db } from '../firebase/config'
import { doc, getDoc, updateDoc } from '@firebase/firestore'
import { useRouter } from 'vue-router'

export default {
  name: 'EditClimb',
  props: ['id'],
  setup(props) {
    const anchor = ref('')
    const colour = ref('')
    const grade = ref('') 

    const router = useRouter()

    window.scrollTo({ top: 0, behavior: 'smooth' })

    const loadClimb = async () => {      
      const climbRef = doc(db, 'climbs', props.id)
      const climbSnap = await getDoc(climbRef).catch((err) => {
        console.log(err.message)
      })      

      if (climbSnap.exists()) {
        anchor.value = climbSnap.data().anchor
        colour.value = climbSnap.data().colour
        grade.value = climbSnap.data().grade
      }
      else {
        console.log("Climb does not exist.")
      }
    }

    loadClimb()

    const editClimb = async () => {      

      const climbsRef = doc(db, 'climbs', props.id)
      const adjustedGrade = grade.value == 0 ? "?" : parseInt(grade.value)

      await updateDoc(climbsRef, {
        anchor: parseInt(anchor.value),
        grade: adjustedGrade,
        colour: colour.value.toLowerCase()
      }).catch((err) => {
        console.log(err.message)
      })

      router.push({ name: 'Climb', params: { id: props.id } })
    }

    return { editClimb, anchor, colour, grade }
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
</style>