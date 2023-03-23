const jwt = require('jsonwebtoken');

const isLoggedIn = (req,res , next) => {
    console.log(req.cookies)
    const authToken =  req.cookies.token || req.headers['authorization']?.replace('Bearer ' , '') ;
    console.log(authToken);
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


module.exports = {
    isLoggedIn
}