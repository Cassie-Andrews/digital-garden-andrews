// route to display detailed info for 1 plant at a time
import sessionOptions from "../../config/session";
import { getIronSession } from "iron-session";
import User from "../../db/models/user";
import dbConnect from "../../db/controllers/util/connection";


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

    // SEARCH API - detailed info
    const { id } = req.query

    if (!id) {
        return res.status(400).json({ message: "Plant ID not found" })
    }

    try {
        const response = await fetch(
            `https://perenual.com/api/v2/species/details/${id}?key=${process.env.PERENUAL_API_TOKEN}`
        );
        const data = await response.json()
    
        console.log("Status:", response.status)
        return res.status(200).json(data)
    } catch (error) {
        console.error("API Error: ", error)
        return res.status(500).json({ error: "API request failed" })
    }
}

/*   
    const {
        order,
        edible,
        poisonous,
        cycle,
        watering,
        sunlight,
        indoor,
        hardiness,
    } = req.query;
    
    
    
    if (order) params.append("order", order);
    if (edible) params.append("edible", edible);
    if (poisonous) params.append("page", page);
    if (cycle) params.append("cycle", cycle);
    if (watering) params.append("watering", watering);
    if (sunlight) params.append("sunlight", sunlight);
    if (indoor) params.append("indoor", indoor);
    if (hardiness) params.append("hardiness", hardiness);
    */