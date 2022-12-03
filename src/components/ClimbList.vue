<template>
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
        <tr v-for="climb in climbs" :key="climb.id">
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
import { useRouter } from 'vue-router'

export default {
  props: ['climbs', 'showCurrent', 'showAnchor', 'showDate'],
  name: 'Climb List',
  setup() {
    const router = useRouter()

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

    return { goToClimb, goToAnchor, formatDate }
  }
}
</script>

<style scoped>
  .list {
    display: flex;
    justify-content: center;
  }
  .content-table {
    border-collapse: collapse;
    min-width: 300x;
    text-align: center;
  }
  .individual-climb:hover, .anchor:hover {
    cursor: pointer;
  }
  td {
    padding: 5px 0;
    font-size: large;
  }
  th {
    font-size: large;
    width: 100px;
  }
  tr {
    border-bottom: solid 1px rgba(160, 160, 160, 0.333);
  }
  tr:hover {
    border-bottom: solid 2px rgb(71, 68, 255);
  }
  th {
    padding: 5px 0;
  }
  thead {
    border-bottom: solid 2px rgba(160, 160, 160, 0.333);
  }
</style>