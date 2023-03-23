import axios from 'axios'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  success: false ,
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const registerUser = createAsyncThunk('user/registerUser', async (user) => {
  console.log(user);
  return await axios
    .post('http://localhost:4000/auth/register' , user)
    .then(response => response.data)
})

const registerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
     registerUserReset : (state) => {
         state.loading = false;
         state.success = false;
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
      state.error = action.error.message
    })
  }
})

export default registerSlice.reducer
export const { registerUserReset } = registerSlice.actions;