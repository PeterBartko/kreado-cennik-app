<template>
  <div class="polozka bg-2">
    <div class="wrap">
      <input type="text" id="nazov" placeholder="Nazov" v-model="nazov">
      <div class="cena-wrap">
        <button @click="remove" class="btn-u btn-x">
          <img src="../assets/delete.svg" alt="">
        </button>
        <button @click="add" class="btn-u btn-y">
          <img src="../assets/done.svg" alt="">
        </button>
        <input v-model="cena" type="number">€
      </div>
    </div>
    <textarea placeholder="Popis" id="popis" v-model="popis" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
  import { saveToDB } from '../mixins.js'
  export default {
    props: ['from'],
    data: () => ({
      nazov: '',
      cena: 0,
      popis: ''
    }),
    methods: {
      add() {
        if (this.cena == 0 && this.nazov == '') {
          alert('Zadaj cenu aj názov')
          return
        } 
        else if (this.nazov == '') {
          alert('Nezadal si názov')
          return
        } 
        else if (this.cena == 0) {
          alert('Nezadal si cenu')
          return
        } 

        this.$store.commit(`addPolozka`, {
          polozka: this.nazov,
          cena: this.cena,
          from: this.from,
          popis: this.popis         
        })
        saveToDB(this.from)
        this.remove()
      },
      remove() {
        this.nazov = ''
        this.cena = 0
        this.popis = ''
        this.$emit('hide', this.from)
      },
    }
  }
</script>

<style scoped>

  #nazov {
    border: 2px solid transparent;
    border-radius: .3rem;
    height: 37px;
    padding: 0 .4rem;
    font-size: 2rem;
  }
  #nazov:focus {
    outline: none;
    border-color: #00c4ff;
  }
  .wrap {
    padding: 0;
    height: 3.5rem;
    display: flex;
    justify-content: space-between;
    font-size: 2rem;
    align-items: flex-start;
  }
  .polozka {
    border: 3px solid red;
    border-radius: .5rem;
    padding: 1rem;
    margin-bottom: .5rem;
  }

  #popis {
    max-width: 100%;
    width: 100%;
    height: 130px;
    border: 2px solid #00c4ff25;
    border-radius: 0.3rem;
    font-size: 1rem;
    font-family: inherit;
    padding: .5rem;
  }
  #popis:focus {
    outline: none;
    border-color: #00c4ff;
  }
  #popis::placeholder {
    color: #ccccccfc;
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
    width: 80px;
    margin-left: .6rem;
    height: 37px;
    font-size: inherit;
    color: inherit;
    text-align: end;
    border-radius: .3rem;
    border: 2px solid transparent;
    padding-right: .1rem;
  }
  input[type=number]:focus {
    outline: none;
    border-color: #00c4ff;  
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }

  @media screen and (max-width: 670px) {
    .polozka {
      padding-bottom: 3.3rem;
    }
    .wrap {
      height: fit-content;
      margin-bottom: 1rem;
    }
    #nazov {
      width: 100%;
    }
  }

</style>
