const express = require('express');


//Post new user
const createUser  = (req, res = express.response) => {
    console.log("a ver el body?");
    console.log(req.body);

    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            ok: false,
            msg: "Everything has to be defined"
        })
    }

    res.json({
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
    res.json({
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