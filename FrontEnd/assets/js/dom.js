


// To display an error message
export function displayErrorMessage(message) {
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

