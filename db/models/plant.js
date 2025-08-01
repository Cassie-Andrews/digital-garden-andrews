import { Schema } from 'mongoose'

const plantSchema = new Schema({
    id: Number,
    commonName: String,
    scientificName: Array,
    image: Object,
})

export default plantSchema