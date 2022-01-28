import db from "./firestore/config.js"
import store from "./store/index.js"

export default {
    async saveToDB() {
        if (this.from == 'G3d' || this.from == 'Graf') {
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
}