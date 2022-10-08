<template>
  <div class="home">
    <p>Homepage</p>
    <ul>
      <li v-for="climb in currentClimbs" :key="climb.id">
        <div>{{ climb.station }}</div>
        <div>{{ climb.colour }}</div>
        <div>{{ climb.grade }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, getDocs, where, query } from '@firebase/firestore';

export default {
  name: 'Home',
  setup() {
    const currentClimbs = ref([])

    const currentQuery = query(collection(db, 'climbs'), where('current', '==', true))
    getDocs(currentQuery)
      .then(snap => {
        let climbs = []
        snap.docs.forEach(climb => {
          climbs.push({ ...climb.data(), id: climb.id })
        })
        currentClimbs.value = climbs
      })

      return { currentClimbs }
  }
}
</script>
