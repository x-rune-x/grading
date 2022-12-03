<template>
  <div class="anchor">
    <h3>Anchor {{ anchor }}</h3>
    <ClimbList :climbs="sortedClimbs" :showCurrent="true" :showAnchor="false" :showDate="true" />
  </div>
</template>

<script>
import { computed, ref } from 'vue';
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

    const getClimbs = async () => {
      await getDocs(anchorQuery)
          .then(snap => {
          let climbs = [];
          snap.docs.forEach(climb => {
              climbs.push({ ...climb.data(), id: climb.id });
          });
          anchorClimbs.value = climbs
      });
    }

    getClimbs()

    const sortedClimbs = computed(() => {
      const currentClimbs = anchorClimbs.value.filter((climb) => {
        return climb.current == true
      })
      currentClimbs.sort((a, b) => (a.grade < b.grade) ? 1 : -1)

      const nonCurrentClimbs = anchorClimbs.value.filter((climb) => {
        return climb.current == false
      })
      nonCurrentClimbs.sort((a, b) => (a.grade < b.grade) ? 1 : (a.grade === b.grade) ? ((a.dateAdded < b.dateAdded) ? 1 : -1) : -1 )

      return currentClimbs.concat(nonCurrentClimbs)
    })

    return { sortedClimbs };
  }
}
</script>

<style>

</style>