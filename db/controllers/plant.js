import User from '../models/User'
import dbConnect from './util/connection'

export async function getAll(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    //return user.
}