const { execute, getPool } = require('../../utils/db-connection.js')
const AppError = require('../../global-middleware/app-error.js')
const responseHandler = require('../../global-middleware/response-handler.js')

let queryGetOne = 'Select id,name,email,created_at,created_by from users where id = ?'
let queryGetAll = `Select u.id,u.name,u.email,r.name as role_name,created_at from users u join roles r on u.role_id=r.id`

const getAllUsers = async (req, res, next) => {
    const users = await execute(queryGetAll);
    if (users.length == 0)
        throw (new AppError(400, "Can't fetch Users!"));

    return responseHandler(200, users, "Users fetched Successfully!", res)
}


const getOneUser = async (req, res, next) => {

    const users = await execute(queryGetOne, [req.params.id]);
    if (users.length == 0)

        throw (new AppError(400, "User doesn't exist"));

    return responseHandler(200, users, "User fetched", res)

}

const getProfile = async (req, res) => {

    return res.json({
        user: res.locals.user
    });
    // return responseHandler(200, users, "User fetched", res)

}



module.exports = { getAllUsers, getOneUser, getProfile }