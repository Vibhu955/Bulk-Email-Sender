const AppError = require('./app-error')
const { tokenVerify } = require('../utils/jwt')
const jwt = require('jsonwebtoken')

const authVerify = (req, res, next) => {
    const tokenCred = req.header('Authorization');
    if (!tokenCred) throw (new AppError(400, "Access denied. No token provided."));

    // console.log(tokenCred)
    try {
        const result = tokenVerify(tokenCred);
        res.locals.user = result;
        // console.log(result)
        next();
    } catch (err) {
        throw (new AppError(400, "Login/Signup First!"));

    };
}

module.exports = authVerify