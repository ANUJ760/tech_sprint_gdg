import { auth } from "./firebaseConfig.js"
import { signInWithEmailAndPassword }
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"

import KeystrokeCapture from "./keystrokeCapture.js"
import { extractTimingData } from "./featureExtraction.js"

const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const loginBtn = document.getElementById("login")
const status = document.getElementById("status")

const capture = new KeystrokeCapture(passwordInput)

passwordInput.addEventListener("focus", () => {
  capture.start()
})

loginBtn.onclick = async () => {
  capture.stop()

  try {
    // 1️⃣ Firebase authentication
    const userCred = await signInWithEmailAndPassword(
      auth,
      emailInput.value,
      passwordInput.value
    )

    const token = await userCred.user.getIdToken()

    // 2️⃣ Keystroke feature extraction
    const events = capture.getEvents()
    if (events.length < 2) {
      status.innerText = "Type password naturally"
      return
    }

    const attempt = extractTimingData(events)

    // 3️⃣ Backend biometric verification
    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ attempt })
    })

    const data = await res.json()

    if (data.decision === "ACCEPT") {
      status.innerText = "Login successful"
      window.location.href = "../../public/index.html"
    } else {
      status.innerText = "Biometric verification failed"
    }

  } catch (e) {
    status.innerText = e.code || e.message
  }

  passwordInput.value = ""
  capture.reset()
}
