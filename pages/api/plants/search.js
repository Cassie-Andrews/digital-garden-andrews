import sessionOptions from "../../../config/session";
import { getIronSession } from "iron-session";


// use this file to connect user's query with API to return search results

export default async function handler(req, res) {
    const session = await getIronSession(req, res, sessionOptions)

    if (!session.user) {
        return res.status(401).json({ message: "Please log in"})
    }

    const query = req.query.q || ""

    try {
        console.log("Query:", req.query.q)
        const response = await fetch(
            `https://perenual.com/api/v2/species-list?key=${process.env.PERENUAL_API_TOKEN}&q=${encodeURIComponent(query)}`)

        const data = await response.json()

        console.log("Status:", response.status)
        console.log("API response:", data)

        return res.status(200).json(data)
    } catch (error) {
        console.log("API Error: ", error)
        return res.status(500).json({ error: "API request failed" })
    }

}