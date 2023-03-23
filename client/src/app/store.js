import {configureStore} from '@reduxjs/toolkit';
import registerReducer from '../app/features/User/registerSlice';

// const configureStore = require('@reduxjs/toolkit').configureStore;
// const cakeReducer = require('../feautures/cake/cakeSlice');


// const icecreamReducer = require('../feautures/icecream/icecreamSlice');

// const userReducer = require('../feautures/user/userSlice')


// const reduxLogger = require('redux-logger');
// // const { getDefaultMiddleware } = require('@reduxjs/toolkit');

// const logger = reduxLogger.createLogger();


const store = configureStore({
    reducer: {
        register: registerReducer
    } , 
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})


export default store