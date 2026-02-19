const express = require('express');
const {validationResult} = require('express-validator');


//Post new user
const createUser  = (req, res = express.response) => {


    const {name, email, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        msg: "create",
        name,
        email,
        password
    })
}


//Post login
const login = (req, res = express.response) => {
    const {email, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(201).json({
        ok: true,
        email,
        password
    })
}

//Get token
const renewToken = (req, res = express.response) => {
    res.json({
        ok: true
    })
}




module.exports = {
    createUser,
    login,
    renewToken
}