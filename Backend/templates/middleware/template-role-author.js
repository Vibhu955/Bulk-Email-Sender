const AppError = require('../../global-middleware/app-error.js')
// const { execute, getPool } = require('../../utils/jwt.js')

// let query1 = 'Select rid from org_users_role where uid=? and o_id =? and is_active=1';

const authorizeAdminRole = (...allowedRoles) => {

    return async (req, res, next) => {
        try {
            let roleId = res.locals.user.role;
            // const val1 = [req.params.id, oid];
            // console.log(res.locals.user)
            // const dataOrg = await execute(query1, val1)
            // console.log(dataOrg, dataOrg[0])
            // console.log(dataOrg[0])

            if (!res.locals.user || !allowedRoles.includes(roleId)) {
                throw (new AppError(400, "Access Denied"))
            }
            next()
        }
        catch (err) {
            console.log(err)
            throw (new AppError(400, "Invalid Author"));
        }
    }
}
module.exports = authorizeAdminRole;

