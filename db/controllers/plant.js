import User from '../models/user'
import dbConnect from './util/connection'
import { normalizePlant } from './util/normalizePlant'

export async function getAll(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return []

    return user.plantCollection.map(normalizePlant)
}

export async function getByPlantId(userId, plantId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null

    const plant = user.plantCollection.find((plant) => String(plant.plant_id) === String(plantId))
    return plant ? normalizePlant(plant) : null
}

export async function getCollection(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.plantCollection.map(normalizePlant) || []
}