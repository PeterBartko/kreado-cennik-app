import { createStore } from "vuex";

export default createStore({
  state: {
    graficke: [],
    g3d: [],
    web: [],
    host: [],
    dopln: [],
    selected: [],
    cena: 0,
    web_pridal: false,
    host_pridal: false,
  },
  mutations: {
    addCena(state, data) {
      state.cena += data.cena
      if (data.cena > 0) {
        state.selected.push(data.id)
        if (data.from == 'Web') state.web_pridal = true  
        else if (data.from == 'Host') state.host_pridal = true  
      }
      else {
        state.selected = state.selected.filter(p => p != data.id)
        if (data.from == 'Web') state.web_pridal = false  
        else if (data.from == 'Host') state.host_pridal = false  
      }
    },
    addGraf(state, data) {
      state.graficke.push(data)
    },
    addG3d(state, data) {
      state.g3d.push(data)
    },
    addWeb(state, data) {
      state.web.push(data)
    },
    addHost(state, data) {
      state.host.push(data)
    },
    addDoplnky(state, data) {
      state.dopln.push(data)
    },
    setGraf(state, arr) {
      state.graficke = arr == undefined ? [] : arr
    },
    setG3d(state, arr) {
      state.g3d = arr == undefined ? [] : arr
    },
    setWeb(state, arr) {
      state.web = arr == undefined ? [] : arr
    },
    setHost(state, arr) {
      state.host = arr == undefined ? [] : arr
    },
    setDopln(state, arr) {
      state.dopln = arr == undefined ? [] : arr
    },
    updateGraf(state, data) {
      state.graficke.forEach(p => {
        if (data.id == p.polozka) 
          p.cena = data.cena
      })
    },
    updateG3d(state, data) {
      state.g3d.forEach(p => {
        if (data.id == p.polozka) 
          p.cena = data.cena
      })
    },
    updateWeb(state, data) {
      state.web.forEach(p => {
        if (data.id == p.polozka) 
          p.cena = data.cena
      })
    },
    updateHost(state, data) {
      state.host.forEach(p => {
        if (data.id == p.polozka) 
          p.cena = data.cena
      })
    },
    updateDopln(state, data) {
      state.dopln.forEach(p => {
        if (data.id == p.polozka) 
          p.cena = data.cena
      })
    },
    removeGraf(state, id) {
      state.graficke = state.graficke.filter(p => p.polozka != id)
    },
    removeG3d(state, id) {
      state.g3d = state.g3d.filter(p => p.polozka != id)
    },
    removeWeb(state, id) {
      state.web = state.web.filter(p => p.polozka != id)
    },
    removeHost(state, id) {
      state.host = state.host.filter(p => p.polozka != id)
    },
    removeDoplnky(state, id) {
      state.dopln = state.dopln.filter(p => p.polozka != id)
    }
  },
  actions: {},
  modules: {},
});