<template> 
<div class="container">
  <div class="verify">    
    <h3>Verification email sent</h3>
    <p>Please check you junk folder as it is most likely there.</p>
    <router-link :to="{ name: 'Home' }">
      <span>close</span>
    </router-link>    
  </div>
</div>  
</template>

<script>
export default {
  
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
  .verify {
    width: 40vw;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px 30px;
    border-radius: 8px;
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    border: 1px solid  var(--secondary);
    background: white;
    display: flex;
    flex-direction: column;    
    align-items: center;
  }  
  span {    
    color: rgb(160, 160, 160);
    transition: all ease 0.1s;
  }
  span:hover {
    cursor: pointer;
    color: rgb(179, 179, 179);
    transition: all ease 0.1s;
  }
  p {
    text-align: center;
    padding-bottom: 15px;
  }
</style>