<template>
  <div class="home">  
    <h2>Current climbs</h2>  
    <ClimbList :climbs="currentClimbs" :showCurrent="false" :showAnchor="true" :showDate="false" />     
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, getDocs, where, query } from '@firebase/firestore';
import ClimbList from '../components/ClimbList.vue';

export default {
    name: "Home",
    components: { ClimbList },
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
              return a.anchor - b.anchor
             });
        });
        return { currentClimbs };
    }    
}
</script>

<style scoped>
  .home {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    padding: 10px;
  }
</style>