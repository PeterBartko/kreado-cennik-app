<template>
  <div>
    <h3>Cena {{ zlava ? this.$store.state.cena * 0.90 : this.$store.state.cena }}€</h3>
    <button @click="zlava = !zlava">Zlava 10%</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    zlava: false
  })
}
</script>

<style scoped>
  div {
    height: 4rem;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    color: #999;
    font-weight: bold;
    font-size: 1.8rem;
    gap: 1rem;
  }

  button {
    width: 6rem;
    font-size: 1rem;
    font-weight: bold;
  }

</style>