const {Schema, model} = require('mongoose')

const contactSchema = new Schema({
    surname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    town: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    box: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    comment1: {
        type: String,
        required: false
    },
    comment2: {
        type: String,
        required: false
    }
})

module.exports = model('Contact', contactSchema)