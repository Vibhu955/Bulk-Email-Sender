const { execute, getPool } = require('../../utils/db-connection.js')
const bcrypt = require('bcrypt');
const AppError = require('../../global-middleware/app-error.js');
const responseHandler = require('../../global-middleware/response-handler.js');
const { tokenGenerate } = require('../../utils/jwt');

let query2 = `Select u.id, u.role_id, uc.password from user_credentials uc join users u on uc.id=u.id where u.email=? `

const comparePass = async (password, hash) => {
    return bcrypt.compare(password, hash);
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
        const userData = await execute(query2, [email])
        // console.log(userData)
        if (!userData || !userData[0])
            throw (new AppError(404, "User Not Found!"));

        const ans = comparePass(password, userData[0].password)

        if (!ans)
            throw (new AppError(400, "Invalid Credentials"));

        const token = tokenGenerate(userData[0].id, email, userData[0].role_id)
        return responseHandler(200, token, "User Logged In", res)
   
}

module.exports = loginUser;
