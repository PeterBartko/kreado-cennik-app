<template>
  <div class="all">
    <h1>Grafika</h1>
    <div class="polozky-wrap">
      <h2>Cenník grafických prác: <button id="graf" @click="addnew">Pridať</button></h2>
      <NewPolozka v-show="graf" v-on:hide="hide" from="Graf"/>
      <Polozka v-for="p,i in this.$store.state.graficke" :key="i" from="Graf" :dataa="p" :i="i"/>
      <h2>Cenník 3D grafických prác: <button id="3d" @click="addnew">Pridať</button></h2>
      <NewPolozka v-show="g3d" from="G3d"/>
      <Polozka v-for="p,i in this.$store.state.g3d" from="G3d" :key="i" :dataa="p" :i="i"/>
    </div>
  </div>
</template>

<script>
  import Polozka from '../components/Polozka.vue'
  import NewPolozka from '../components/NewPolozka.vue'
  export default {
    components: { Polozka, NewPolozka },
    data: () => ({
      graf: false,
      g3d: false,
    }),
    methods: {
      addnew(e) {
        if (e.target.id == 'graf') this.graf = true
        else if (e.target.id == '3d') this.g3d = true
      },
      hide(id) {
        if (id == 'Graf') this.graf = false
        else if (id == 'G3d') this.g3d = false
      }
    },
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

  h2 {
    /* text-align: start; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 2rem 0 .5rem 0;
    color: #E49725;
  }

  h1 {
    color: #aaa;
  }

  @media screen and (max-width: 900px) {
    .polozky-wrap {
      width: 90%;
    }
  }

</style>