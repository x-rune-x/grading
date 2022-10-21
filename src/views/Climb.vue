<template>
  <h3>climb</h3>
  <div>
    <label for="station">Station</label>
    <span name="station">{{climb.station}}</span>

    <label for="colour">Colour</label>
    <span name="colour">{{climb.colour}}</span>

    <label for="grade">Grade</label>
    <span name="grade">{{climb.grade}}</span>

    <label for="current">Current</label>
    <input ref="currentElement" type="checkbox" name="current" class="toggleCurrent" @click="handleCurrentClick()">

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
import { ref, watch, watchEffect } from 'vue'
import { db } from '../firebase/config';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from '@firebase/firestore';

export default {
  name: 'Climb',
  props: ['id'],
  setup(props) { 
    const climb = ref({}) 
    const currentElement = ref(null)  

    const unsub = onSnapshot(doc(db, 'climbs', props.id), (climbSnap) => {
      climb.value = climbSnap.data()
      console.log(climb.value)      
    })

    watchEffect((onInvalidate) => {
      onInvalidate(() => unsub())

      if (climb.value.current == true) {
        currentElement.value.checked = 'true'
      } 
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

    const updateCurrentStatus = async (currentStatus) => {
      const climbRef = doc(db, 'climbs', props.id) 
      console.log('Changing status')     

      await updateDoc(climbRef, {
        current: currentStatus
      })
    }

    const handleCurrentClick = () => {
      const currentStatus = currentElement.value.checked
      updateCurrentStatus(currentStatus)
    }

    return { climb, submitGrade, currentElement, handleCurrentClick }
  }
}
</script>

<style>

</style>