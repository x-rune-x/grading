<template>
  <h3>Add Climb</h3>
  <form @submit.prevent="handleSubmit">
    <label for="station">Station</label>
    <input type="text" name="station" v-model="station">

    <label for="station">Colour</label>
    <input type="text" name="colour" v-model="colour">

    <label for="station">Grade</label>
    <input type="text" name="grade" v-model="grade">

    <button>Add climb</button>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import { db } from '../firebase/config'
import { addDoc, collection } from '@firebase/firestore'

export default {
  name: 'AddClimb',
  setup() {
    const station = ref('')
    const colour = ref('')
    const grade = ref('')

    const handleSubmit = async () => {
      console.log(station.value, colour.value, grade.value)

      const climbsRef = collection(db, 'climbs')
      await addDoc(climbsRef, {
        station: station.value,
        grade: parseInt(grade.value),
        colour: colour.value.toLowerCase(),
        current: true,        
        sGrades: []
      })

      station.value = ''
      colour.value = ''
      grade.value = ''
    }

    return { handleSubmit, station, colour, grade }
  }
}
</script>

<style>

</style>