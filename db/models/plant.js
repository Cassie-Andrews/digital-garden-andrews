import { Schema } from 'mongoose'

export const plantSchema = new Schema({
    plant_id: String,
    common_name: String,
    scientific_name: [String],
    imageUrl: String,
    family: String,
    genus: String,

    order: String,
    edible: { type: Boolean, default: false },
    poisonous: { type: Boolean, default: false },
    cycle: String,
    watering: String,
    sunlight: String,
    indoor: { type: Boolean, default: false },
    hardiness: String,
})