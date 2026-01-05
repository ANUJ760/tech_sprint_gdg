const passwordInput = document.getElementById("password")
const loginButton = document.getElementById("login")
const status = document.getElementById("status")

function updateButtonState() {
  loginButton.disabled = passwordInput.value.length === 0
}

passwordInput.addEventListener("input", updateButtonState)

passwordInput.addEventListener("focus", () => {
  status.innerText = "Typing pattern capture active"
})

passwordInput.addEventListener("blur", () => {
  if (!passwordInput.value) {
    status.innerText = ""
  }
})

loginButton.addEventListener("click", () => {
  status.innerText = "Verifying identity…"
})

updateButtonState()
