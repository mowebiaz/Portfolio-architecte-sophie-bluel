// Contains functions for works

import { getWorks, deleteWork, postWork } from "./api.js";


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
export function generateAllWorks(listWorks) {
    listWorks.forEach(work => {
        generateOneWork(work)
    })
}



// to delete one work 
export async function trashWork() {
    const trash = document.querySelectorAll(".remove-photo")
    trash.forEach(icon => {
        icon.addEventListener("click", async (Event) => {
            const workId = Event.target.parentElement.id
            /*console.log("l'id du parent est:", workId)*/
            try {
                const response = await deleteWork(workId);
                if (response.ok) {
                    // Supprimer l'élément de la gallery de la modale après la suppression réussie
                    Event.target.parentElement.remove();
                    // supprimer l'élément du portfolio: pas possible sans l'ID
                    // sinon refaire un generateallworks
                } else {
                    console.error("Failed to delete work with ID:", workId)
                }
            } catch (error) {
                console.error("Error deleting work:", error)
            }
        })
    });
}

export function deleteGallery() {
    document.getElementById("delete-gallery").addEventListener("click", () => {
        // appliquer la ft deleteWork() sur tous les works
    })
}