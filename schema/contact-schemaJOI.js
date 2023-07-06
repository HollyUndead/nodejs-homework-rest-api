const Joi = require('joi')

const contactSchemaJoi = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({minDomainSegments: 2}),
    phone: Joi.string().regex(/\(\d{3}\) \d{3}-\d{4}$/)
})

const userSchemaJoi = Joi.object().keys({
    email: Joi.string().email({minDomainSegments: 2}).required(),
    password: Joi.string().min(5).alphanum().required()
})

module.exports = {
    contactSchemaJoi, 
    userSchemaJoi
};