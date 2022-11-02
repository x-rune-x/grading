<template>
  <div class="footer">
    <div class="content">
      <router-link :to="{ name: 'Home' }">
        <span>Home</span>
      </router-link>
      <router-link :to="{ name: 'About' }">
        <span>About</span>
      </router-link>
      <div class="logo">
        <img src="@/assets/anzus1.png" alt="rune logo">
        <p ref="para">{{ para }}</p>
      </div>
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
    width: 100vw;
  }
  img {
    max-height: 40px;   
    display: inline-block; 
  }
</style>