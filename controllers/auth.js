const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');


//Post new user
const createUser = async (req, res = express.response) => {

    try {
        const { name, email, password } = req.body;

        const findedUser = await User.findOne({ email });

        if (findedUser) {
            return res.status(400).json({
                ok: false,
                msg: "User already exists with that email"
            })
        }

        const user = new User({ name, email, password });

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate JWT
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            msg: "User created successfully",
            uid: user.id,
            name: user.name,
            token,
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
const login = async (req, res = express.response) => {
    const { email, password } = req.body;
    try {

        const findedUser = await User.findOne({ email });

        if (!findedUser) {
            return res.status(400).json({
                ok: false,
                msg: "User doesn't exists with that email"
            })
        }

        const validPassword = bcrypt.compareSync(password, findedUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Invalid password"
            })
        }

        //Generate JWT
        const token = await generateJWT(findedUser.id, findedUser.name);

        res.status(201).json({
            ok: true,
            uid: findedUser.id,
            name: findedUser.name,
            token
        })
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({
            ok: false,
            msg: 'Error logging in'
        });
    }
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