<template>
  <div class="home">
    <p>Homepage</p>
    <ul>
      <li v-for="climb in currentClimbs" :key="climb.id">
        <div>{{ climb.station }}</div>
        <router-link :to="{ name: 'Climb', params: { id: climb.id } }">          
          <div>{{ climb.colour }}</div>
          <div>{{ climb.grade }}</div> 
        </router-link>               
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, getDocs, where, query } from '@firebase/firestore';

export default {
    name: "Home",
    setup() {
        const currentClimbs = ref([]);
        const currentQuery = query(collection(db, "climbs"), where("current", "==", true));
        getDocs(currentQuery)
            .then(snap => {
            let climbs = [];
            snap.docs.forEach(climb => {
                climbs.push({ ...climb.data(), id: climb.id });
            });
            currentClimbs.value = climbs.sort(function(a, b) {
              return a.station - b.station
             });
        });
        return { currentClimbs };
    }    
}
</script>
