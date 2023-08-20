import { deleteWork, postWork } from "../api.js";
import { closeEditionForm } from "./editionForm.js";


const editionForm = document.getElementById("add-work")

// To add one work
export async function addWork() {
    editionForm.addEventListener("submit", async (e) => {
        const workData = new FormData(editionForm)
        e.preventDefault()
        const response = await postWork(workData)
        console.log(response)

        /**
         * Vérifier le formulaire
         */
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
                    // Supprimer l'élément de l'interface utilisateur après la suppression réussie
                    Event.target.parentElement.remove();
                } else {
                    console.error("Failed to delete work with ID:", workId);
                }
            } catch (error) {
                console.error("Error deleting work:", error);
            }
        })
    });
}

export function deleteGallery() {
    document.getElementById("delete-gallery").addEventListener("click", () => {
        // appliquer la ft deleteWork() sur tous les works
    })
}