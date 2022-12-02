<template>  
  <div class="climb-content">
    <div class="info section">
      <span class="category">
        <label for="anchor">Anchor</label>
        <div class="anchor" @click="goToAnchor(climb.anchor)" name="anchor">{{ climb.anchor }}</div>
      </span>    

      <span class="category">
        <label for="colour">Colour</label>
        <div name="colour">{{ climb.colour }}</div>
      </span>    
  
      <span class="category">
        <label for="grade">Grade</label>
        <div name="grade">{{ climb.grade }}</div>
      </span>    

      <span class="category">
        <label for="current">Current</label>
        <input ref="currentElement" type="checkbox" name="current" class="toggleCurrent" @click="handleCurrentClick()">
      </span>  
    </div>

    <div class="statistics section">
      <span class="category">
        <label for="meanGrade">Average grade</label>
        <div name="meanGrade">{{ meanGrade }}</div>
      </span>
      <span class="category">
        <label for="mostCommonGrade">Most common grade</label>
        <div name="mostCommonGrade">{{ mostCommonGrade }}</div>
      </span>
    </div>  
    
    <div class="section" v-if="climb.userId == currentUId">
      <router-link :to="{ name: 'EditClimb', params: { id: id } }">
        <button>Edit</button>
      </router-link>    
      <button @click="deleteClimb()">Delete</button>
    </div>
    
    <div class="suggest section">
      <label for="sGrade">Suggest grade</label>
      <input type="number" name="sGrade" id="gradeInput" :value="climb.grade">
      <button @click="submitGrade()">submit</button>
      <p v-if="error" class="error">{{ error }}</p>
    </div> 

    <label for="suggestions">Suggested grades</label>
    <table name="suggestions">
      <tr v-for="grade in climb.sGrades" :key="grade.number">
        <td class="suggestionContent">{{grade.sGrade}}</td>
        <td class="suggestionContent">{{grade.user}}</td>
        <td @click="deleteSGrade(grade.number)" class="delete suggestionContent" v-if="grade.userId == currentUId">Delete</td>
      </tr>
    </table>         
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { db } from '../firebase/config';
import { arrayUnion, doc, onSnapshot, updateDoc, deleteDoc } from '@firebase/firestore';
import getUser from '../composables/getUser';
import { useRouter } from 'vue-router';

export default {
  name: 'Climb',
  props: ['id'],
  setup(props) { 
    let climb = ref({}) 
    const currentElement = ref(null) 
    const { user } = getUser() 
    const meanGrade = ref(null)
    const mostCommonGrade = ref(null)
    const currentUId = user.value ? user.value.uid : null
    const error = ref(null)

    const router = useRouter()
    
    window.scrollTo({ top: 0, behavior: 'smooth' })

    onSnapshot(doc(db, 'climbs', props.id), (climbSnap) => {
      climb.value = climbSnap.data()

      let grades = climb.value.sGrades.map(grade => grade.sGrade)
      grades = grades.filter(grade => grade != '?')
     
      meanGrade.value = (grades.reduce((prev, next) => prev + next, 0) / grades.length).toFixed(2)
      mostCommonGrade.value = findMode(grades)
    })

    const findMode = (array) => {
      const counts = {}

      array.forEach(element => {
        if (!counts[element]) {
          counts[element] = 1          
        }
        else {
          counts[element] += 1
        }      
      })

      let highestFoundValue = 0
      let highestFoundKey = 0

      for (var key in counts) {
        if (counts[key] > highestFoundValue) {
          highestFoundValue = counts[key]
          highestFoundKey = key
        }
      }

      return parseInt(highestFoundKey)
    }

    watchEffect(() => { 
      if (climb.value.current == true) {
        currentElement.value.checked = 'true'
      } 
    })   

    const submitGrade = async () => {
      if (user.value) {
        const climbRef = doc(db, 'climbs', props.id)
        const number = climb.value.sGrades.length + 1
        
        const gradeInfo = {
          sGrades: arrayUnion({
            number: number,
            sGrade: parseInt(document.getElementById('gradeInput').value),
            user: user.value.displayName,
            userId: user.value.uid
          })
        }

        await updateDoc(climbRef, gradeInfo)
      }
      else {
        error.value = "Please login to submit your grade for the climb."
      }
      
    }

    const deleteClimb = async () => {
      await deleteDoc(doc(db, 'climbs', props.id))

      router.push('/')
    }

    const deleteSGrade = async (numbertoDelete) => {
      const climbRef = doc(db, 'climbs', props.id)

      const sGrades = climb.value.sGrades.filter((grade) => {
        return grade.number != numbertoDelete
      })

      await updateDoc(climbRef, {
        sGrades: sGrades
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

    const goToAnchor = (anchor) => {
      router.push({ name: 'Anchor', params: { anchor: anchor } })
    }    

    return { climb, submitGrade, currentElement, handleCurrentClick, goToAnchor, meanGrade, mostCommonGrade, deleteClimb, currentUId, error, deleteSGrade }
  }
}
</script>

<style scoped>
  .anchor:hover {
    cursor: pointer;
  }
  .climb-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info {
    display: flex;
  }
  .section {
    padding: 15px;
  }
  .suggest {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .suggestionContent {
    padding: 0 5px;
  }
  input {
    margin: 0 auto 10px;
  }
  label {
    padding: 10px;
    font-weight: bold;
    text-align: center;
  }
  .category {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .toggleCurrent {
    margin: 0 0;
  }
  .statistics {
    display: flex;
  }
  table {
    text-align: center;
  }
  .delete:hover {
    cursor: pointer;
  }
</style>