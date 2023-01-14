import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDV3xkmK7ZjEkvKJk8ptp8hdd5cfYM2VFY",
  authDomain: "todo-app-alia.firebaseapp.com",
  projectId: "todo-app-alia",
  storageBucket: "todo-app-alia.appspot.com",
  messagingSenderId: "718784412274",
  appId: "1:718784412274:web:0748da741def9feec060eb",
  databaseURL: "https://todo-app-alia.firebaseio.com",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();
export default db;
