const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const {isLoggedIn} = require('../middlewares/authMiddleware')
const User = require('../models/user');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dk81bsiz2',
    api_key:"334739518657796",
    api_secret:"9OxvjE_0mewIx-NNfeLVKd8U_C0"
})



router.post('/register' , async (req,res) => {
    const {fullName , email , password} = req.body;
    console.log(req.files);
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

            const hashedPassword = await bcrypt.hash(password , 10);

            let result ;
            if(req.files) {
    
                 result = await cloudinary.uploader.upload(req.files.profilePic.tempFilePath , {folder: 'Users'});
                 console.log(result.secure_url);

            }

            const user = await User.create({
                fullName ,
                email ,
                password: hashedPassword ,
                profileImage: result?.secure_url
            })
            console.log(user);
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

router.patch('/user/:id' , async (req,res) => {
       const {id} = req.params ;
       console.log(id);
       console.log(req.files);
       try {
            const user = await User.find({_id: id});
            console.log(user);

            if(req.files) {
    
                 result = await cloudinary.uploader.upload(req.files.profilePic.tempFilePath , {folder: 'Users'});
                 console.log(result.secure_url);

            }

            user[0].profileImage = result.secure_url;
            await user[0].save()

            console.log(user[0]);

            res.status(200).json({
               message: 'Update success' ,
               user
            }) 


       } catch(err) {
          console.log(err);
       }       

    //    const {user} = req.body
    //    console.log(user);
    //    try {
    //       const updatedUser = await User.findByIdAndUpdate(id , user , {
    //         new: true
    //       });
    //       res.status(200).json({
    //          user: updatedUser ,
    //          message: 'Update success'
    //       })
    //    } catch(err) {
    //       res.status(400).json({
    //         message: 'Bad Request'
    //       })
    //    }
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




module.exports = router ;