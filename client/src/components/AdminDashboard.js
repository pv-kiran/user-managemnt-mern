import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {  deleteUser, getUsers, searchUsers , editUser } from '../app/features/Admin/adminSlice';
import { registerUser, registerUserReset } from '../app/features/User/userSlice';
import Alert from './Alert';



import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@mui/material/Modal';
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Skeleton from '@mui/material/Skeleton';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function AdminDashboard() {


  // redux configuration
  let adminState = useSelector((state) => {
    return state.admin;
  })

  const registerState = useSelector((state) => {
    return state.user;
  })

  const dispatch = useDispatch();

 

 

  // fetching the users
  useEffect(() => {
      dispatch(getUsers());
      // dispatch(adminStateReset())
  } , [registerState.success , adminState.success]);


  // modal config
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    if(isEdit) {
      setIsEdit(false);
    }
    setProfileImg('');
    setOpen(false)
  };



  // ADDING A USER
  const [user, setUser] = useState({fullName: '' , email: '' , password: '' , profilePic: ''});
  const [profileImg , setProfileImg] = useState('');


  const handleAdduser = () => {
    if(editId) {
      setUser({fullName: '' , email: '' , password: '' , profilePic: ''});
    }
    handleOpen();
  }

  const handleChange = (e) => {
     const {name , value} = e.target ;
     setUser((prev) => {
        return {
            ...prev , [name]: value
        }
     })
  }

  const handleFileChange = (e) => {
     console.log(e.target.files[0]);
     setUser((prevUser) => {
      return {
         ...prevUser ,
         profilePic: e.target.files[0]
      }
     })
     setProfileImg(URL.createObjectURL(e.target.files[0]));
     console.log(user);
  }



  // Alert or error message
  const [alert, setAlert] = useState({show: false , msg: '' , type: ''});

  const showAlert = (show = false , msg = '' , type = '') => {
      setAlert({show , msg , type})
  }



  // handler for ADD , EDIT and Search user

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!(user.fullName && user.email && user.password)) {
        showAlert(true , 'Fill all the required fields' , 'danger')
        console.log('Please provide all required fields');
    } 
    else if(isEdit && user ) {
       const editDetails = {
         user ,
         editId
       }
       dispatch(editUser(editDetails));
       handleClose();
    }
    else {
        const newUser = new FormData();
        
        newUser.append('fullName' , user.fullName)
        newUser.append('email' , user.email)
        newUser.append('password' , user.password)
        newUser.append('profilePic' , user.profilePic)

        dispatch(registerUser(newUser));
        handleClose(); 
        setUser({fullName: '' , email: '' , password: '' , profilePic: ''});
        console.log(user);
    }
  }

  // {fullName: '' , email: '' , password: '' , profilePic: ''}


   useEffect(() => {
    if(registerState.success) {
      dispatch(registerUserReset());
    }
   } , [registerState.success])


  // deleting the user
  const handleClick = (id) => {
      dispatch(deleteUser(id));
  }

  // searching hte user
  const handleSearch = (text) => {
     dispatch(searchUsers(text));
  }

  // editing the user
  const [isEdit, setIsEdit] = useState(false)
  const [editId , setEditId] = useState(null);

  const handleEdit = (id) => {
    setEditId(id);
    setIsEdit(true);
    const editUser = adminState?.users?.filter(user => user._id === id);
    console.log(editUser);
    setUser(editUser[0]);
    console.log(user);
    handleOpen();
  }
 

 

  

  return (
    <React.Fragment>
      <div className='action-conatainer'>
         <Box
            sx={{
              width: 300,
              maxWidth: '100%',
            }}
          >
          <form>
            <TextField fullWidth label="Search here" id="fullWidth" onChange={(e) => {
               handleSearch(e.target.value)
            }}/>
          </form>
             
         </Box>
         <Button sx={{height: 50}} variant="contained" onClick={() => {
          handleAdduser()
         }}>ADD USER</Button> 
          
      </div>
      {
        ( registerState.loading || adminState.loading  ) ? 
        <Box sx={{ width: 500 , margin: 'auto' , marginTop: '7rem' }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </Box> : 
        <TableContainer sx={{width: 700 , margin: 'auto' , marginTop: 5}} component={Paper}>
        <Table sx={{ width: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adminState?.users?.map((user) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" sx={{fontSize: '1.2rem'}} scope="row">
                  {user.fullName}
                </TableCell>
                <TableCell align="left" sx={{fontSize: '1.2rem'}}>{user.email}</TableCell>
                <TableCell align="left">
                  <ModeEditOutlineIcon sx={{color:'blue' , marginRight: '1rem'}} onClick = {() => {
                    handleEdit(user._id)
                  }}>

                  </ModeEditOutlineIcon>
                  <DeleteIcon sx={{color:'red'}} onClick = {() => {
                    handleClick(user._id)
                  }}></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      }
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

           <div className='modal_div'>
              <Container component="main" maxWidth="xs">
                  <CssBaseline />
                  <div className='paper'>
                  {
                    profileImg ? <img className='profileImg' src = {profileImg} alt='profile'></img> : <Avatar className='avatar'>
                        <PersonAddAltIcon />
                      </Avatar>
                  }
                      
                      <Typography component="h1" variant="h5">
                        {
                          isEdit ? 'EDIT USER' : 'ADD USER'
                        }
                      </Typography>
                      <form className='form' onSubmit={(e) => {
                            handleSubmit(e)
                      }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="name"
                              label="Name"
                              name="fullName"
                              autoComplete="name"
                              value={user.fullName}
                              onChange={(e) => {
                                  handleChange(e)
                              }}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              variant="outlined"
                              fullWidth
                              id="email"
                              label="Email Address"
                              name="email"
                              value={user.email}
                              autoComplete="email"
                              onChange={(e) => {
                                  handleChange(e)
                              }}
                            />
                          </Grid>
                          {
                            !isEdit && <Grid item xs={12}>
                              <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={user.password}
                                autoComplete="current-password"
                                onChange={(e) => {
                                    handleChange(e)
                                }}
                              />
                            </Grid>
                          }
                        </Grid>
                        {
                           !isEdit && <Grid sx={{marginTop: '.8rem'}}>
                          <input type='file' onChange={(e) => {
                            handleFileChange(e)
                          }}></input>
                        </Grid>
                        }
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          sx={{marginTop: '1rem'}}
                          // onClick = {handleClose}
                        >
                          {
                            isEdit ? 'EDIT USER' : 'ADD USER'
                          }
                        </Button>
                        {
                          alert.show && <Alert {...alert} removeAlert = {showAlert}></Alert>
                        }
                      </form>
                  </div>
              </Container>
           </div>

        </Box>
      </Modal>
    </React.Fragment>
     
  )
}

export default AdminDashboard