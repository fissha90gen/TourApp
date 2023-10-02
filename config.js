import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/database";

const firebaseConfig = {
  apiKey: "AIzaSyDGF5oWyThkQ3VKP9FexoPRWqbEReiGUA8",
  authDomain: "tourapp-e6330.firebaseapp.com",
  projectId: "tourapp-e6330",
  storageBucket: "tourapp-e6330.appspot.com",
  messagingSenderId: "902373195552",
  appId: "1:902373195552:web:7de2bef76df0aaefede145",
  measurementId: "G-J1P7T01HX6",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
