/*
    Routes for user managements
    Host + /api/auth

*/


const express = require('express');
const Router = express.Router;
const { check } = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/field-validator');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();



router.post("/new",
    [
        check('name', 'name is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        check('password', 'Password should have min 6 characters').isLength({ min: 6 }),
        validateFields
    ],
    createUser);


//Login
router.post("/login",
    [
        check('email', 'email is mandatory').isEmail(),
        check('password', 'password should have a value').not().isEmpty(),
        validateFields
    ],
    login);

//Renew
router.get("/renew", validateJWT, renewToken);


module.exports = router; 