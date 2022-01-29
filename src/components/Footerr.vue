<template>
  <div>
    <span id="cena">Cena </span>
    <span ref="cena">{{ this.$store.state.cena }}€</span>
    <span v-show="zlava">{{ calc() }}€</span>
    <button @click="handle_zlava">Zľava</button>
    <input id="zlavicka-inp" @change="minmax" v-model="zlavicka" type="number">%
  </div>
</template>

<script>
export default {
  data: () => ({
    zlava: false,
    zlavicka: null
  }),
  methods: {
    minmax() {
      if (this.zlavicka > 100)
        this.zlavicka = 100
      else if (this.zlavicka < 0)
        this.zlavicka = 0
    },
    handle_zlava() {
      if (this.$store.state.cena == 0) return
      if (!this.zlava) 
        this.$refs.cena.style.textDecoration = 'line-through'
      else 
        this.$refs.cena.style.textDecoration = 'none'
      this.zlava = !this.zlava
    },
    calc() {
      if (this.zlavicka > 100) return 0
      else if (this.zlavicka < 0) return this.$store.state.cena
      return this.zlava ? Math.round(this.$store.state.cena * (1 - this.zlavicka / 100) * 100) / 100 : this.$store.state.cena
    }
  }
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
    gap: 1rem;
    font-size: 2rem;
  }

  button {
    width: 5rem;
    font-size: 1rem;
    font-weight: bold;
  }

  #zlavicka-inp {
    outline: none;
    border: #4ae14ac9 solid 2px;
    width: 3.5rem;
    margin-right: -.8rem;
  }

  @media screen and (max-width: 670px) {
    #cena {
      display: none;
    }
    div {
      font-size: 1.5rem;
    }
  }  

</style>