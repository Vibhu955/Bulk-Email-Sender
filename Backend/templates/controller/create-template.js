const { execute, getPool } = require('../../utils/db-connection.js')
const AppError = require('../../global-middleware/app-error.js')
const responeHandler = require('../../global-middleware/response-handler.js')

let insertQuery = `Insert into templates (name, body, created_by) VALUES ( ?, ?, ?)`

const createTemplate = async (req, res) => {
    const { name, body } = req.body;
    // const connection = await getPool().getConnection();
    try {
        // console.log(res.locals)
        const queryParam = [name, body, res.locals.user.id]; //createOrgQuery

        // await connection.beginTransaction();
        const dataTemplate = await execute(insertQuery, queryParam)
        // await connection.commit();

        console.log(dataTemplate)
        return await responeHandler(200, dataTemplate, "Template Created Successfully!", res)
    }
    catch (err) {
        // await connection.rollback();
        console.log(err)
        throw (new AppError(400, err.sqlMessage));
    }
}

module.exports = createTemplate;
