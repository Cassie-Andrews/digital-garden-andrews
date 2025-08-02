import User from '../models/User'
import dbConnect from './util/connection'

export async function getAll(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.plantCollection.map(plant => plant)
}

export async function getByPlantId(userId, plantId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    const plant = user.plantCollection.find(plant => plant.plantId === plantId)
    if (plant) return
    return null
}


