import { displayErrorMessage } from "./dom.js";
import { postUser } from "./api.js";
import { generateHomeEdition, removeHomeEdition } from "./editionMode.js";
import { openEditionModal, closeEditionModal } from "./editionDialogs/editionModal.js";
import { openEditionForm, closeEditionForm, selectCategory } from "./editionDialogs/editionForm.js";

export const logBtn = document.querySelector(".log")
export const loginModal = document.getElementById("modal-login") /*pourquoi export ? */
const loginForm = document.querySelector("#modal-login form")

//--------------------------------------------------------------------------------
// The user tries to connect
//--------------------------------------------------------------------------------

// Check email 
function emailValidation(email) {
    const emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+") /* à revoir */
    if (!emailRegExp.test(email)) {
        throw new Error("Le format de l'email n'est pas valide")
    }
}

// Check password 
function passwordValidation(password) {
    if (password.trim() === "") {
        throw new Error("Vous devez indiquer un mot de passe");
    }
}

// Check email, password, if the user is in dB
// if yes, connection
async function checkUser() {
/*     const user = new FormData(loginForm)
    const objUser = Object.fromEntries(user.entries())
    const jsonUser = JSON.stringify(objUser) */

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const user = {email: email, password: password} 
    
    try {
        emailValidation(email)
        passwordValidation(password)
    } catch (error) {
        displayErrorMessage(error.message)
        return /* à revoir */
    }

    const response = await postUser(user)
    if (response.ok) {
        const result = await response.json()
        let token = result.token
        window.sessionStorage.setItem("token", token)
        // on bascule vers l'état connecté
        loginModal.close()
        loggedUser()
    } else {
        displayErrorMessage("Erreur dans l’identifiant ou le mot de passe")
    }
}

// To check that the user exist in the dB 
// and switch to edition mode
/* export async function login() {
    const email = document.getElementById("login-email").value
    const password = document.getElementById("password").value
    const user = {email: email, password: password} 
    const modal = document.getElementById("modal-login")
    try {
        emailValidation(email)
        passwordValidation(password)

    } catch (error) {
        errorMessage(error.message)
        return /* à revoir 
    }
    const checkUser = await getUser(user)
    if (checkUser.ok) {
        const response = await checkUser.json()
        let token = response.token
        window.sessionStorage.setItem("token", token)
        homeEdition()
        modal.close()
    } else {
        errorMessage("Erreur dans l’identifiant ou le mot de passe")
    }
} */


// Open the modal for login form
export const openLoginModal = () => {
    loginModal.showModal()
}

// Submit the login form
const submitLoginForm = (e) => {
    e.preventDefault()
    checkUser()
}

//
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
    logBtn.addEventListener("click", submitLogout)

    openEditionModal()
    closeEditionModal()

    openEditionForm()
    selectCategory()
    closeEditionForm()
}
        

//--------------------------------------------------------------------------------
// The user will be disconnected.
//--------------------------------------------------------------------------------

const submitLogout = () => {
    removeHomeEdition()
    window.sessionStorage.removeItem("token")
    login()
    /* faire un reset du form login ? */
}

  







