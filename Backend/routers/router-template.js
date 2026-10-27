const express = require('express');
const router = express.Router();


const { createTemplateSchema, updateTemplateSchema } = require('../templates/validation/template-validation-schema')

const validateData = require('../global-middleware/schema-validation')
const authVerify = require('../global-middleware/authentication');
const authorizeAdminRole = require('../templates/middleware/template-role-author');

// const addUsers = require('../organizations/controller/add-users-org');

const createTemplate = require('../templates/controller/create-template');
const deleteTemplate = require('../templates/controller/delete-template');
const updateTemplate = require('../templates/controller/update-template');
const { getAllTemplates, getOneTemplate } = require('../templates/controller/get-template');

router.post('/create', validateData(createTemplateSchema), authVerify, authorizeAdminRole(1), createTemplate) // anybody can create
// router.post('/:oid/adduser', authVerify, authorizeRoles, addUsers) // only owners can add
router.put('/update/:id', validateData(updateTemplateSchema), authVerify, authorizeAdminRole(1), updateTemplate)
router.get('/', authVerify, getAllTemplates)
router.get('/:id', authVerify, getOneTemplate)

router.delete('/delete/:id', authVerify, authorizeAdminRole(1), deleteTemplate);

module.exports = router;
//orgrouter
