import { getCategories } from "./api.js";

export let categories = await getCategories()

// Generate one button per category
function generateButtonCategory(categoryId) {
    const divFilters = document.querySelector(".filters")
    const buttonElement = document.createElement("button")
    buttonElement.classList.add("btn-filter")
    buttonElement.dataset.filter = categoryId
    const matchingCategory = categories.find(category => categoryId === category.id)
    buttonElement.innerText = matchingCategory.name
    divFilters.appendChild(buttonElement)
}

// Generate all category buttons
export function generateDivCategory() {
    const listCategoryId = categories.map(category => category.id)
    listCategoryId.forEach(categoryId => {
        generateButtonCategory(categoryId)
})}

// Filter works by category
export function filterByCategory() {
    const listButtonFilters = document.querySelectorAll(".filters button")
    listButtonFilters.forEach(button => {
        button.addEventListener("click", event => { /* pourqoi pas event.target */
        console.log("event target", event.target)
        console.log("event current target", event.currentTarget.target)

            event.currentTarget.parentElement.querySelector(".active").classList.remove("active")
            event.currentTarget.classList.add("active")
            const filter = event.currentTarget.getAttribute("data-filter") /*categoryId */
            const figures = document.querySelectorAll(".gallery figure")
            for (let figure of figures) {
                if (filter !== figure.dataset.categoryid && filter !== "All") {
                    figure.classList.add("hide")
                    figure.classList.remove("show")
                } else {
                    figure.classList.remove("hide")
                    figure.classList.add("show")
                }
            }
        })
    })
}




