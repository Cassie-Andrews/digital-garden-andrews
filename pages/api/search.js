// route to handle searching plants & displaying results
import sessionOptions from "../../config/session";
import { getIronSession } from "iron-session";
import User from "../../db/models/user";
import dbConnect from "../../db/controllers/util/connection";
import { normalizePlant } from "../../db/controllers/util/normalizePlant"; 

export default async function handler(req, res) {
    const session = await getIronSession(req, res, sessionOptions)

    const user = session.user

    if (!user || !user.id) {
        console.log("no user session found")
        return res.status(401).json({ message: "Please log in"})
    }

    console.log("user session was found")
    await dbConnect()

    const dbUser = await User.findById(user.id)

    if (!dbUser) {
        return res.status(404).json({ message: "User not found"})
    }

    // ONLY NEED 'GET' HERE NOW
    if (req.method !== 'GET') {
        return res.status(405).json({ message: "Method not allowed" })
    }

    // SEARCH API - basic info only
        const { q } = req.query;
        
        if (!q) {
            return res.status(400).json({ error: "Missing search query" })
        }

        // use this URL for general plant info - display for search results and plant collection page (?)
        try {
            const response = await fetch(
                `https://perenual.com/api/v2/species-list?key=${process.env.PERENUAL_API_TOKEN}&q=${encodeURIComponent(q)}&limit=5`)
            const data = await response.json()
    
            console.log("Status:", response.status)

            return res.status(200).json(data)
        } catch (error) {
            console.error("API Error: ", error)
            return res.status(500).json({ error: "API request failed" })
        }
}
