const Joi = require('joi')

const schema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email({minDomainSegments: 2}),
    phone: Joi.string().regex(/\(\d{3}\) \d{3}-\d{4}$/)
})

module.exports = schema;