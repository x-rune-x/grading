<template>  
  <form @submit.prevent="editClimb">
    <h3>Edit Climb</h3>
    <label for="anchor">Anchor</label>
    <input type="text" name="anchor" v-model="anchor">

    <label for="colour">Colour</label>
    <input type="text" name="colour" v-model="colour">

    <label for="grade">Grade</label>
    <input type="number" name="grade" v-model="grade">

    <p>If climb grade is ? put in 0</p>

    <button>Edit climb</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { db } from '../firebase/config'
import { doc, collection, getDoc, updateDoc } from '@firebase/firestore'
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

<style>

</style>