<template>
  <div class="home">
    <h2>Climb list</h2>
    <div>
      <ul class="body">
        <li v-for="climb in currentClimbs" :key="climb.id">
          <div class="climb">
            <span>
              {{ climb.station }}
            </span>
            <span class="climbInfo">
              <router-link :to="{ name: 'Climb', params: { id: climb.id } }">          
                <span>{{ climb.colour }}</span>
                <span>{{ climb.grade }}</span> 
              </router-link>  
            </span> 
          </div>                            
        </li>
      </ul>
    </div>    
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

        window.scrollTo({ top: 0, behavior: 'smooth' })

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

<style scoped>
  li {
    list-style: none;
    padding: 10px;
    border: solid 1px var(--secondary);
    margin: 10px 0;
    max-width: 30%;
  }
  .body {
    
  }
  span {
    padding: 0 10px;
  }
  .home {
    display: flex;
    justify-content: center;
  }
</style>