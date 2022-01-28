<template>
  <div class="polozka" :class="`bg-${i % 3}`">
    <div class="wrap">
      <p>{{ dataa.polozka }}</p>
      <button v-show="upravil" class="btn-u btn-x" @click="remove">
        <img src="../assets/delete.svg" alt="">
      </button>
      <div class="cena-wrap">
        <button class="btn-u" @click="uprava">
          <img src="../assets/settings.svg" alt="">
        </button>
        <button class="btn" v-show="upravil" @click="save">Uložiť</button>
        <div v-show="!upravil" class="pridat-odob">
          <button class="btn" v-if="pridal" @click="add_cena">Pridať</button>
          <button class="btn btn-odob" v-else @click="remove_cena">Odobrať</button>
        </div>
        <input v-show="upravil" ref="cena" type="number">
        <p v-show="!upravil">{{ dataa.cena }}</p>€
      </div>
    </div>
    <p v-show="dataa.popis" v-for="popis,i in popisi" :key="i" class="popis">{{ isList() ? '●' + popis : popis}}</p>
    <!-- <p v-show="dataa.popis" class="popis">{{ dataa.popis }}</p> -->
  </div>
</template>

<script>
  import mixin from '../mixins.js'
  export default {
    props: ['dataa', 'i', 'from'],
    data: () => ({
      pridal: true,
      upravil: false,
      popisi: []
    }),
    methods: {
      save() {
        this.$store.commit(`update${this.from}`, {id: this.dataa.polozka, cena: parseInt(this.$refs.cena.value)})
        this.upravil = false
      },
      remove() {
        this.$store.commit(`remove${this.from}`, this.dataa.polozka)
        mixin.saveToDB()
        this.upravil = false
      },
      uprava() {
        this.$refs.cena.value = this.dataa.cena
        this.$refs.cena.style.borderColor = '#00c4ff'
        this.upravil = !this.upravil 
      },
      add_cena() {
        if (this.pridal) {
          this.pridal = false
          this.$store.commit('addCena', {cena: this.dataa.cena, id: this.dataa.polozka})
        }
      },
      remove_cena() {
        if (!this.pridal) {
          this.pridal = true
          this.$store.commit('addCena', {cena: -this.dataa.cena, id: this.dataa.polozka})
        }
      },
      isList() {
        return this.dataa.popis[0] == '●' ? true : false
      }
    },
    mounted() {
      this.popisi = this.dataa.popis.split('●').filter(p => p != '')
      if (this.$store.state.selected.some(p => p == this.dataa.polozka)) 
        this.pridal = false
      // console.log(this.dataa);
    },
  }      
</script>

<style>
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
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .popis {
    font-size: 1rem;
    padding-left: 1rem;
    padding-bottom: 0.5rem;
  }

  .bg-0 {
    border-color: #E49725;
  }
  .bg-1 {
    border-color: #0D808C;
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
    margin-left: auto;
  }
  .btn-x:hover {
    background: #ec4444eb;
  }

  .btn {
    margin-right: auto;
  }

  .pridat-odob {
    margin-right: auto;
    display: flex;
  }

  button {
    height: 37px;
    width: 4rem;
    color: white;
    cursor: pointer;
    border: none;
    border-radius: .4rem;
    background-color: #4ae14ac9;
  }
  button:hover {
    background-color: #49f949b8;
  }

  .btn-odob {
    background-color: #c54646;
  }
  .btn-odob:hover {
    background-color: #ec4444eb;
  }

  input[type=number] {
    width: 41%;
    height: 37px;
    font-size: inherit;
    color: inherit;
    text-align: end;
    border-radius: .3rem;
    border: 2px solid transparent;
    padding-right: .1rem;
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
