const Joi = require('joi');

const createTemplateSchema = Joi.object({
    name: Joi.string().required().min(3),
    body: Joi.string().required()
})
const updateTemplateSchema = Joi.object({
    name: Joi.string().min(3),
    body: Joi.string()
})

module.exports = { createTemplateSchema, updateTemplateSchema };
