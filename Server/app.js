// express config
const express = require('express');
const app = express();
// PORT variable
const PORT = process.env.PORT || 4000 ;
// db config
const connect = require('./db/connect');
// env config
require('dotenv').config()
// cors
const cors = require('cors');
app.use(cors({credentials: true , origin: 'http://localhost:3000'}));
// cookie parser
const cookieParser = require('cookie-parser')
app.use(cookieParser());



// Builtin middleware setup
app.use(express.urlencoded({extended: false}));
app.use(express.json());







// router configuration
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const postRouter = require('./routes/post');


app.use('/auth' , authRouter);
app.use('/admin' , adminRouter);
app.use('/post' , postRouter);






app.get('/' , (req,res) => {
    res.send('Hello');
})




connect()
.then(() => {
    app.listen(PORT , () => {
        console.log(`Server is up and running at ${PORT}`);
    } )
})
.catch(err => {
    console.log('Server is down');
})