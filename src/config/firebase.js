import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiA064DgZV6DhMvMZ35SaMEJurcLFu1D8",
  authDomain: "techreserve-6ca5c.firebaseapp.com",
  projectId: "techreserve-6ca5c",
  storageBucket: "techreserve-6ca5c.appspot.com",
  messagingSenderId: "706242785059",
  appId: "1:706242785059:web:740728226acc3fc5eca696",
  measurementId: "G-BPVGELQFHW"
};

export const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase) //Inicialisación de la DB