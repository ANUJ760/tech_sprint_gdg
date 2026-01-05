import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyBy5WS9dvVUyFZdDNUzQOx7FxhV06vn89o",
  authDomain: "biometrics-gdgtechsprint.firebaseapp.com",
  projectId: "biometrics-gdgtechsprint",
  appId: "1:119268768340:web:aa5b89292720ee97e28bc1"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { auth }
