const jwt = require('jsonwebtoken');
const User = require('../models/user');

const isLoggedIn = (req,res , next) => {
    // console.log(req.cookies)
    const authToken =  req.cookies.token || req.headers['authorization']?.replace('Bearer ' , '') ;
    // console.log(authToken);
    if(!authToken) {
        return res.status(400).json({
            message: 'Token is missing'
        })
    }
    try {

        const decoded = jwt.verify(authToken, process.env.SECRET_KEY);
        req.userId = decoded.user_id;
        next()

    } catch(e) {
        return res.status(400).json({
            message: 'Invalid Token'
        })
    }

}

const isAdmin = async (req , res , next) => {
    // console.log(req.userId);
    try {
        const user = await User.findOne({id: req.userId}) ;
        // console.log(user);
        // console.log(user?.role);
        next()

    } catch(e) {
        return res.status(400).json({
            message: 'You are not authorized to access this resource'
        })
    }

}

module.exports = {
    isLoggedIn ,
    isAdmin
}