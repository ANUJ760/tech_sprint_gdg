// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy5WS9dvVUyFZdDNUzQOx7FxhV06vn89o",
  authDomain: "biometrics-gdgtechsprint.firebaseapp.com",
  projectId: "biometrics-gdgtechsprint",
  storageBucket: "biometrics-gdgtechsprint.firebasestorage.app",
  messagingSenderId: "119268768340",
  appId: "1:119268768340:web:aa5b89292720ee97e28bc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the initialized app for other modules to use
export { app, firebaseConfig };