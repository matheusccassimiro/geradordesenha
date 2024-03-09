const senha = document.getElementById('resultado');
const renovar = document.getElementById('renovar')
const copiar1 = document.getElementById('copiar1')
const seguranca = document.getElementById('seguranca')
const length = document.getElementById('length')
const range = document.getElementById('password-length')
const copiar2 = document.getElementById('copy-2')

const upperCaseCheckEl = document.querySelector("#uppercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")

let passwordLength = 16

function generatePassword() {
    let chars = "abcdefghjkmnpqrstuvwxyz"

    const upperCaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numberChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if (upperCaseCheckEl.checked) {
        chars += upperCaseChars
    }

    if (numberCheckEl.checked) {
        chars += numberChars
    }

    if (symbolCheckEl.checked) {
        chars += symbolChars
    }

    let password = ""

    for (let i = 0; i < passwordLength; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    senha.innerText = password

    calculateQuality()
    calculateFontSize()
}
renovar.addEventListener("click", generatePassword)


//copiar senha gerada
function copy() {
    navigator.clipboard.writeText(senha.innerText)
}
copiar1.addEventListener("click", copy)
copiar2.addEventListener("click", copy)



function calculateQuality() {
    // T*0.25 + M*0.15 + N*0.25 + S*0.35 = 100
    const percent = Math.round(
        (passwordLength / 64) * 25 +
        (upperCaseCheckEl.checked ? 15 : 0) +
        (numberCheckEl.checked ? 25 : 0) +
        (symbolCheckEl.checked ? 35 : 0)
    )

    seguranca.style.width = `${percent}%`

    if (percent > 60) {
        // safe
        seguranca.classList.remove("critical")
        seguranca.classList.remove("warning")
        seguranca.classList.add("safe")
    } else if (percent > 35) {
        // warning
        seguranca.classList.remove("critical")
        seguranca.classList.add("warning")
        seguranca.classList.remove("safe")
    } else {
        // critical
        seguranca.classList.add("critical")
        seguranca.classList.remove("warning")
        seguranca.classList.remove("safe")
    }

    if (percent >= 100) {
        seguranca.classList.add("completed")
    } else {
        seguranca.classList.remove("completed")
    }
}

function calculateFontSize() {
    if (passwordLength > 41) {
        senha.classList.remove("font-sm")
        senha.classList.remove("font-xs")
        senha.classList.add("font-xxs")
        senha.classList.remove("font-normal")
    } else if (passwordLength > 31) {
        senha.classList.remove("font-sm")
        senha.classList.add("font-xs")
        senha.classList.remove("font-xxs")
        senha.classList.remove("font-normal")
    } else if (passwordLength > 22) {
        senha.classList.add("font-sm")
        senha.classList.remove("font-xs")
        senha.classList.remove("font-xxs")
        senha.classList.remove("font-normal")
    } else {
        senha.classList.remove("font-sm")
        senha.classList.remove("font-xs")
        senha.classList.remove("font-xxs")
        senha.classList.add("font-normal")

    }
}

range.addEventListener("input", function () {
    passwordLength = range.value
    document.querySelector("#length").innerText =
        passwordLength
    generatePassword()
})

upperCaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)

generatePassword()
