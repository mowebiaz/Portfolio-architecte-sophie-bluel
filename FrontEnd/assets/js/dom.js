


// To display an error message
export function errorMessage(message) {
    const alertMessage = document.createElement("div")
    alertMessage.innerText = message
    document.body.prepend(alertMessage)
}