const  mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    name: {
        type: String
    } ,
    category: {
        type: String
    } ,
    price : {
        type: Number
    }
})

module.exports = mongoose.model('Post' , postSchema);