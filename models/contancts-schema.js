const mongoose = require('mongoose')
const { handleMongooseError } = require('../middlewares')
const {Schema, model} = mongoose

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
})

contactSchema.post('save', handleMongooseError)

const Contacts = model('contacts', contactSchema)

module.exports = Contacts;