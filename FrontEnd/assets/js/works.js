// Contains functions for works

import { getWorks, deleteWork } from "./api.js";


// Recover the list of all works
export let works = await getWorks()

// Add one work in home page
function generateOneWork(work) {
    const gallery = document.querySelector(".gallery")
    const figure = document.createElement("figure")
    /*figure.setAttribute("data-category", work.category.name)*/
    figure.setAttribute("id", work.id)
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
export function generateAllWorks(listWorks) {
    listWorks.forEach(work => {
        generateOneWork(work)
    })
}

export function deleteGallery() {
    document.getElementById("delete-gallery").addEventListener("click", () => {
        // appliquer la ft deleteWork() sur tous les works
    })
}