const { execute, getPool } = require('../../utils/db-connection.js')
const AppError = require('../../global-middleware/app-error.js')
const responseHandler = require('../../global-middleware/response-handler.js');
// const { getOneTemplate } = require('./get-template.js');

const requestParam = (body) => {
    const keys = Object.keys(body);
    const stringKeys = keys.map(e => `${e} = ?`).join(', ');
    const values = Object.values(body)
    return [stringKeys, values]
}

const queryFunction = (keys) => {
    return `Update templates set ${keys} where id =? `
}

const updateTemplate = async (req, res) => {
    const body = req.body;
    if (!body || Object.keys(body).length === 0)
        throw (new AppError(400, "User Should Provide either Name or Body of the Template!!"))

    body.updated_by = res.locals.user.id;
    const [keys, values] = requestParam(body)

    const data = await execute(queryFunction(keys), [...values, req.params.id])
    console.log(data)
    // return await getOneTemplate(req, res)
    if (!data.affectedRows)
        throw (new AppError(400, "Template doesn't Exist"));

    return responseHandler(200, data, "Template Updated Successfully!", res)

}

module.exports = updateTemplate;