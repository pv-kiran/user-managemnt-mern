// express config
const express = require('express');
const app = express();
// PORT variable
const PORT = process.env.PORT || 4000 ;
// db config
const connect = require('./db/connect');
// env config
require('dotenv').config()


// Builtin middleware setup
app.use(express.urlencoded({extended: false}));
app.use(express.json());





// router configuration
const authRouter = require('./routes/auth');


app.use('/auth' , authRouter);






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