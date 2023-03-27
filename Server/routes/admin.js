const express = require('express');
const { isLoggedIn, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

const User = require('../models/user');

router.get('/dashboard' , isLoggedIn , isAdmin , async (req,res) => {
     try {
        const users = await User.find({});
        return res.status(200).json({
            users ,
            message: 'Users details'
        })
     } catch(err) {
        res.status(400).json({
            message: 'No users found'
        })
     }
})

router.put('/user/:id' , isLoggedIn , isAdmin ,async (req,res) => {
       const {id} = req.params ;
       console.log(id);
       const {user} = req.body
       try {
          const updatedUser = await User.findByIdAndUpdate(id , user , {
            new: true
          });
          res.status(200).json({
             user: updatedUser ,
             message: 'Update success'
          })
       } catch(err) {
          res.status(400).json({
            message: 'Bad Request'
          })
       }
})

router.post('/user/search' , isLoggedIn , isAdmin , async (req,res) => {
    console.log('Hello');
    const {search} = req.body ;
    console.log(search);
    console.log(req.body);
    try {
        const users = await User.find({$or: [{fullName: new RegExp(search, 'i')}, {email: new RegExp(search, 'i')}]});
        res.status(200).json({
           users
        })
    } catch(err) {
        res.status(400).json({
            message: 'Bad Request'
        })
    }
})




router.delete('/user/:id' , isLoggedIn , isAdmin , async (req,res) => {
    const {id} = req.params;
      try {
         const user = await User.findByIdAndDelete({_id:id});
         res.status(200).json({
            message: 'Delete Success'
         })


      } catch(err) {
        res.status(404).json({
            message: 'Bad Request'
        })
      }
})






module.exports = router ;