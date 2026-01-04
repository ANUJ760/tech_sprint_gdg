import KeystrokeCapture from "./keystrokeCapture.js"
import { extractFeatures } from "./featureExtraction.js"

const input = document.getElementById("password")
const button = document.getElementById("login")
const status = document.getElementById("status")

const capture = new KeystrokeCapture(input)

input.addEventListener("focus", () => capture.start())

button.addEventListener("click", async () => {
    capture.stop()
    const raw = capture.getRawEvents()
    const features = extractFeatures(raw)

    const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features })
    })

    const data = await res.json()

    if (data.next === "SUCCESS") {
        status.innerText = "Login successful"
        window.location.href = "../../public/index.html"
    } else {
        status.innerText = "Retry login"
    }

    input.value = ""
    capture.reset()
})
