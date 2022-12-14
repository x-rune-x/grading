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
    
    <div class="section climb-actions" v-if="climb.userId === currentUId">
      <router-link :to="{ name: 'EditClimb', params: { id: id } }">
        <button class="actions">Edit</button>
      </router-link>    
      <button class="actions" @click="showPopup()">Delete</button>
    </div>

    <div class="confirmation-container" id="confirmation-popup" ref="confirmationPopup">
      <p class="confirmation-text">Are you sure you want to delete this climb?</p>
      <div class="confirmation-buttons">
        <button @click="closeConfirmation()">Cancel</button>
        <button @click="deleteClimb()">Delete</button>
      </div>
    </div> 

    <div class="section my-suggestion" v-if="currentSuggestion">
      <label for="my-suggestion">My suggestion</label>
      <div class="suggestion">
        <span class="suggestion-grade" name="my-suggestion">{{ currentSuggestion.sGrade }}</span>
        <span class="delete" @click="deleteSGrade(currentSuggestion.number)">Delete</span>        
      </div>      
    </div>
    
    <div class="grade-suggestions">
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
        </tr>
      </table>
    </div>  
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { db } from '../firebase/config';
import { doc, onSnapshot, updateDoc, deleteDoc } from '@firebase/firestore';
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
    const currentSuggestion = ref(null)

    const router = useRouter()
    const confirmationPopup = ref(null)
    
    window.scrollTo({ top: 0, behavior: 'smooth' })

    onSnapshot(doc(db, 'climbs', props.id), (climbSnap) => {
      climb.value = climbSnap.data()

      // Get the average
      let grades = climb.value.sGrades.map(grade => grade.sGrade)
      grades = grades.filter(grade => grade != '?') // ? won't work for average.
     
      meanGrade.value = (grades.reduce((prev, next) => prev + next, 0) / grades.length).toFixed(2)
      mostCommonGrade.value = findMode(grades)

      const userSuggestion = climb.value.sGrades.filter((sGrade) => {
        return sGrade.userId == currentUId
      })

      currentSuggestion.value = userSuggestion[0] // Should only allow one suggestion so array should not have length greater than 1.
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
        const suggestedGrade = parseInt(document.getElementById('gradeInput').value)

        if (suggestedGrade > 0) {
          const updatedSGrades = climb.value.sGrades.filter((sGrade) => {
            return sGrade.userId != currentUId
          })

          updatedSGrades.push({
            number: number,
            sGrade: suggestedGrade,
            user: user.value.displayName,
            userId: user.value.uid
          })

          await updateDoc(climbRef, { sGrades: updatedSGrades })
        }      
        else {
          error.value = "Please suggest a grade above 0."
        }
      }
      else {
        error.value = "Please login to submit your grade for the climb."
      }
      
    }

    const showPopup = () => {
      confirmationPopup.value.style.visibility = 'visible'
      confirmationPopup.value.style.display = 'block'
    }

    const closeConfirmation = () => {
      confirmationPopup.value.style.visibility = 'hidden'
      confirmationPopup.value.style.display = 'none'
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

      // arrayRemove could work for this too.
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

    return { climb, submitGrade, showPopup, closeConfirmation, currentElement, handleCurrentClick, goToAnchor, meanGrade, mostCommonGrade, currentSuggestion, deleteClimb, currentUId, error, deleteSGrade, confirmationPopup }
  }
}
</script>

<style scoped>
  div {
    font-size: large;
  }
  .confirmation-text {
    padding-bottom: 15px;
  }
  .confirmation-buttons {
    display: flex;
    justify-content: space-evenly;
  }
  .anchor:hover {
    cursor: pointer;
  }
  .climb-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .grade-suggestions {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .info {
    display: flex;
  }
  .section {
    padding: 15px 0;
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
  .suggestion {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
  /* .suggestion-grade {
    padding: 0 10px;
  } */
  .delete {
    transition: all ease 0.1s;
  }
  .delete:hover {
    cursor: pointer;
    transition: all ease 0.1s;
    color: rgb(160, 160, 160);
  }
  .climb-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
  button.actions {
    width: 70px;
    height: 40px;
    padding: 0;
    margin: 0 10px;
  }
  .my-suggestion {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .confirmation-container {
    visibility: hidden;
    display: none;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px 30px;
    border-radius: 8px;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    border: 1px solid  var(--secondary);
    background: white;
    transition:opacity 0.5s linear
  }
</style>