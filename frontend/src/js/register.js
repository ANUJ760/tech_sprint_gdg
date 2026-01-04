import KeystrokeCapture from "./keystrokeCapture.js"
import { extractFeatures } from "./featureExtraction.js"
import { getAuth, signInAnonymously } from "firebase/auth"
import { app } from "./firebaseConfig.js"

const auth = getAuth(app)

const input = document.getElementById("password")
const button = document.getElementById("submit")
const status = document.getElementById("status")

const capture = new KeystrokeCapture(input)
let attempts = []

input.addEventListener("focus", () => capture.start())

async function ensureAuth() {
    if (!auth.currentUser) {
        await signInAnonymously(auth)
    }
    return auth.currentUser
}

button.addEventListener("click", async () => {
    capture.stop()
    const raw = capture.getRawEvents()
    const features = extractFeatures(raw)

    if (features.length === 0) return

    attempts.push(features)
    status.innerText = `Captured ${attempts.length}/10 attempts`

    input.value = ""
    capture.reset()
    capture.start()

    if (attempts.length === 10) {
        try {
            const user = await ensureAuth()
            const token = await user.getIdToken()

            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                body: JSON.stringify({ attempts })
            })

            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                status.innerText = `Registration failed: ${err.detail || res.statusText}`
            } else {
                status.innerText = "Registration data sent"
                attempts = []
            }
        } catch (err) {
            status.innerText = `Registration failed: ${err.message}`
        }
    }
})
