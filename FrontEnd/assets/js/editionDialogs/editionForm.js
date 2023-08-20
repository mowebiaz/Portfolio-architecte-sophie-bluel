import { closeEditionModal } from "./editionModal.js";
import { getCategories } from "../api.js";

export function openEditionForm() {
    const formOpenBtn = document.getElementById("add-photo")
    const formModal = document.getElementById("modal-form")
    formOpenBtn.addEventListener("click", () => {
        formModal.showModal()
        closeEditionModal() // ne fonctionne pas
    })
}

export function closeEditionForm() {
    const formCloseBtn = document.querySelector("#modal-form .close-modal") 
    const formModal = document.getElementById("modal-form")
    const stopPropagation = document.querySelector("#modal-form .stop-propagation")
    formCloseBtn.addEventListener("click", () => {
            formModal.close()
    })
    // to close the modal if click on backdrop
    formModal.addEventListener("click", () => {
        formModal.close()
    })
    stopPropagation.addEventListener('click', (event) => event.stopPropagation());
}

export async function selectCategory() {
    const categories = await getCategories()
    const formSelect = document.getElementById("select-category")
    categories.forEach(category => {
        const option = document.createElement("option")
        option.setAttribute("value", category.id)
        option.innerText = category.name
        formSelect.appendChild(option)
    });
}

