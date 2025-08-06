import { Schema } from 'mongoose'

export const plantSchema = new Schema({
    plant_id: String,
    common_name: String,
    scientific_name: [String],
    imageUrl: String,
    family: String,
    genus: String
})