import { works, generateListWorks } from "./works.js";
import { generateDivCategory, filterByCategory } from "./categoryButtons.js";
import { login, loggedUser } from "./loginLogout.js";
import { generateEditionModal } from "./editionDialogs/editionModal.js";
import { addWork, trashWork } from "./editionDialogs/addDeleteWork.js";



generateListWorks(works)
generateDivCategory()
filterByCategory()

let token = window.sessionStorage.getItem('token')
if (token === null) {
    login()
} else {
    loggedUser()
}





/* 
generateEditionModal(works)

addWork() */




































