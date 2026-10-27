const Joi = require('joi')

const csvSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone_number: Joi.string().pattern(/^[0-9]{10}$/).required()
}); // store in DB validate against that , dynamic valdiation

module.exports = csvSchema;