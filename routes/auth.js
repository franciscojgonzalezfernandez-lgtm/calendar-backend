/*
    Routes for user managements
    Host + /api/auth

*/

const express = require('express');
const Router = express.Router;
const { createUser, login, renewToken } = require('../controllers/auth');

const router = Router();



router.post("/new", createUser);


//Login
router.post("/", login);

//Renew
router.get("/renew", renewToken);


module.exports = router; 