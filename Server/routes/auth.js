const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const User = require('../models/user');
const router = express.Router();


router.post('/register' , async (req,res) => {
    const {fullName , email , password} = req.body;
    if(!(fullName && email && password)) {
        return res.status(400).json({
            message: 'Please provide required fields'
        })
    }
    try {
        const existingUser =  await User.find({email: email});
        if(existingUser.length > 0) {
            return res.status(401).json({
                message: 'User already exists'
            })
        } else {

            const hashedPassword = await bcrypt.hash(password , 10);1
            const user = await User.create({
                fullName ,
                email ,
                password: hashedPassword 
            })
            const token = await jwt.sign(
                {user_id : user._id , email: email} ,
                process.env.SECRET_KEY ,
                {
                    expiresIn: "2h"
                }
            );
            // console.log(token);
            // user.token = token;
            // console.log(user);
            user.password = undefined;
            res.status(201).json({
                user: user ,
                message: 'User crearted'
            })

        }
        

    } catch(err) {
        console.log(err);
    }
})



module.exports = router ;