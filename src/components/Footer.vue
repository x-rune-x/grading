<template>
  <div class="footer">
    <div class="links">
      <router-link :to="{ name: 'Home' }" class="footerComponent">
        <span class="footer-link">Home</span>
      </router-link>
      <router-link :to="{ name: 'About' }">
        <span class="footer-link">About</span>
      </router-link>      
    </div>
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

<style scoped>
  .footer {
    border-top: solid 2px var(--secondary);
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  img {
    max-height: 40px;
  }
  .logo {
    display: flex;
    padding-top: 10px;
    align-items: center;
  }
  .footerComponent {
    padding: 10px;
  }
  p {
    font-size: small;
  }
  .links {
    padding: 10px;
  }
  .footer-link {
    font-size: large;
  }
</style>