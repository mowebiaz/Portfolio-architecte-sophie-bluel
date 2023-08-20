// Contains functions for works

import { getWorks } from "./api.js";


// Recover the list of all works
export const works = await getWorks()

// Add one work in the DOM
function generateOneWork(work) {
    const gallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    /*figure.setAttribute("data-category", work.category.name)*/
    figure.dataset.category = work.category.name
    const figureImage = document.createElement("img")
    figureImage.src = work.imageUrl
    figureImage.setAttribute("alt", work.title)
    const figureCaption = document.createElement("figcaption")
    figureCaption.innerText = work.title
    gallery.appendChild(figure)
    figure.appendChild(figureImage)
    figure.appendChild(figureCaption)
    // prévoir de l'ajouter au localStorage ou sessionStorage ?
}

// Add all works in the DOM
export function generateListWorks(listWorks) {
    listWorks.forEach(work => {
        generateOneWork(work)
    })
}

// mettre une fonction pour vérifier et ajouter un seul travail avec fetch
