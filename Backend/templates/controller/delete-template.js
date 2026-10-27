const { execute, getPool } = require('../../utils/db-connection.js')
const AppError = require('../../global-middleware/app-error.js')
const responseHandler = require('../../global-middleware/response-handler.js')

let deleteQuery = `Delete from Templates where id=?` //only if the logged-in user is the creator.
// let query2 = `Update org_users_role SET is_active=0 where oid=? and created_by=?`


const deleteTemplate = async (req, res) => {

    const templateId = req.params.id
    const affectedData = await execute(deleteQuery, [templateId])

    if (affectedData.affectedRows)
        await responseHandler(200, affectedData, "Template is deleted SuccessFully", res)
    else
        throw (new AppError(400, "Template doesn't Exist"));

}

module.exports = deleteTemplate; 
