import { getCategories, postWork } from "./api.js"
import { displayEditionError } from "./dom.js"

const editionModal = document.getElementById("modal-edition")
const modalContent = document.querySelector("#modal-edition .modal-content")
const returnIcon = document.querySelector(".return")



//--------------------------------------------------------------------------------
// close the modal: gallery or form
//--------------------------------------------------------------------------------

export function closeEditionModal() {
    const editionCloseBtn = document.querySelector("#modal-edition .close-modal") 
    editionCloseBtn.addEventListener("click", () => {
        /*editionModal.close() pas nécessaire car le stop.stopPropagation ne le concerne pas */
        modalContent.innerHTML = ""
    })   
    // to close the modal when backdrop is clicked
    editionModal.addEventListener("click", () => {
        editionModal.close()
        modalContent.innerHTML = ""  
    })
    modalContent.addEventListener('click', (event) => event.stopPropagation());
}

//--------------------------------------------------------------------------------
// Management of edition modal (with gallery)
//--------------------------------------------------------------------------------

// Generate the modal's gallery
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

// Generate edition modal with gallery
function generateEditionModal(listWorks) {
    modalContent.innerHTML = `<header>Galerie photo</header>
                            <div class="modal-gallery">
                            </div>
                            <hr>
                            <div>
                                <button id="add-photo">Ajouter une photo</button>
                                <button id="delete-gallery">Supprimer la galerie</button>
                            </div>`
    returnIcon.style.display = "none"
    generateEditionGallery(listWorks)
}

// Open the edition modal (gallery): button "Editer"
export function openEditionModal(listWorks) {
    const editionOpenBtn = document.querySelectorAll(".open-edition")  
    editionOpenBtn.forEach(button => {
        button.addEventListener("click", () => {
            generateEditionModal(listWorks)
            editionModal.showModal()
            // supprimer un travail
            // supprimer la galery
            /*openEditionForm(listWorks) /*see below */
        })
    })
}


//--------------------------------------------------------------------------------
// Management of edition form (add a work)
//--------------------------------------------------------------------------------

// Generate the modal body
function generateEditionForm() {
    modalContent.innerHTML = `<header>Ajout photo</header>
                        <form method="dialog" id="add-work" novalidate> 
                        <div class="container-img">
                        <i class="fa-solid fa-image icon-image"></i>
                        <label for="image" class="select-img">+ Ajouter photo</label>
                        <input type="file" name="image" id="image" required>
                        <p>jpg, png : 4mo max</p>
                        </div>
                        <label for="title">Titre</label>
                        <input type="text" name="title" id="title" required>
                        <label for="category">Catégorie</label>
                        <select name="category" id="category" required>
                            <option value=""></option>
                        </select>  
                        <hr>
                        <button type="submit" disabled>Valider</button>
                        </form>`
    returnIcon.style.display = "block"
}

// fetch categories and add them to the form's select button
async function selectCategory() {
    const categories = await getCategories()
    const formSelect = document.getElementById("category")
    categories.forEach(category => {
        const option = document.createElement("option")
        option.setAttribute("value", category.id)
        option.innerText = category.name
        formSelect.appendChild(option)
    });
}

// button "return" to the edition modal (with gallery)
function returnToFirstModal(listWorks) {
    const returnBtn = document.querySelector(".return")
    returnBtn.addEventListener("click", (event) => {
        event.stopPropagation()
        generateEditionModal(listWorks)
        editionModal.showModal() 
    })
}


// 
export function openEditionForm(listWorks) {
    const formOpenBtn = document.getElementById("add-photo")
    formOpenBtn.addEventListener("click", () => {
        generateEditionForm()
        selectCategory()
        returnToFirstModal(listWorks)
        /*addWork()*/
    })
} 


//--------------------------------------------------------------------------------
// Management of the form
//--------------------------------------------------------------------------------
const inputImage = document.getElementById("image")
const inputTitle = document.getElementById("title")
const inputCategory = document.getElementById("category")
const submitBtn = document.querySelector("#add-work button")


//
function checkValidity() {

    if (inputImage === "" || inputTitle.value.trim() === "" || inputCategory.value === "") {
        submitBtn.setAttribute("disabled", "true");
    } else {
        submitBtn.removeAttribute("disabled");
    }
}


// Validate each input 
function checkEditionForm() {
    const containerImg = document.querySelector(".container-img")

    inputImage.addEventListener("change", event => {
        console.log("inputImage", inputImage)
        console.log("typeof", typeof inputImage.value)
        const allowedFormats = ["image/jpeg", "image/jpg", "image/png"];
        if (inputImage.value.trim() === "") {
            displayEditionError("Vous devez sélectionner une image")
        } else {
            const selectedImage = event.target.files[0]
            if (selectedImage.size > 4 * 1024 * 1024) { /*à vérifier */
                displayEditionError("L'image ne doit pas excéder 4Mo")
            } else if (!allowedFormats.includes(selectedImage.type)) {
                displayEditionError("L'image doit être de type .jpg ou .png")
            } else {  /*valid picture */
                displayEditionError("")
                const imageUrl = URL.createObjectURL(selectedImage)
                console.log(imageUrl)
                containerImg.innerHTML = `<img src="${imageUrl}" alt="Image Preview">`   
            }
        }
        checkValidity()
    })

    inputTitle.addEventListener("change", () => {
        if (inputTitle.value.trim() === "") {
            displayEditionError("Vous devez indiquer attribuer un titre à votre travail")
        }
        checkValidity()
    })

    inputCategory.addEventListener("change", () => {
        if (inputCategory.value.trim() === "") {
            displayEditionError("Vous devez indiquer une catégorie")
        }
        checkValidity()
    })
}

// Validate and submit the form
function submitWork() {
    const addForm = document.getElementById("add-work")

    /*const workData = new FormData()*/
    /* Pour empêcher la modale de se dermer au clic sur submit
    editionModal.addEventListener('submit', (event) => event.stopPropagation());*/
    submitBtn.addEventListener("submit", async (e) => {
        e.preventDefault()
        if (submitBtn.hasAttribute("disabled")) {
            return
        } else {
            let workData = new FormData(addForm)
            console.log([...workData.entries()])
        }
    })
        /*addForm.addEventListener("submit", async (e) => {
            e.preventDefault()
            const response = await postWork(new FormData(addForm))   
            console.log(response)  
            const result = await response.json();
                /*const response = await postWork(workData)
                console.log(response)
                return response 
        })*/
    
}


// Add one work, refrsh the modal's gallery and portfolio
export function addWork() {
    checkEditionForm()
    submitWork()
    /* si la réponse est ok: faire un message de confirmation avec un settimeout, puis: 
    /* ajouter à la gallerie */
    /* ajouter au portfolio */
}



/**
 * fonction soumission du formulaire:
 * vérifier le formulaire (si la photo est ok et qu'elle existe, remplacer par la photo)
 * faire un ft pour afficher la photo ds la div si ok
 * modifier le bouton selon le statut
 * retour à la gallery avec maj des travaux ds la gallery de la modale
 */














