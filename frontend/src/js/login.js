import KeystrokeCapture from "./keystrokeCapture.js"
import { extractFeatures } from "./featureExtraction.js"
import { getAuth, signInAnonymously } from "firebase/auth"
import { app } from "./firebaseConfig.js"

const auth = getAuth(app)

const input = document.getElementById("password")
const button = document.getElementById("login")
const status = document.getElementById("status")

const capture = new KeystrokeCapture(input)

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

    try {
        const user = await ensureAuth()
        const token = await user.getIdToken()

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ features })
        })

        const data = await res.json()

        if (data.next === "SUCCESS") {
            status.innerText = "Login successful"
            window.location.href = "../../public/index.html"
        } else {
            status.innerText = "Retry login"
        }
    } catch (err) {
        status.innerText = `Login failed: ${err.message}`
    }

    input.value = ""
    capture.reset()
})
