// Contains functions for works

import { getWorks, deleteWork } from "./api.js";
import { categories } from "./categoryButtons.js";


// Recover the list of all works
export let works = await getWorks()



// Add one work in home page
export function generateOneWorkPortfolio(work) {
    const gallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    figure.setAttribute("id", work.id)
    figure.dataset.categoryid = work.categoryId
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
export function generateAllWorks(listWorks) {
    listWorks.forEach(work => {
        generateOneWorkPortfolio(work)
    })
}

