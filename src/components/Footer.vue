<template>
  <div class="footer">
    <router-link :to="{ name: 'Home' }">
      <span>Home</span>
    </router-link>
    <div class="logo">
      <img src="@/assets/anzus1.png" alt="rune logo">
      <p ref="para">{{ para }}</p>
    </div>
  </div>
</template>

<script>
export default {
 setup() {
  const date = new Date()
  const year = date.getFullYear()
  const para = `Rune ${year}`

  return { para }
 }
}
</script>

<style>
  .footer {
    border-top: solid 1px black;
  }
  img {
    max-height: 40px;   
    display: inline-block; 
  }
</style>