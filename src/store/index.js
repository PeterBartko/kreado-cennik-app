import { createStore } from "vuex";

export default createStore({
  state: {
    graficke: [],
    g3d: [],
    web: [],
    host: [],
    dopln: [],
    selected: [],
    disabled: [],
    cena: 0,
    web_pridal: false,
    host_pridal: false,
  },
  mutations: {
    addCena(state, {id, cena, from}) {
      state.cena += cena
      if (cena > 0) {
        state.selected.push(id)
        if (from == 'web') {
          state.web_pridal = true  
          state.disabled.push(id)
        } 
        else if (from == 'hosting') {
          state.host_pridal = true  
          state.disabled.push(id)
        }
      }
      else {
        state.selected = state.selected.filter(p => p != id)
        if (from == 'web') {
          state.web_pridal = false  
          state.disabled = state.disabled.filter(p => p != id)
        }
        else if (from == 'hosting') {
          state.host_pridal = false  
          state.disabled = state.disabled.filter(p => p != id)
        }
      }
    },
    addPolozka(state, data) {
      if (data.from == 'grafika') {
        state.graficke.push(data)
      }
      else if (data.from == 'tride') {
        state.g3d.push(data)
      }
      else if (data.from == 'web') {
        state.web.push(data)
      }
      else if (data.from == 'doplnky') {
        state.dopln.push(data)
      }
      else if (data.from == 'hosting') {
        state.host.push(data)
      }
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
    updatePolozka(state, {id, cena, from}) {
      if (from == 'grafika')
        state.graficke.forEach(p => { if (id == p.polozka) p.cena = cena})
      else if (from == 'tride')
        state.g3d.forEach(p => { if (id == p.polozka) p.cena = cena})
      else if (from == 'web')
        state.web.forEach(p => { if (id == p.polozka) p.cena = cena})
      else if (from == 'doplnky')
        state.dopln.forEach(p => { if (id == p.polozka) p.cena = cena})
      else if (from == 'hosting')
        state.host.forEach(p => { if (id == p.polozka) p.cena = cena})
    },
    removePolozka(state, {id, from}) {
      if (from == 'grafika')
        state.graficke = state.graficke.filter(p => p.polozka != id)
      else if (from == 'tride')
        state.g3d = state.g3d.filter(p => p.polozka != id)
      else if (from == 'web')
        state.web = state.web.filter(p => p.polozka != id)
      else if (from == 'doplnky')
        state.dopln = state.dopln.filter(p => p.polozka != id)
      else if (from == 'hosting')
        state.host = state.host.filter(p => p.polozka != id)
    },
  },
  actions: {},
  modules: {},
});