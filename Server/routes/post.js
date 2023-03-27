const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const router = express.Router();


const Post = require('../models/post');

router.post('/' , isLoggedIn , async (req,res) => {
    console.log(req.body);
   const {name , category , price } = req.body ;
   if(!(name && category && price)) {
      return res.status(400).json({
        message: 'Fill all required fields'
      })
   }
   try {
      const newPost = await Post.create({
        name: name ,
        category: category ,
        price:parseInt(price) 
      })
      res.status(200).json({
        message: 'Suucess' ,
        newPost
      })
   } catch(err){
     res.status(400).json({
        message: 'Bad request'
     })
   }
})


router.get('/' , async (req,res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({
            posts
        })
    } catch(err) {
        res.status(400).json({
            message: 'Bad Request'
        })
    }
})


router.get('/:id' , isLoggedIn , async (req,res) => {
    const {id} = req.params ;
    try {
        const post = await Post.findOne({_id: id});
        if(!post) {
            res.status(400).json({
                message: 'No post is available for this ID'
            })
        } else {
            return res.status(200).json({
            post
        })
        }
        
    } catch(err) {
        res.status(400).json({
            message: 'Bad Request'
        })
    }
})


module.exports = router ;