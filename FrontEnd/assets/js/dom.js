let alertMessage = document.querySelector(".error")



// Display an error message for submit login form
export function displayLoginError(message) {
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

export function displayEditionError(message) {
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
    if (alertMessage) {
        alertMessage.remove()
    }
}