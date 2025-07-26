import User from '../models/user'
import { normalizeId, dbConnect } from './util'

export async function getAll(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.currentPlants.map(plant => normalizeId(plant))
}

export async function getByPlantId(userId, plantId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    const plant = user.currentPlants.find(plant => plant.plantId === plantId)
    if (plant) return normalizeId(plant)
    return null
}

export async function add(userId, plantId) {
    await dbConnect()
    const user = await User.findByIdAndUpdate(
        userId,
        // $addToSet MongoDB update operator to check for match then add
        { $addToSet: { currentPlants: { _id: plantId } } },
        { new: true }
    )
}

export async function remove(userId, plantId) {
    await dbConnect()
    const user = await User.findByIdAndUpdate(
        userId,
        // $pull is a MongoDB update operator to check for match then pull
        { $pull: { currentPlants: { _id: plantId } } },
        { new: true }
    )
}