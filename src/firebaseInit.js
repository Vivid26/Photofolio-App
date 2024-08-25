import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Firebase Configurations created by you for this project.
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
