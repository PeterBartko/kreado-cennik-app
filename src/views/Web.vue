<template>
  <div class="all">
    <h1>Web</h1>
    <div class="polozky-wrap">
      <h2>Cenník webu:  <button id="web" @click="addnew">Pridať</button></h2>
      <NewPolozka  v-on:hide="hide" v-show="web" from="Web"/>
      <Polozka v-for="p,i in this.$store.state.web" :key="i" from="Web" :dataa="p" :i="i"/>
      <h2>Doplnky pre Web stránky:  <button id="doplnky" @click="addnew">Pridať</button></h2>
      <NewPolozka  v-on:hide="hide" v-show="doplnky" from="Doplnky"/>
      <Polozka v-for="p,i in this.$store.state.dopln" :key="i" from="Doplnky" :dataa="p" :i="i"/>
      <NewPolozka  v-on:hide="hide" v-show="host" from="Host"/>
      <h2>Hosting a servis pre web stránku:  <button id="host" @click="addnew">Pridať</button></h2>
      <Polozka v-for="p,i in this.$store.state.host" :key="i" from="Host" :dataa="p" :i="i"/>
    </div>
  </div>
</template>

<script>
  import Polozka from '../components/Polozka.vue'
  import NewPolozka from '../components/NewPolozka.vue'
  export default {
    components: { Polozka, NewPolozka },
    data: () => ({
      web: false, 
      doplnky: false, 
      host: false 
    }),
    methods: {
      addnew(e) {
        if (e.target.id == 'web') this.web = true
        else if (e.target.id == 'host') this.host = true
        else if (e.target.id == 'doplnky') this.doplnky = true
      },
      hide(id) {
        if (id == 'Web') this.web = false
        else if (id == 'Host') this.host = false
        else if (id == 'Doplnky') this.doplnky = false
      }
    }
  }
</script>