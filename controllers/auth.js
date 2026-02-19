const express = require('express');


//Post new user
const createUser  = (req, res = express.response) => {


    const {name, email, password} = req.body;


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