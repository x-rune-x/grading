<template>
  <NavBar/>
  <div class="content">
    <div class="main">
      <router-view/>
    </div>       
  </div> 
  <FooterBar/> 
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
    height: 80vh;
    padding: 0 20px;
  }
</style>
