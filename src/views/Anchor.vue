<template>
  <div class="anchor">
    <ClimbList :climbs="anchorClimbs" :showCurrent="true" :showAnchor="false" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { db } from '../firebase/config';
import { collection, getDocs, where, query } from '@firebase/firestore';
import ClimbList from '../components/ClimbList.vue';

export default {
  name: "Anchor",
  props: ['anchor'],
  components: { ClimbList },
  setup(props) {
    const anchorClimbs = ref([]);
    const anchorQuery = query(collection(db, "climbs"), where("anchor", "==", parseInt(props.anchor)));

    window.scrollTo({ top: 0, behavior: 'smooth' })

    getDocs(anchorQuery)
        .then(snap => {
        let climbs = [];
        snap.docs.forEach(climb => {
            climbs.push({ ...climb.data(), id: climb.id });
        });
        anchorClimbs.value = climbs
    });

    return { anchorClimbs, anchorClimbs };
  }
}
</script>

<style>

</style>