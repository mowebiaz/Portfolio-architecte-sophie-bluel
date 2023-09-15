import { displayLoginError, displayLoginOk, removeLoginOk } from "./userMessage.js";
import { postUser } from "./api.js";
import { generateHomeEdition, removeHomeEdition } from "./editionMode.js";
import { openEditionModal } from "./editionModal.js";
import { works } from "./works.js";

const logBtn = document.querySelector(".log")
const loginModal = document.getElementById("modal-login")
const loginForm = document.querySelector("#modal-login form")
const divFilters = document.querySelector(".filters")

//--------------------------------------------------------------------------------
// User tries to connect
//--------------------------------------------------------------------------------

// Check email 
function emailValidation(email) {
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if (!emailRegExp.test(email)) {
        throw new Error("Le format de l'email n'est pas valide")
    }
}

// Check password 
function passwordValidation(password) {
    if (password.trim() === "") {
        throw new Error("Vous devez indiquer un mot de passe")
    }
}

// Check email, password, the user's presence in the database
// Connection
async function checkUser() {
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const user = {email: email, password: password} 
    
    try {
        emailValidation(email)
        passwordValidation(password)
    } catch (error) {
        displayLoginError(error.message)
        return 
    }

    const response = await postUser(user)
    if (response.ok) {
        const result = await response.json()
        let token = result.token
        window.sessionStorage.setItem("token", token)
        // switch to connected state
        loginModal.close()
        displayLoginOk("Vous êtes connectés")
        removeLoginOk()
        loggedUser()
    } else {
        displayLoginError("Erreur dans l’identifiant ou le mot de passe")
    }
}

// Open the modal for login form
export const openLoginModal = () => {
    loginModal.showModal()
}

// Submit the login form
const submitLoginForm = (e) => {
    e.preventDefault()
    checkUser()
}

export function login() {
    logBtn.removeEventListener("click", submitLogout)
    logBtn.addEventListener("click", openLoginModal)
    loginForm.addEventListener("submit", submitLoginForm)
}


//--------------------------------------------------------------------------------
// The user is connected.
//--------------------------------------------------------------------------------

export function loggedUser() { 
    logBtn.removeEventListener("click", openLoginModal)
    generateHomeEdition()
    openEditionModal(works)
    logBtn.addEventListener("click", submitLogout)
}
        

//--------------------------------------------------------------------------------
// The user will be disconnected.
//--------------------------------------------------------------------------------

const submitLogout = () => {
    removeHomeEdition()
    divFilters.style.display = "flex"
    window.sessionStorage.removeItem("token")
    login()
}

  







