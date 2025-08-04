import User from '../models/User'
import dbConnect from './util/connection'

export async function getAll(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null


    const cleanedCollection = user.plantCollection.map(plant => {
        return {
        ...plant,
        _id: plant._id.toString(),
        }   
    })
    return cleanedCollection
}

export async function getByPlantId(userId, plantId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null

    const plant = user.plantCollection.find((plant) => plant.plant_Id === plantId)
    if (plant) return {
        ...plant,
        _id: plant._id.toString(),
    }
}

export async function getCollection(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.plantCollection || []
}