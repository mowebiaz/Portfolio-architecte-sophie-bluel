import { works, generateAllWorks } from "./works.js";
import { generateDivCategory, filterByCategory } from "./categoryButtons.js";
import { login, loggedUser } from "./loginLogout.js";
import { openEditionModal, closeModals, openEditionForm, addWork, checkEditionForm } from "./editionModal.js";
import { displayEditionError } from "./dom.js";
import { postWork } from "./api.js";

const modalContent = document.querySelector("#modal-edition .modal-content")

generateAllWorks(works)
generateDivCategory()
filterByCategory()

let token = window.sessionStorage.getItem('token')
if (token === null) {
    login()
} else {
    loggedUser()
}

modalContent.addEventListener("click", function(event) {
    if (event.target && event.target.id === "add-photo") {
        event.target.addEventListener("click", openEditionForm(works))
    }})
    
    
    
closeModals()























