const mongoose = require('mongoose')
const {handleMongooseError} = require('../helpers/index')
const {Schema, model} = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      favorite: {
        type: Boolean,
        default: false,
      },
})

const Contacts = model('contacts', contactSchema)

module.exports = Contacts;