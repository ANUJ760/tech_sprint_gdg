const passwordInput = document.getElementById("password")
const loginButton = document.getElementById("login")
const status = document.getElementById("status")

const biometricsPill = document.getElementById("biometricPill")

let keyCount = 0

function setPill(state) {
  if (!biometricsPill) return

  biometricsPill.classList.remove("ok", "warn", "bad")

  if (state === "ok") {
    biometricsPill.classList.add("ok")
    biometricsPill.innerHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i><span>Typing pattern captured</span>'
  } else if (state === "warn") {
    biometricsPill.classList.add("warn")
    biometricsPill.innerHTML = '<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i><span>Capturing typing pattern…</span>'
  } else {
    biometricsPill.classList.add("bad")
    biometricsPill.innerHTML = '<i class="fas fa-shield" aria-hidden="true"></i><span>Focus password to start</span>'
  }
}

function setStatusText(text) {
  if (!status) return
  if (text) {
    status.innerHTML = '<i class="fas fa-circle-info" aria-hidden="true"></i><span>' + text + '</span>'
  } else {
    status.innerHTML = '<i class="fas fa-circle-info" aria-hidden="true"></i><span>Enter your password to authenticate securely.</span>'
  }
}

function updateLoginEnabled() {
  const hasPassword = (passwordInput?.value || "").length > 0
  if (loginButton) loginButton.disabled = !hasPassword
}

if (passwordInput) {
  passwordInput.addEventListener("focus", () => {
    keyCount = 0
    setPill("warn")
    setStatusText("Keystroke biometrics active. Type naturally.")
    updateLoginEnabled()
  })

  passwordInput.addEventListener("input", () => {
    updateLoginEnabled()
  })

  passwordInput.addEventListener("keydown", () => {
    keyCount += 1
    if (keyCount >= 8) setPill("ok")
    else setPill("warn")
  })

  passwordInput.addEventListener("blur", () => {
    updateLoginEnabled()
  })
}

if (loginButton) {
  loginButton.addEventListener("click", () => {
    setPill("warn")
    setStatusText("Verifying…")
  })
}

setPill("idle")
setStatusText("")
updateLoginEnabled()
