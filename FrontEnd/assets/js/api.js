// Contains interactions with API

export async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works")
    const result = await response.json()
    return result
}

export async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories")
    const result = await response.json()
    return result
}

export async function postUser(user) {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        body: JSON.stringify(user),
        headers: {"Content-Type": "application/json"}
    })
    return response
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
        console.log("Error adding work:", error)
    }

}

export async function deleteWork(workId) { /* à revoir */
    let token = window.sessionStorage.getItem('token') /* avant ou après le try ? */
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



























