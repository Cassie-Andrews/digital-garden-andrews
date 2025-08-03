// route to handle searching plants and adding to collection

import sessionOptions from "../../config/session";
import { getIronSession } from "iron-session";
import User from "../../db/models/User";
import dbConnect from "../../db/controllers/util/connection";

export default async function handler(req, res) {
    const session = await getIronSession(req, res, sessionOptions)
    const user = session.user

    if (!user || !user.id) {
        return res.status(401).json({ message: "Please log in"})
    }

    await dbConnect()

    const dbUser = await User.findById(user.id)

    if (!dbUser) {
        return res.status(404).json({ message: "User not found"})
    }

    switch (req.method) {
    // SEARCH API
        case 'GET': {
        const query = req.query.q || ""
        
        if (!query) {
            return res.status(400).json({ error: "Missing search query" })
        }

        try {
            const response = await fetch(
                `https://perenual.com/api/v2/species-list?key=${process.env.PERENUAL_API_TOKEN}&q=${encodeURIComponent(query)}`)
            const data = await response.json()
    
            console.log("Status:", response.status)
            console.log("API response:", data)
    
            return res.status(200).json(data)
        } catch (error) {
            console.error("API Error: ", error)
            return res.status(500).json({ error: "API request failed" })
        }
    }

    // ADD plant to collection
        case 'POST': {
            const plant = req.body
            // check for plant
            if (!plant || !plant.plant_id) {
                return res.status(400).json({ message: "No plant data"})
            }
            // check if plant is already in collection
            const alreadySaved = dbUser.plantCollection.some((p) => p.plant_id === plant.plant_id)
            if (alreadySaved) {
                return res.status(400).json({ message: "This plant is already in your collection" })
            }
            
            // if not, add plant to collection
            dbUser.plantCollection.push(plant)
            await dbUser.save()

            return res.status(200).json({ message: "Plant has been added to your collection"})
        }


    // REMOVE plant from collection
        case 'DELETE': {
            const { plant_id, id } = req.body
            const targetId = plant_id || id
            
            if (!targetId) {
                return res.status(400).json({ message: "No plant data"})
            }

            dbUser.plantCollection = dbUser.plantCollection.filter((p) => p.plant_id !== targetId)
            await dbUser.save()

            return res.status(200).json({ message: "Plant removed"})
        }

        default: return res.status(405).json({ message: "Method not allowed" })
    }
}
