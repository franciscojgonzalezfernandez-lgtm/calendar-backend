/*
    Routes for user managements
    Host + /api/auth

*/


const express = require('express');
const Router = express.Router;
const {check} = require('express-validator');
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();



router.post("/new",
    [
        check('name', 'name is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').isEmail(),
        check('password', 'password should be stronger').isStrongPassword(),
    ],
    createUser);


//Login
router.post("/login", 
    [
        check('email', 'email is mandatory').isEmail(),
        check('password', 'password should have a value').not().isEmpty(),
    ],
    login);

//Renew
router.get("/renew", renewToken);


module.exports = router; 