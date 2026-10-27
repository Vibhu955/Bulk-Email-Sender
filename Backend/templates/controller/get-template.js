const { execute, getPool } = require('../../utils/db-connection.js')
const AppError = require('../../global-middleware/app-error.js')
const responseHandler = require('../../global-middleware/response-handler.js')

let queryGetOne = 'Select id,name,body,created_by, created_at from templates where id = ?'
let queryGetAll = `Select id,name,body from templates`


const getAllTemplates = async (req, res, next) => {
    const templates = await execute(queryGetAll);
    if (templates.length == 0)
        throw (new AppError(400, "No Templates Found!"));
    return responseHandler(200, templates, "Templates Fetched Successfully ", res)
}

const getOneTemplate = async (req, res, next) => {

    const template = await execute(queryGetOne, [req.params.id]);
    if (template[0])
        responseHandler(200, template, "Template fetched Successfully!", res)

    else
        throw (new AppError(400, "Template Not Found"));

}

module.exports = { getAllTemplates, getOneTemplate }