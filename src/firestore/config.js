import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyByq3RSyOLymlCJ6X_8Vj1btkUaDWgsUpQ",
  authDomain: "kreado-app.firebaseapp.com",
  projectId: "kreado-app",
  storageBucket: "kreado-app.appspot.com",
  messagingSenderId: "687629004301",
  appId: "1:687629004301:web:19046055458ea437edef44"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export {timestamp}
export default firebaseApp.firestore()