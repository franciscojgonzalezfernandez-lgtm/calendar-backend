const express = require('express');
const User = require('../models/user');


//Post new user
const createUser  = async (req, res = express.response) => {

    try {
        const {name, email, password} = req.body;

    const user = new User({name, email, password});
    await user.save();

    res.status(201).json({
        ok: true,
        msg: "create",
        name,
        email,
        password
    })
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });
    }
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