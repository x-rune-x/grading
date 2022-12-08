<template>
  <div class="about">
    <h2>About</h2>
    <p>This site is for offering your opinion of the grade on the grade of lead climbs set at Urban Climb Blackburn.</p>
    <p>No disrespect intended to the provider of the official grade.</p>
    <br>
    <p>If you have any problems or suggestions please send an email to jamesbedford@protonmail.com</p>
    <p>Planned improvements include filtering for the climbs table, google federated sign up and login, and a comments section for each climb.</p>
  </div> 
</template>

<script>
export default {
  setup() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

}
</script>

<style scoped>
  p {
    text-align: center;
  }
  .about {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    text-align: center;
    padding-bottom: 15px;
  }
</style>