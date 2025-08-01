import { Schema } from 'mongoose'

export const plantSchema = new Schema({
    id: Number,
    commonName: String,
    scientificName: [String],
    image: {
    url: String,
    alt: String,
    },
})