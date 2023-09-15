//--------------------------------------------------------------------------------
// Contains interactions with API
//--------------------------------------------------------------------------------

export async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        const result = await response.json()
        return result
    } catch (error) {
        console.error("Error in works recovery:", error)
    }
}

export async function getCategories() {
    try {        
        const response = await fetch("http://localhost:5678/api/categories")
        const result = await response.json()
        return result
    } catch (error) {
        console.error("error in categories recovery:", error)
    }
}

export async function postUser(user) {
    try {        
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST", 
            body: JSON.stringify(user),
            headers: {"Content-Type": "application/json"}
        })
        return response
    } catch (error) {
        console.error("user not found:", error)
    }
}

export async function postWork(data) {
    let token = window.sessionStorage.getItem('token')
    try {
        const response = await fetch("http://localhost:5678/api/works", {
        method: "POST", 
        body: data,
        headers: {Authorization: `Bearer ${token}`}
        })
        return response
    } catch (error) {
        console.error("Error adding work:", error)
    }

}

export async function deleteWork(workId) { 
    let token = window.sessionStorage.getItem('token') 
    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
        headers: {Authorization: `Bearer ${token}`}
        })
        return response
    } catch (error) {
        console.error("Error deleting work:", error)
    }
}



























