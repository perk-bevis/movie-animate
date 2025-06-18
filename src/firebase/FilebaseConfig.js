// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByvmA2quduV5loFrwcSY_ogXPNvC-ELI4",
  authDomain: "fir-login-3d502.firebaseapp.com",
  projectId: "fir-login-3d502",
  storageBucket: "fir-login-3d502.firebasestorage.app",
  messagingSenderId: "626998247606",
  appId: "1:626998247606:web:958412a88a693d63b82617"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const provider = new GoogleAuthProvider() 
