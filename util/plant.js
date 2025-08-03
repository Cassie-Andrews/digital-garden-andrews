// SEARCH API
export async function searchPlants(query) {
    if (!query) return []

    try {
        const response = await fetch(
            `https://perenual.com/api/v2/species-list?key=${process.env.PERENUAL_API_TOKEN}&q=${encodeURIComponent(query)}`)
        
        const data = await response.json()

        console.log("Status:", response.status)
        console.log("API response:", data)
        return data?.data || []
    } catch (error) {
        console.error("API Error: ", error)
        return []
    }
}