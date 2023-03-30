const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const router = express.Router();

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dk81bsiz2',
    api_key:"334739518657796",
    api_secret:"9OxvjE_0mewIx-NNfeLVKd8U_C0"
})


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
      let result ;
      
      if(req.files) {
    
          result = await cloudinary.uploader.upload(req.files.image.tempFilePath , {folder: 'Users'});
          console.log(result.secure_url);

      }
      

      const newPost = await Post.create({
        name: name ,
        category: category ,
        price:parseInt(price) ,
        image:result?.secure_url
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


router.get('/:id' , async (req,res) => {
    const {id} = req.params ;
    try {
        const posts = await Post.find({_id: id});
        if(!posts) {
            res.status(400).json({
                message: 'No post is available for this ID'
            })
        } else {
            return res.status(200).json({
            posts
        })
        }
        
    } catch(err) {
        res.status(400).json({
            message: 'Bad Request'
        })
    }
})


module.exports = router ;