//--------------------------------------------------------------------------------
// User messages - login form
//--------------------------------------------------------------------------------

export function displayLoginError(message) {
    let alertMessage = document.querySelector(".error")
    if (!alertMessage) {
        const form = document.querySelector("#modal-login form")
        const alertMessage = document.createElement("div")
        alertMessage.classList.add("error")
        alertMessage.innerText = message
        form.prepend(alertMessage)
    } else {
        alertMessage.innerText = message
    }
}

export function displayLoginOk(message) {
    let alertMessage = document.querySelector(".confirm")
    if (!alertMessage) {
        const main = document.querySelector("main")
        const alertMessage = document.createElement("div")
        alertMessage.classList.add("confirm")
        alertMessage.innerText = message
        main.prepend(alertMessage)
    } else {
        alertMessage.innerText = message
    }
}

export function removeLoginOk() {
    let alertMessage = document.querySelector(".confirm")
    if (alertMessage) {
        setTimeout(() => {
            alertMessage.style.display = "none"
        }, 1000)
    }
}

//--------------------------------------------------------------------------------
// User messages - modal form
//--------------------------------------------------------------------------------

export function displayEditionError(message) {
    let alertMessage = document.querySelector(".error")
    if (!alertMessage) {
        const form = document.querySelector("#modal-edition .modal-content")
        const alertMessage = document.createElement("div")
        alertMessage.classList.add("error")
        alertMessage.innerText = message
        form.prepend(alertMessage)
    } else {
        alertMessage.innerText = message
    }
}

export function removeError() {
    let alertMessage = document.querySelector(".error")
    if (alertMessage) {
        alertMessage.remove()
    }
}