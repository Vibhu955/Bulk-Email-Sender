const AppError = require('./app-error')
const validateData = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body);
        if (error)
            throw (new AppError(400, error.details[0].message))
        next()

    }
}

module.exports = validateData;