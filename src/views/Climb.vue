<template>
  <h3>climb</h3>
  <div>
    <label for="station">Station</label>
    <span name="station">{{climb.station}}</span>

    <label for="colour">Colour</label>
    <span name="colour">{{climb.colour}}</span>

    <label for="grade">Grade</label>
    <span name="grade">{{climb.grade}}</span>

    <label for="grade">Current</label>
    <span name="grade">{{climb.current}}</span>

    <ul>
      <li v-for="grade in climb.sGrades" :key="grade.number">
        <span>{{grade.sGrade}}</span>
        <span>{{grade.user}}</span>
      </li>
    </ul>
    <div>
      <label for="sGrade">Suggest grade</label>
      <input type="number" name="sGrade" id="gradeInput" :value="climb.grade">
      <button @click="submitGrade()">submit</button>
    </div>    
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { db } from '../firebase/config';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from '@firebase/firestore';


export default {
  name: 'Climb',
  props: ['id'],
  setup(props) { 
    const climb = ref({})   

    const unsub = onSnapshot(doc(db, 'climbs', props.id), (climbSnap) => {
      climb.value = climbSnap.data()
      console.log(climb.value)
    })

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub())
    })

    const submitGrade = async () => {
      const climbRef = doc(db, 'climbs', props.id)
      const number = climb.value.sGrades.length + 1

      await updateDoc(climbRef, {
        sGrades: arrayUnion({
          number: number,
          sGrade: parseInt(document.getElementById('gradeInput').value),
          user: 'Evan'
        })
      })
    }

    return { climb, submitGrade }
  }
}
</script>

<style>

</style>