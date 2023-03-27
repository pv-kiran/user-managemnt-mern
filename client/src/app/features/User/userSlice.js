import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


axios.defaults.withCredentials = true;


const initialState = {
  loading: false,
  success: false ,
  user: {} ,
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const registerUser = createAsyncThunk('user/registerUser', async (user) => {
  console.log(user);
  return await axios
    .post('http://localhost:4000/auth/register' , user)
    .then(response => response.data)
})

export const logginUser = createAsyncThunk('user/logginUser', async (user) => {
  // console.log(user);
  return await axios
    .post('http://localhost:4000/auth/login' , user)
    .then(response => response.data)
})

export const logoutUser = createAsyncThunk('user/logoutUser', async (user) => {
  // console.log(user);
  return await axios
    .get('http://localhost:4000/auth/logout' , user)
    .then(response => response.data)
})

export const getUser = createAsyncThunk('user/getUser', async () => {
  console.log('Get User .. Heloo');
  return await axios
    .get('http://localhost:4000/auth/user' , {
      withCredentials: true
    })
    .then(response => response.data)
})


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
     registerUserReset : (state) => {
         state.loading = false;
         state.success = false;
         state.error = '';
     } ,
     logginUserReset : (state) => {
         state.loading = false;
         state.success = false;
         state.user = {};
         state.error = '';
     } 
   } ,
  extraReducers: builder => {
    builder.addCase(registerUser.pending, state => {
      state.loading = true;
    })
    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true ;
      state.error = '';
    })
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.code
      console.log(action);
    })
    builder.addCase(logginUser.pending, state => {
      state.loading = true;
    })
    builder.addCase(logginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true ;
      state.user = action.payload
    })
    builder.addCase(logginUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.code
    })
    builder.addCase(logoutUser.pending, state => {
      state.loading = true;
    })
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.success = false ;
      state.user = {};
    })
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(getUser.pending, state => {
      state.loading = true;
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true ;
      state.user = action.payload;
      console.log(state.user);
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    
  }
})

export default userSlice.reducer
export const { registerUserReset , logginUserReset  } = userSlice.actions;