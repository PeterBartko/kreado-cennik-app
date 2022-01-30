import db from "./firestore/config.js"
import store from "./store/index.js"

const saveToDB = async from => {
  if (from == 'tride' || from == 'grafika') {
    try {
      const dataBase = db.collection('cennik').doc('yLuJdOEsRb3BbCSrzIOG')
      await dataBase.set({
        grafika: store.state.graficke,
        tride: store.state.g3d
      })
    } catch(err) {
      console.error(err)
    }
  } else {
    try {
      const dataBase = db.collection('cennik').doc('YEdKd2m7WNT7xgHxD0fv')
      await dataBase.set({
        doplnky: store.state.dopln,
        hosting: store.state.host,
        web: store.state.web
      })
    } catch(err) {
      console.error(err)
    }
  }
}

const check_str = str => {
  if (str == 0) return false
  if (str.split('').every(ch => ch == ' ')) return false
  return true
}

const no_dia = str => {
  const map = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'ä': 'a',
    'ý': 'y',
    'ľ': 'l',
    'š': 's',
    'č': 'c',
    'ť': 't',
    'ž': 'z',
    'ď': 'd',
    'ň': 'n',
    'ŕ': 'r'
  }
  return str.split('').map(ch => {
    for (const key in map)
      if (ch == key)
        return map[key]
    return ch
  }).join('')
}

const validate = (c, str) => {
  c = no_dia(c.toLowerCase()), str = no_dia(str.toLowerCase())
  if (c.indexOf(str) != -1) return true
  return false
}

const find_em = (from, str) => {
  let arr
  if (from == 'Graficka') {
    arr = [...store.state.graficke, ...store.state.g3d]
    return arr.filter(p => validate(p.polozka, str))
  }
  else {
    arr = [...store.state.web, ...store.state.dopln, ...store.state.host]
    return arr.filter(p => validate(p.polozka, str))
  }
} 

export default null
export { saveToDB, find_em, check_str }