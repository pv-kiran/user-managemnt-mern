import {configureStore} from '@reduxjs/toolkit';
import userReducer from './features/User/userSlice';
import authReducer from './features/Auth/authSlice';
import adminReducer from './features/Admin/adminSlice';


const store = configureStore({
    reducer: {
        user: userReducer ,
        auth: authReducer ,
        admin: adminReducer
    } , 
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})


export default store