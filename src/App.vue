<template>
  <NavBar/>
  <div class="content">
    <div class="main">
      <router-view/>
    </div>    
    <FooterBar/>
  </div>  
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/Footer.vue'

  export default {
    components: { NavBar, FooterBar },
    name: 'UC Blackburn'
  }
</script>

<style>
  .content {
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 20px;
  }
  .main {
    height: 90vh;
  }
</style>
