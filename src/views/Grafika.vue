<template>
  <div class="all">
    <div id="h">
      <h1>Grafika</h1>
      <input type="text" placeholder="Search" @input="search" v-model="search_str">
      <img id="img-search" src="../assets/search.svg" alt="">
    </div>
    <div v-if="!searchin" class="polozky-wrap">
      <h2>Cenník grafických prác:
        <button id="graf" @click="addnew">Pridať</button>
      </h2>
      <NewPolozka v-show="graf" v-on:hide="hide" from="grafika"/>
      <Polozka v-for="p,i in graficks" :key="i" :dataa="p" :i="i"/>
      <h2>Cenník 3D grafických prác:
        <button id="3d" @click="addnew">Pridať</button>
      </h2>
      <NewPolozka v-show="g3d" v-on:hide="hide" from="tride"/>
      <Polozka v-for="p,i in g3ds" :key="i" :dataa="p" :i="i"/>
    </div>
    <div v-else class="polozky-wrap suggested">
      <Polozka v-for="p,i in suggested" :key="i" :dataa="p" :i="i"/>
    </div>
  </div>
</template>

<script>
  import Polozka from '../components/Polozka.vue'
  import NewPolozka from '../components/NewPolozka.vue'
  import { find_em, check_str } from '../mixins.js';
  
  export default {
    components: { Polozka, NewPolozka },
    data: () => ({
      graf: false,
      g3d: false,
      searchin: false,
      suggested: [],
      search_str: '',
    }),
    methods: {
      search() {
        if (check_str(this.search_str)) {
          this.searchin = true
          this.suggested = find_em('Graficka', this.search_str)
        } else {
          this.searchin = false
        }
      },
      addnew(e) {
        if (e.target.id == 'graf') this.graf = true
        else if (e.target.id == '3d') this.g3d = true
      },
      hide(id) {
        if (id == 'grafika') this.graf = false
        else if (id == 'tride') this.g3d = false
      },
    },
    computed: {
      g3ds() {
        return this.$store.state.g3d
      },
      graficks() {
        return this.$store.state.graficke
      }
    }
  }
</script>

<style>
  .all {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    min-height: calc(100vh - 74px);
  }
  .polozky-wrap {
    width: 60%;
  }

  .suggested {
    padding-top: 77px;
  }

  h2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0 .5rem 0;
    color: #E49725;
  }

  #h {
    display: flex;
    justify-content: space-between;
    width: 60%;
    position: relative;
    align-items: center;
  }

  #h h1 {
    margin-left: auto;
    transform: translateX(50%);
    color: #aaa;
  }

  #h input {
    margin-left: auto;
    border-radius: 0.4rem;
    border: 2px solid #ccc;
    text-indent: 0.5rem;
    height: 2rem;
    color: #888;
  }
  #h input::placeholder {
    color: #ccc;
  }
  #h input:focus {
    outline: none;
    border-color: #49f949b8 ;
  }

  #img-search {
    position: absolute;
    right: 4px;
  }  

  @media screen and (max-width: 900px) {
    .polozky-wrap {
      width: 90%;
    }
    #h {
      width: 90%;
    }
    #h h1 {
      margin-left: 0;
      transform: none;
    }
  }
  @media screen and (max-width: 400px) {
    #h {
      gap: .5rem;
      flex-direction: column;
    }
    #h input {
      width: 100%;
    }
    #h img {
      bottom: 4px;
    }
  }

</style>