import { openEditionForm } from "./editionForm.js";


export function openEditionModal() {
    const editionOpenBtn = document.querySelectorAll(".open-edition")  
    const editionModal = document.getElementById("modal-edition")
    editionOpenBtn.forEach(button => {
        button.addEventListener("click", () => {
            editionModal.showModal()
        })
    })
}

export function closeEditionModal() {
    const editionCloseBtn = document.querySelector("#modal-edition .close-modal") 
    const editionModal = document.getElementById("modal-edition")
    const stopPropagation = document.querySelector("#modal-edition .stop-propagation")
    editionCloseBtn.addEventListener("click", () => {
        editionModal.close()
    })
    // to close the modal if click on backdrop
    editionModal.addEventListener("click", () => {
        editionModal.close()
    })
    stopPropagation.addEventListener('click', (event) => event.stopPropagation());
}

// Generate edition modal 
export function generateEditionModal(listWorks) {
    generateEditionGallery(listWorks)
    // ajouter la fonction pour supprimer un travail
    // ajouter la fonction pour supprimer la galerie
    openEditionForm()
}

// To generate the modal's gallery
function generateEditionGallery(listWorks) {
    for (let i = 0; i < listWorks.length; i++) {
        const gallery = document.querySelector(".modal-gallery")

        const divFigure = document.createElement("div")
        divFigure.classList.add("figure-div")
        divFigure.setAttribute("id", listWorks[i].id)
        divFigure.setAttribute("categoryId", listWorks[i].categoryId)

        const figure = document.createElement("figure")
        const figureImage = document.createElement("img")
        figureImage.src = listWorks[i].imageUrl
        figureImage.setAttribute("alt", listWorks[i].title)
        const figureCaption = document.createElement("figcaption")
        figureCaption.innerText = "éditer"

        const figureIcon = document.createElement("div")
        figureIcon.classList.add("remove-photo")
        figureIcon.innerHTML = `<i class="fa-solid fa-trash-can"></i>`

        gallery.appendChild(divFigure)
        divFigure.appendChild(figureIcon)
        divFigure.appendChild(figure)
        figure.appendChild(figureImage)
        figure.appendChild(figureCaption)
    }
}




