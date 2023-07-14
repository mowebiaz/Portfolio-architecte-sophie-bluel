// Contains interactions with API

// To recover a list of all works
export async function fetchWorks() {
    const response = await fetch("http://localhost:5678/api/works")
    const result = await response.json()
    return result
}



















