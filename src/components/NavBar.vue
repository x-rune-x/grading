<template>
  <div class="header">
    <nav>
      <router-link :to="{ name: 'Home' }">
        <h1 class="title">Urban Climb lead grades</h1>
      </router-link>

      <router-link :to="{ name: 'Signup' }">
        <span>Signup</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .header {
    border-bottom: solid 1px black;
    margin-bottom: 10px;
  }
</style>