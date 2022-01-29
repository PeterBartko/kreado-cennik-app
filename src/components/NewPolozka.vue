<template>
  <div class="polozka bg-2">
    <div class="wrap">
      <p ref="nazov" id="nazov" contenteditable>{{ polozka }}</p>
      <div class="cena-wrap">
        <button @click="remove" class="btn-u btn-x">
          <img src="../assets/delete.svg" alt="">
        </button>
        <button @click="add" class="btn-u btn-y">
          <img src="../assets/done.svg" alt="">
        </button>
        <input ref="cena" autofocus type="number">€
      </div>
    </div>
  </div>
</template>

<script>
  import mixin from '../mixins.js'
  export default {
    props: ['from'],
    data: () => ({
      polozka: 'Nazov'
    }),
    methods: {
      add() {
        this.$store.commit(`add${this.from}`, {
          polozka: this.$refs.nazov.innerText,
          cena: parseInt(this.$refs.cena.value),
          popis: ''         
        })
        mixin.saveToDB(this.from)
        this.remove()
      },
      remove() {
        this.$refs.nazov.innerText = 'Nazov'
        this.$refs.cena.value = null
        this.$emit('hide', this.from)
      },
      
    }
  }
</script>

<style scoped>

  #nazov {
    border: 2px solid #00c4ff;
    border-radius: .3rem;
    padding: 0 .4rem;
  }
  #nazov:focus {
    outline: none;
    /* border: 2px solid #00c4ff; */
  }
  .wrap {
    padding: 0 1rem;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    align-items: center;
  }
  .polozka {
    border: 3px solid red;
    border-radius: .5rem;
    margin-bottom: .5rem;
  }

  .cena-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .bg-2 {
    border-color: #D35051;
  }

  .btn-u {
    margin-right: .5rem;
    background: #ffc400;
    width: 37px;
    display: grid;
    place-items: center;
  }
  .btn-u:hover {
    background: #ffcf32;
  }
  .btn-x {
    background: #c54646;
    margin-left: 0 !important;
  }
  .btn-x:hover {
    background: #ec4444eb;
  }

  .btn-y {
    margin-right: auto;
    background-color: #4ae14ac9;
  }
  .btn-y:hover {
    background-color: #49f949b8;
  }

  input[type=number] {
    width: 46.3%;
    margin-left: .6rem;
    height: 37px;
    font-size: inherit;
    color: inherit;
    text-align: end;
    border-radius: .3rem;
    border: 2px solid #00c4ff;
    padding-right: .1rem;
  }
  input[type=number]:focus {
    outline: none;
    border: 2px solid #00c4ff;  
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

</style>
