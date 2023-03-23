import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { registerUser, registerUserReset } from './../app/features/User/registerSlice';



function Signup() {

  const [user, setUser] = useState({fullName: '' , email: '' , password: ''});

  const handleChange = (e) => {
     const {name , value} = e.target ;
     setUser((prev) => {
        return {
            ...prev , [name]: value
        }
     })
  }

  const registerState = useSelector((state) => {
    return state.register;
  })
  const dispatch = useDispatch();


  const navigate = useNavigate();

  

  useEffect(() => {
    if(registerState.success) {
      dispatch(registerUserReset());
      navigate('/signin')
    }

  } , [registerState.success])

  // const sendUserRegisterRequest = async () => {
  //   try {
  //     const responseData = await axios.post('http://localhost:4000/auth/register' , {
  //         fullName: user.name ,
  //         email: user.email ,
  //         password: user.password
  //     });
  //     const newUser = await responseData.data;
  //     console.log(newUser);
  //     return newUser;
  //   } catch(err) {
  //       console.log(err);
  //   }
  // } 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if(!(user.fullName && user.email && user.password)) {
        console.log('Please provide all required fields');
    } else {
        dispatch(registerUser(user));
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className='paper'>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                autoComplete="email"
                onChange={(e) => {
                    handleChange(e)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                    handleChange(e)
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{marginTop: '1rem'}}
            disabled = {registerState.loading}
          >
            {
              !registerState.loading ? 'SIGN UP' : 'LOADING'
            }
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Signup