import { postWork, deleteWork } from "./api.js"
import { displayEditionError, removeError } from "./userMessage.js"
import { works, generateOneWorkPortfolio } from "./works.js"
import { categories } from "./categoryButtons.js";

const editionModal = document.getElementById("modal-edition")
const modalContent = document.querySelector("#modal-edition .modal-content")
const returnIcon = document.querySelector(".return")


//--------------------------------------------------------------------------------
// close the modal: gallery or form
//--------------------------------------------------------------------------------

// to close the modal when elements outside modal-content are clicked
export function closeModals() {
    editionModal.addEventListener("click", () => {
        editionModal.close()
        modalContent.innerHTML = ""  
    })
    modalContent.addEventListener('click', (event) => event.stopPropagation())
}

//--------------------------------------------------------------------------------
// Management of edition modal (with gallery)
//--------------------------------------------------------------------------------

// Add one work to gallery's modal
function generateOneWorkGallery(work) {
        const gallery = document.querySelector(".modal-gallery")

        const divFigure = document.createElement("div")
        divFigure.classList.add("figure-div")
        divFigure.setAttribute("id", work.id)
        divFigure.setAttribute("categoryId", work.categoryId)

        const figure = document.createElement("figure")
        const figureImage = document.createElement("img")
        figureImage.src = work.imageUrl
        figureImage.setAttribute("alt", work.title)
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

// Generate the modal's gallery: add all works
function generateEditionGallery(listWorks) {
    listWorks.forEach(work => {
        generateOneWorkGallery(work)
    });
}

// Generate edition modal with gallery
export function generateEditionModal(listWorks) {
    returnIcon.style.display = "none"

    modalContent.innerHTML = `<header>Galerie photo</header>
                            <div class="modal-gallery">
                            </div>
                            <hr>
                            <div>
                                <button id="add-photo">Ajouter une photo</button>
                                <button id="delete-gallery">Supprimer la galerie</button>
                            </div>`
    generateEditionGallery(listWorks)
}

// Delete one work from dB, galery and portfolio
function trashWork() {
    const trash = document.querySelectorAll(".remove-photo")
    trash.forEach(icon => {
        icon.addEventListener("click", async (Event) => {
            const workId = Event.target.parentElement.id
            const figureToDelete = document.querySelector(`.gallery figure[id="${workId}"]`)
            const response = await deleteWork(workId)
            if (response.ok) {
                Event.target.parentElement.remove()
                figureToDelete.remove()
                works.splice(works.findIndex(work => work.id === workId), 1)
            } else {
                displayEditionError("Impossible de supprimer le travail: ", workId)
            }
        })
    })
}

function deleteGallery() {
    document.getElementById("delete-gallery").addEventListener("click", () => {
        works.forEach(async work => {
            const response = await deleteWork(work.id)
            if (response.ok) {
                document.querySelector(`.figure-div[id="${work.id}"]`).remove()
                document.querySelector(`.gallery figure[id="${work.id}"]`).remove()
                works.splice(works.findIndex(work => work.id === workId), 1)
            } else {
                displayEditionError("Impossible de supprimer le travail: ", work.id)
            }
        });
    })
}

// Open the edition modal (gallery): button "Editer"
export function openEditionModal(listWorks) {
    const editionOpenBtn = document.querySelectorAll(".open-edition")  
    editionOpenBtn.forEach(button => {
        button.addEventListener("click", () => {
            generateEditionModal(listWorks)
            editionModal.showModal()
            trashWork()
            deleteGallery()
        })
    })
}


//--------------------------------------------------------------------------------
// Management of edition form (to add a work)
//--------------------------------------------------------------------------------

// Generate the modal body
export function generateEditionForm() {
    modalContent.innerHTML = `<header>Ajout photo</header>
                        <form method="dialog" id="add-work" novalidate> 
                        <div class="container-img">
                            <i class="fa-solid fa-image icon-image"></i>
                            <label for="image" class="select-img">+ Ajouter photo</label>
                            <input type="file" name="image" id="image">
                            <p>jpg, png : 4mo max</p>
                        </div>
                        <label for="title">Titre</label>
                        <input type="text" name="title" id="title">
                        <label for="category">Catégorie</label>
                        <select name="category" id="category">
                            <option value=""></option>
                        </select>  
                        <hr>
                        <button type="submit" id="submit-work" class="wrong">Valider</button>
                        </form>`
    returnIcon.style.display = "block"

}

// add categories to the form's select button
export function selectCategory() {
    const formSelect = document.getElementById("category")
    categories.forEach(category => {
        const option = document.createElement("option")
        option.setAttribute("value", category.id)
        option.innerText = category.name
        formSelect.appendChild(option)
    });
}

// button "return" to the edition (first) modal
export function returnToFirstModal(listWorks) {
    const returnBtn = document.querySelector(".return")
    returnBtn.addEventListener("click", (event) => {
        event.stopPropagation()
        generateEditionModal(listWorks)
        editionModal.showModal() 
    })
}

// Open the edition form and all the functions
export function openEditionForm(listWorks) {
    generateEditionForm()
    selectCategory()
    returnToFirstModal(listWorks)
    checkEditionForm()
    addWork()
} 


//--------------------------------------------------------------------------------
// Management of the form
//--------------------------------------------------------------------------------

function checkValidity(inputImage, inputTitle, inputCategory) {
    const submitBtn = document.getElementById("submit-work")

    if (inputImage.value.trim() === "" || inputTitle.value.trim() === "" || inputCategory.value === "") {
        submitBtn.classList.add("wrong")
    } else {
        submitBtn.classList.remove("wrong")
    }
}

// Validate each input 
export function checkEditionForm() {
    const containerImg = document.querySelector(".container-img")
    const inputImage = document.getElementById("image")
    const inputTitle = document.getElementById("title")
    const inputCategory = document.getElementById("category")

    inputImage.addEventListener("input", event => {
        const allowedFormats = ["image/jpeg", "image/jpg", "image/png"]
        if (inputImage.value.trim() === "") { 
            displayEditionError("Vous devez sélectionner une image")
        } else {
            const selectedImage = event.target.files[0]
            if (selectedImage.size > 4 * 1024 * 1024) { /*à vérifier */
                displayEditionError("L'image ne doit pas excéder 4Mo")
            } else if (!allowedFormats.includes(selectedImage.type)) {
                displayEditionError("L'image doit être de type .jpg ou .png")
            } else {  /* valid picture */
                removeError()
                const containerImgElements = containerImg.querySelectorAll(".container-img > *")
                containerImgElements.forEach(element => {
                    element.style.display = "none"
                });
                const imageUrl = URL.createObjectURL(selectedImage)
                const showPhoto = `<img src="${imageUrl}" alt="Image Preview">` 
                containerImg.innerHTML += showPhoto
             }
        }
        checkValidity(inputImage, inputTitle, inputCategory)
    })

    inputTitle.addEventListener("input", () => { 
        if (inputTitle.value.trim() === "") {
            displayEditionError("Vous devez indiquer un titre à votre travail")
        } else {
            removeError()
        }
        checkValidity(inputImage, inputTitle, inputCategory)
    })

    inputCategory.addEventListener("input", () => {
        if (inputCategory.value.trim() === "") {
            displayEditionError("Vous devez indiquer une catégorie")
        } else {
            removeError()
        }
        checkValidity(inputImage, inputTitle, inputCategory)
    })
}

// Validate and submit the workData
export function addWork() {
    const addForm = document.getElementById("add-work")
    const submitBtn = document.getElementById("submit-work")
    const inputImage = document.getElementById("image")
    const inputTitle = document.getElementById("title")
    const inputCategory = document.getElementById("category")

    addForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        if (!submitBtn.classList.contains("wrong")) {
            let workData = new FormData()
            workData.append("image", inputImage.files[0])
            workData.append("title", inputTitle.value)
            workData.append("category", inputCategory.value)
            const response = await postWork(workData)
            console.log(response)
            if (response.ok) {
                const newWork = await response.json()
                generateEditionModal(works)
                generateOneWorkGallery(newWork)
                editionModal.showModal()
                trashWork()
                generateOneWorkPortfolio(newWork)
                works.push(newWork)
            } else {
                displayEditionError("Impossible d'ajouter le travail")
            }
        } else {
            displayEditionError("Vous devez remplir tous les champs.")
        }
    })
}