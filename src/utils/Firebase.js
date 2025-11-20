// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { IoMagnet } from "react-icons/io5";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "snehatraders-301db.firebaseapp.com",
  projectId: "snehatraders-301db",
  storageBucket: "snehatraders-301db.firebasestorage.app",
  messagingSenderId: "622867230759",
  appId: "1:622867230759:web:3423006aa05f5e2a205e02",
  measurementId: "G-GZY0JYKVX9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
