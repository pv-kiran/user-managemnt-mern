const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const {isLoggedIn} = require('../middlewares/authMiddleware')
const User = require('../models/user');


router.post('/register' , async (req,res) => {
    const {fullName , email , password} = req.body;
    // console.log(fullName , email ,password);
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
            // const token = await jwt.sign(
            //     {user_id : user._id , email: email} ,
            //     process.env.SECRET_KEY ,
            //     {
            //         expiresIn: "2h"
            //     }
            // );
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

router.post('/login' ,async (req,res) => {
    const {email , password} = req.body ;
    if(!(email && password)) {
        return res.status(400).json({
            message: 'Please provide all required fields'
        })
    }
    try {
      const user = await User.find({email: email});
      if(user.length > 0) {
        const hashedPassword = user[0].password ;
        const isCorrectPassword = await bcrypt.compare(password , hashedPassword);
        if(isCorrectPassword) {

            const token = await jwt.sign(
                {user_id : user[0]._id , email: email} ,
                process.env.SECRET_KEY ,
                {
                    expiresIn: "2h"
                }
            );

            user[0].token = token ;
            user[0].password = undefined;
            
            // return res.status(201).json({
            //    message: 'Login Success' ,
            //    user: user[0]
            // })

            // working with cookies
            const options = {
                expires: new Date(
                    Date.now() + 3*24*60*60*1000
                ) ,
                httpOnly: true
            }

            return res.status(200).cookie('token' , token , options).json({
                success: true ,
                user: user[0]
            });


        } else {
            return res.status(400).json({
                message: 'Incorrect password'
            })
        }

      } else {
        return res.status(404).json({
            message: 'user not found'
        })
      }
    } catch(e) {
        console.log(e);
    }
})

router.get('/logout' , (req,res) => {
    res.cookie('token' , null , {
        expires: new Date(Date.now()) ,
        httpOnly: true
    })
    res.status(200).json({
        success: true ,
        message : 'Logout Success'
    })
})

router.get('/user' , isLoggedIn , async (req,res) => {
   console.log(req.userId);
   const user = await User.findOne({_id: req.userId});
   user.password = undefined ;
   console.log(user);
   res.status(200).json({
      user: user,
      message: 'Welcome to dashboard'
   })
})


module.exports = router ;