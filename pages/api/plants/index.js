// route to handle adding plant to collection

import sessionOptions from "../../../config/session";
import { getIronSession } from "iron-session";
import User from "../../../db/models/User";
import dbConnect from "../../../db/controllers/util/connection";

export default async function handler(req, res) {
    const session = await getIronSession(req, res, sessionOptions)

    if (!session.user) {
        return res.status(401).json({ message: "Please log in"})
    }

    await dbConnect()
    const user = await User.findById(session.user.id)

    if (!user) {
        return res.status(404).json({ message: "User not found"})
    }
    // handle adding a plant to collection
    if (req.method === 'POST') {
        const plant = req.body

        // check if plan is already in collection
        const alreadySaved = user.plantCollection.some(p => p.plant_id === plant.plant_id)
        if (alreadySaved) {
            return res.status(400).json({ message: "This plant is already in your collection" })
        }

        // if not, add plant to collection
        user.plantCollection.push(plant)
        await user.save()
        return res.status(200).json({ message: "Plant has been added to your collection"})
    }
    // handle removing a plant from collection
    if (req.method === 'DELETE') {
        const { plant_id } = req.body
        user.plantCollection = user.plantCollection.filter(p => p.plant_id !== plant_id)
        await user.save()
        return res.status(200).json({ message: "Plant removed"})
    }

    res.status(405).end()
}