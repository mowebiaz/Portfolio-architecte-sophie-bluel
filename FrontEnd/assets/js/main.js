import { works, generateAllWorks } from "./works.js";
import { generateDivCategory, filterByCategory } from "./categoryButtons.js";
import { login, loggedUser } from "./loginLogout.js";
import { openEditionModal, closeEditionModal } from "./editionModal.js";

/* const addForm = document.getElementById("add-work")
 */

generateAllWorks(works)
generateDivCategory()
filterByCategory()

let token = window.sessionStorage.getItem('token')
if (token === null) {
    login()
} else {
    loggedUser()
}

openEditionModal(works)
closeEditionModal()






























