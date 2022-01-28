<template>
  <div>
    <p>KREADO</p>
    <div class="link-w">
      <router-link to="/">Grafika</router-link>
      <router-link to="web">Web</router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  div {
    display: flex;
    padding: .8rem 5rem;
    justify-content: space-between;
    align-items: center;
    color: #222;
  }

  p {
    font-size: 2rem;
    font-weight: bold;
  }
  .link-w  a{
    color: #0D808C;
    font-weight: bold;
    font-size: 1.5rem;
    margin-left: 2rem;
    text-decoration: none;
  }

</style>