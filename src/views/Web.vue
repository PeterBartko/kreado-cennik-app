<template>
  <div class="all">
    <div id="h">
      <h1>Web</h1>
      <input type="text" placeholder="Search" @input="search" v-model="search_str">
      <img id="img-search" src="../assets/search.svg" alt="">
    </div>
    <div v-if="!searchin" class="polozky-wrap">
      <h2>Cenník webu:
        <button id="web" @click="addnew">Pridať</button>
      </h2>
      <NewPolozka  v-on:hide="hide" v-show="web" from="web"/>
      <Polozka v-for="p,i in webs" :key="i" :dataa="p" :i="i"/>
      <h2>Doplnky pre Web stránky:
        <button id="doplnky" @click="addnew">Pridať</button>
      </h2>
      <NewPolozka  v-on:hide="hide" v-show="doplnky" from="doplnky"/>
      <Polozka v-for="p,i in doplns" :key="i" :dataa="p" :i="i"/>
      <h2>Hosting a servis pre web stránku:
        <button id="host" @click="addnew">Pridať</button>
      </h2>
      <NewPolozka  v-on:hide="hide" v-show="host" from="hosting"/>
      <Polozka v-for="p,i in hosts" :key="i" :dataa="p" :i="i"/>
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
      web: false, 
      doplnky: false, 
      host: false, 
      searchin: false,
      search_str: '', 
    }),
    methods: {
      search() {
        if (check_str(this.search_str)) {
          this.searchin = true
          this.suggested = find_em('Web', this.search_str)
        } else {
          this.searchin = false
        }
      },
      addnew(e) {
        if (e.target.id == 'web') this.web = true
        else if (e.target.id == 'host') this.host = true
        else if (e.target.id == 'doplnky') this.doplnky = true
      },
      hide(id) {
        if (id == 'web') this.web = false
        else if (id == 'hosting') this.host = false
        else if (id == 'doplnky') this.doplnky = false
      }
    },
    computed: {
      webs() {
        return this.$store.state.web
      },
      hosts() {
        return this.$store.state.host
      },
      doplns() {
        return this.$store.state.dopln
      }
    }
  }
</script>