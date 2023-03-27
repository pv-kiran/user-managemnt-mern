import axios from 'axios'
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
axios.defaults.withCredentials = true;


const initialState = {
  loading: false,
  success: false ,
  users: [] ,
  error: ''
}


export const getUsers = createAsyncThunk('admin/getUsers', async () => {
  return await axios
    .get('http://localhost:4000/admin/dashboard' , {
      withCredentials: true
    })
    .then(response => response.data)
})

export const deleteUser = createAsyncThunk('admin/deleteUsers', async (id) => {
  return await axios
    .delete(`http://localhost:4000/admin/user/${id}` , {
      withCredentials: true
    })
    .then(response => response.data)
})

export const editUser = createAsyncThunk('admin/editUsers', async ({user , editId}) => {
  console.log(user);
  console.log(editId);
  return await axios
    .put(`http://localhost:4000/admin/user/${editId}` , 
    { user } , 
    {
      withCredentials: true
    })
    .then(response => response.data)
})

export const searchUsers = createAsyncThunk('admin/searchUsers', async (text) => {
  return await axios
    .post(`http://localhost:4000/admin/user/search` , { search: text } , {
       withCredentials: true
     } ,
    )
    .then(response => response.data)
})


const admin = createSlice({
  name: 'user',
  initialState,
//   reducers: {
//      adminStateReset : (state) => {
//          state.loading = false;
//          state.success = false;
//          state.error = '';
//      } ,

//    } ,
  extraReducers: builder => {
    builder.addCase(getUsers.pending, state => {
      state.loading = true;
    })
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true ;
      state.users = action.payload.users;
    })
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    builder.addCase(editUser.pending, state => {
       state.loading = true;
       state.success = false
    })
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true ;
    })
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false
      state.success = false
      state.error = action.error.message
    })
    builder.addCase(searchUsers.pending, state => {
      state.loading = true;
    })
    builder.addCase(searchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true ;
      state.users = action.payload.users;
    })
    builder.addCase(searchUsers.rejected, (state, action) => {
      state.loading = false
      state.success = false ;
      state.error = action.error.message
    })
    builder.addCase(deleteUser.pending, state => {
      state.loading = true;
      state.success = false
    })
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true ;
    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false
      state.success = false;
      state.error = action.error.message
    })
    
  }
})

export default admin.reducer
// export const { adminStateReset , userSearch  } = admin.actions;