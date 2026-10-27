const express = require('express');
const router = express.Router();

const authVerify = require('../global-middleware/authentication');
const csvUpload = require('../mails/middleware/csv-upload');
// const csvSchema = require('../mails/middleware/csv-validation-schema')
// const validateData = require('../global-middleware/schema-validation')


const createEmail = require('../mails/controller/create-mail');
// const sendMail = require('../mails/controller/send-mail');
// const scheduleMail = require('../mails/controller/schedule-mail');

router.post('/create', authVerify, csvUpload.single('file'), createEmail);

module.exports = router;
