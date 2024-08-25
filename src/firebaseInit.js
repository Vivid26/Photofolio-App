import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8wOg_G032D8YR0rB9mFIgnE66yvSEgtw",
  authDomain: "coding-ninjas-apps.firebaseapp.com",
  projectId: "coding-ninjas-apps",
  storageBucket: "coding-ninjas-apps.appspot.com",
  messagingSenderId: "162277395932",
  appId: "1:162277395932:web:675bac2c60d7cd7960d319"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
