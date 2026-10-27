const express = require('express');
const router = express.Router();

const signupUser = require('../users/controller/signup')
const loginUser = require('../users/controller/login');

const { signupSchema, loginSchema } = require('../users/validation/user-validation-schema')

const validateData = require('../global-middleware/schema-validation');
const authVerify = require('../global-middleware/authentication');
const { getAllUsers, getOneUser, getProfile } = require('../users/controller/get-user');

router.post('/signup', validateData(signupSchema), signupUser);
router.post('/login', validateData(loginSchema), loginUser);
router.get('/', authVerify, getAllUsers)
// router.post('/:id', authVerify, getOneUser)
router.get("/profile", authVerify, getProfile);
module.exports = router;
