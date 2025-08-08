// route to post and delete plants from collection
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
    
    switch (req.method) {
        // ADD plant to collection
        case 'POST': {
            const rawPlant = req.body
            // final format for saved plant
            const plantToSave = normalizePlant(rawPlant)
            
            // check for plant
            if (!rawPlant || !(rawPlant.plant_id || rawPlant.id)) {
                return res.status(400).json({ message: "No plant data"})
            }
            
            // check if plant is already in collection
            const alreadySaved = dbUser.plantCollection.some((p) => p.plant_id === plantToSave.plant_id)
            
            if (alreadySaved) {
                return res.status(400).json({ message: "This plant is already in your collection" })
            }
            
            // if not, add plant to collection
            dbUser.plantCollection.push(plantToSave)
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