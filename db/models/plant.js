import { Schema } from 'mongoose'

const plantSchema = new Schema({
    commonName: String,
    scientificName: Array,
    image: Object,
})

export default plantSchema