import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiKaRt__1xDnyVdZ1V_awcSKvsPMqc9HQ",
  authDomain: "authrn1-9f525.firebaseapp.com",
  projectId: "authrn1-9f525",
  storageBucket: "authrn1-9f525.appspot.com",
  messagingSenderId: "491016629267",
  appId: "1:491016629267:web:1577d863e60ad2934163e6",
};
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
