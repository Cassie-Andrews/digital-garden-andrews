// get plants -- API search by user query
export async function searchPlants(query) {
    const response = await fetch(`https://perenual.com/api/v2/species-list?key=${API_TOKEN}&q=${query}`)
    if (response.status !== 200)
        return null
    const data = await response.json()
    return data.results
}