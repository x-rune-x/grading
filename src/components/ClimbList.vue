<template>
  <div>
    <div class="filter-table">
      <div class="filters">
        <span>
          <label for="anchor">Anchor</label>
          <input v-model="filterAnchor" name="anchor" type="number">
        </span>
        
        <span>
          <label for="colour">Colour</label>
          <input v-model="filterColour" name="colour" type="text">
        </span>
        
        <span>
          <label for="grade">Grade</label>
          <input v-model="filterGrade" name="grade" type="number">
        </span>        
      </div>
      <div>
        <button @click="resetClimbs()">Reset</button>
        <button @click="filterClimbs()">Filter</button>
      </div>
    </div>
  </div>
  <div class="list">    
    <table class="content-table">
      <thead>
        <th v-if="showAnchor">Anchor</th>
        <th>Colour</th>
        <th>Grade</th>
        <th v-if="showCurrent">Current</th>
        <th v-if="showDate">Date added</th>
      </thead>
      <tbody>
        <tr v-for="climb in climbsToShow" :key="climb.id">
          <td class="anchor" @click="goToAnchor(climb.anchor)" v-if="showAnchor">{{ climb.anchor }}</td>
          <td class="individual-climb" @click="goToClimb(climb.id)">{{ climb.colour }}</td>
          <td class="individual-climb" @click="goToClimb(climb.id)">{{ climb.grade }}</td>
          <td class="individual-climb" @click="goToClimb(climb.id)" v-if="showCurrent">{{ climb.current }}</td>
          <td class="individual-climb" @click="goToClimb(climb.id)" v-if="showDate">{{ formatDate(climb.dateAdded) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: ['climbs', 'showCurrent', 'showAnchor', 'showDate'],
  name: 'Climb List',
  setup(props) {
    const router = useRouter()
    const climbsToShow = ref([])

    // Watch for changes in props.climbs and update climbsToShow accordingly
    watch(() => props.climbs, (newClimbs) => {
      climbsToShow.value = newClimbs
    })

    console.log(props.climbs)

    const filterAnchor = ref(null)
    const filterColour = ref(null)
    const filterGrade = ref(null)

    const filterClimbs = () => { // Apparently cannot access arguments object for arrow functions.
      console.log(filterAnchor.value, filterColour.value, filterGrade.value)

      let filteredClimbs = [...props.climbs]

      if (filterAnchor.value) {
        filteredClimbs = filteredClimbs.filter((climb) => {
          console.log(typeof climb.anchor, typeof filterAnchor.value)
          return climb.anchor == filterAnchor.value          
        })
      }    
      if (filterColour.value) {
        filteredClimbs = filteredClimbs.filter((climb) => {
          return climb.colour == filterColour.value          
        })
      } 
      if (filterGrade.value) {
        filteredClimbs = filteredClimbs.filter((climb) => {
          return climb.grade == filterGrade.value         
        })
      } 

      climbsToShow.value = filteredClimbs
      console.log(climbsToShow.value)
    }

    const resetClimbs = () => {
      climbsToShow.value = props.climbs

      filterAnchor.value = null
      filterColour.value = null
      filterGrade.value = null
    }

    const goToClimb = (climbId) => {
      router.push({ name: 'Climb', params: { id: climbId } })
    }

    const goToAnchor = (anchor) => {
      router.push({ name: 'Anchor', params: { anchor: anchor } })
    }

    const formatDate = (date) => {
      let dateObj = date.toDate()
      
      return `${dateObj.getDate()}/${dateObj.getMonth()}/${dateObj.getFullYear()}`
    }

    return { goToClimb, goToAnchor, formatDate, resetClimbs, filterClimbs, climbsToShow, filterAnchor, filterColour, filterGrade }
  }
}
</script>

<style scoped>
  .list {
    display: flex;
    justify-content: center;
  }
  .filters {
    display: flex;
  }
  .content-table {
    border-collapse: collapse;
    min-width: 300x;
    text-align: center;
  }
  .individual-climb:hover {
    cursor: pointer;
  }
  .anchor {
    transition: all ease 0.1s;
  }
  .anchor:hover {
    cursor: pointer;
    border-bottom: solid 2px rgb(1, 204, 255);
    transition: all ease 0.1s;
  }
  td {
    padding: 10px 0;
    font-size: larger;
  }
  th {
    font-size: large;
    width: 100px;
  }
  tr {
    border-bottom: solid 1px rgba(160, 160, 160, 0.333);
    transition: all ease 0.1s;
  }
  tr:hover {
    border-bottom: solid 2px rgb(71, 68, 255);
    transition: all ease 0.1s;
  }
  th {
    padding: 5px 0;
  }
  thead {
    border-bottom: solid 2px rgba(160, 160, 160, 0.333);
  }
</style>