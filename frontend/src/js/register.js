let authPasswordValue = null
let referencePassword = null


import { auth } from "./firebaseConfig.js"
import { createUserWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"

import KeystrokeCapture from "./keystrokeCapture.js"
import { extractTimingData } from "./featureExtraction.js"


const email = document.getElementById("email")
const authPassword = document.getElementById("authPassword")
const signupBtn = document.getElementById("signup")

const password = document.getElementById("password")
const button = document.getElementById("capture")
const status = document.getElementById("status")


signupBtn.onclick = async () => {
    try {
        await createUserWithEmailAndPassword(
            auth,
            email.value,
            authPassword.value
        )

        authPasswordValue = authPassword.value

        status.innerText = "User created. Now type the SAME password 10 times."
    } catch (e) {
        status.innerText = e.code + ": " + e.message
    }
}



const capture = new KeystrokeCapture(password)
let attempts = []

password.addEventListener("focus", () => capture.start())

button.onclick = async () => {
    capture.stop()

    const typedPassword = password.value


    if (typedPassword !== authPasswordValue) {
        status.innerText = "Password must match account password exactly"
        password.value = ""
        capture.start()
        return
}


    // First attempt sets reference password
    if (referencePassword === null) {
        referencePassword = typedPassword
        status.innerText = "Password set. Repeat the same password 9 more times."
    } else {
        // Validate password consistency
        if (typedPassword !== referencePassword) {
            status.innerText = "Password mismatch. Please type the SAME password."
            password.value = ""
            capture.start()
            return
        }
    }

    const events = capture.getEvents()
    if (events.length < 2) {
        status.innerText = "Typing too short. Try again."
        capture.start()
        return
    }

    const timingData = extractTimingData(events)
    attempts.push(timingData)

    status.innerText = `Captured ${attempts.length} / 10`
    password.value = ""

    if (attempts.length === 10) {
        if (!auth.currentUser) {
            status.innerText = "Please login first"
            return
        }

        const token = await auth.currentUser.getIdToken()

        await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ attempts })
        })

        status.innerText = "Keystroke profile created"
        attempts = []
        referencePassword = null
    } else {
        capture.start()
    }
}

