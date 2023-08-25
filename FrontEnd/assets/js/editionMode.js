import { logBtn } from "./loginLogout.js";

const headerEdition = document.createElement("div")
const btnEdition = `<button class="open-edition">
                    <i class="fa-regular fa-pen-to-square"></i>
                    <p>modifier</p>
                    </button>`
const figCaption = document.createElement("figcaption")
const h2 = document.querySelector("#portfolio h2")



// Create the homepage in edition mode
export function generateHomeEdition() {
    headerEdition.classList.add("edition")
    headerEdition.innerHTML = `<div class="edition-nav">
    <button class="open-edition">
    <i class="fa-regular fa-pen-to-square"></i>
    <p>Mode édition</p>
    </button>
    <button class="publication">publier les changements</button>
    </div>`
    document.body.prepend(headerEdition)

    h2.innerHTML += btnEdition
    
    const figureIntro = document.querySelector("#introduction figure")
    figCaption.innerHTML = btnEdition
    figureIntro.append(figCaption)

    logBtn.innerHTML = "Logout" /* pourquoi ça ne marche pas avec innertext ? */
}

// Delete edition mode from home page
export function removeHomeEdition() {
    headerEdition.remove()
    /*document.querySelectorAll(btnEdition).remove()*/
    figCaption.remove()
    h2.innerHTML = "Mes Projets"
    logBtn.innerHTML = "Login"
}




