<template>
  <Navbar/>
  <router-view/>
  <Footerr/>
</template>

<script>
  import db from "./firestore/config"
  import Navbar from './components/Navbar.vue'
  import Footerr from './components/Footerr.vue'
  export default {
    components: { Navbar, Footerr },
    async mounted() {
      const databaseG = await db.collection("cennik").doc('yLuJdOEsRb3BbCSrzIOG')
      const databaseW = await db.collection("cennik").doc('YEdKd2m7WNT7xgHxD0fv')
      const dbGrafika = await databaseG.get() 
      const dbWeb = await databaseW.get() 
      this.$store.commit('setGraf', dbGrafika.data().grafika)
      this.$store.commit('setG3d', dbGrafika.data().tride)
      this.$store.commit('setWeb', dbWeb.data().web)
      this.$store.commit('setDopln', dbWeb.data().doplnky)
      this.$store.commit('setHost', dbWeb.data().hosting)
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: #2c3e50;
    min-height: 100vh;
  }
</style>
