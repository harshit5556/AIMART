import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "loginonecart-3cde1.firebaseapp.com",
  projectId: "loginonecart-3cde1",
  storageBucket: "loginonecart-3cde1.firebasestorage.app",
  messagingSenderId: "359471924887",
  appId: "1:359471924887:web:95c23a4e9de82dda414bd2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth , provider};