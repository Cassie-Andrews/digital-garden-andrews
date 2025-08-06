import User from '../models/User'
import dbConnect from './util/connection'
import { normalizePlant } from './util/normalizePlant'

export async function getAll(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return []

    return user.plantCollection.map((plant) => normalizePlant(plant))
}

export async function getByPlantId(userId, plantId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null

    const plant = user.plantCollection.find((plant) => plant.plant_Id === plantId)
    if (plant) return normalizePlant(plant)
    return null
}

export async function getCollection(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.plantCollection.map(normalizePlant) || []
}