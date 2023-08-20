import { works } from "./works.js";


// Generate one button per category in the DOM
function generateButtonCategory(category) {
    const divFilters = document.querySelector(".filters")
    const buttonElement = document.createElement("button")
    buttonElement.classList.add("btn-filter")
    buttonElement.dataset.filter = category
    buttonElement.innerText = category
    divFilters.appendChild(buttonElement)
}

// Create a list of categories without duplicates
const categories = works.map(work => work.category.name)
const singleCategories = [...new Set(categories)]

// Add one button per category
export function generateDivCategory() {
    singleCategories.forEach(category => {
        generateButtonCategory(category)
})}

// 
export function filterByCategory() {
    const listButtonFilters = document.querySelectorAll(".filters button")
    listButtonFilters.forEach(button => {
        button.addEventListener("click", event => {
            event.currentTarget.parentElement.querySelector(".active").classList.remove("active")
            event.currentTarget.classList.add("active")
            const filter = event.currentTarget.getAttribute("data-filter")
            const figures = document.querySelectorAll(".gallery figure")
            for (let figure of figures) {
                if (filter !== figure.dataset.category && filter !== "All") {
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




