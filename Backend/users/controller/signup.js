const { execute, getPool } = require('../../utils/db-connection.js')
const bcrypt = require('bcrypt');
const AppError = require('../../global-middleware/app-error.js');
const responseHandler = require('../../global-middleware/response-handler.js');

let insertQuery = `Insert into users (name, email, phone_number, role_id) VALUES (?, ?, ?, ?)`
let credentialQuery = `Insert into user_credentials (id, password) values (?, ?)`

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT))
    return await bcrypt.hash(password, salt);
}

const signupUser = async (req, res) => {
    const { password, ...allowedData } = req.body;
    const connection = await getPool().getConnection();
    console.log(allowedData)

    try {

        const hash = await hashPassword(password);
        const userValue = [...Object.values(allowedData), 2];
        await connection.beginTransaction();

        const dataUser = await execute(insertQuery, userValue)
        const userId = dataUser.insertId; // as id is auto incremented
    
        const credentials = [userId, hash];

        const dataCred = await execute(credentialQuery, credentials)
        await connection.commit();

        console.log(dataUser, dataCred)
        return await responseHandler(200, dataUser, "User Signed Up", res)
    }
    catch (err) {
        await connection.rollback();
        // console.log(err)
        throw (new AppError(400, "User can't be signed in!"));
    }
}

module.exports = signupUser;
