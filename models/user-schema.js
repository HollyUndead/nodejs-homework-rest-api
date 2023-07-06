const { default: mongoose } = require("mongoose");
const emailRegexp = require("../constans/usres");
const { handleMongooseError } = require("../middlewares");
const {Schema, model} = mongoose

const userSchema =  new Schema({
    password: {
      type: String,
      required: [true, 'Set password for user'],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter"
    },
    token: String
  })

  // userSchema.post('save', handleMongooseError)

  const User = model('users', userSchema)

  module.exports = User;