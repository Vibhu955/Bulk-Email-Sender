const jwt = require('jsonwebtoken')
const AppError = require('../global-middleware/app-error')
const tokenGenerate = (id, email, role) => {

    const token = jwt.sign({ id: id, email: email, role: role }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN
    })
    return token
}

const tokenVerify = (tokenCred) => {
    const token = tokenCred.startsWith('Bearer ') ? tokenCred.split(' ')[1] : (new AppError(400, "Invalid Token Entered"));
    return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = { tokenGenerate, tokenVerify }
