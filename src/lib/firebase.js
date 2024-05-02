
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-app-2392a.firebaseapp.com",
  projectId: "chat-app-2392a",
  storageBucket: "chat-app-2392a.appspot.com",
  messagingSenderId: "268882808648",
  appId: "1:268882808648:web:9bb66499503e9d75eaed7d"

};



const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()