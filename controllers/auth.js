const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');


//Post new user
const createUser  = async (req, res = express.response) => {

    try {
        const {name, email, password} = req.body;

        const findedUser = await User.findOne({email});

        if(findedUser){
            return res.status(400).json({
                ok: false,
                msg: "User already exists with that email"
            })
        } 

        const user = new User({name, email, password});

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();

        res.status(201).json({
            ok: true,
            msg: "User created successfully",
            uid: user.id,
            name: user.name,
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