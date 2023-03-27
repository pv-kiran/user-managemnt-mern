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
import { logginUser, logginUserReset, registerUserReset } from '../app/features/User/userSlice';
import { setAuth } from '../app/features/Auth/authSlice';
import Alert from './Alert';


function Signin() {

  const [user, setUser] = useState({email: '' , password: ''});
  const navigate = useNavigate();

  const logginState = useSelector((state) => {
    return state.user;
  })
  const dispatch = useDispatch();

  const handleChange = (e) => {
     const {name , value} = e.target ;
     setUser((prev) => {
        return {
            ...prev , [name]: value
        }
     })
  }

  useEffect(() => {
     dispatch(registerUserReset());
  } , [])
  // Alert / Error
  // For setting the alerts / Errors
  const [alert, setAlert] = useState({show: false , msg: '' , type: ''});

  const showAlert = (show = false , msg = '' , type = '') => {
      setAlert({show , msg , type})
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if(!(user.email && user.password)) {
        showAlert(true , 'Fill all the required fields' , 'danger')
        console.log('Please provide all required fields');
    } else {
       dispatch(logginUser(user));
    }
  }

  useEffect(() => {
    if(logginState.success) {
      console.log(logginState.user.user)
      localStorage.setItem('user' , JSON.stringify(logginState.user.user))
      dispatch(setAuth());
      dispatch(logginUserReset());
      navigate('/user')
    }
  } , [logginState.success])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className='paper'>
        <Avatar className='avatar'>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SIGN IN
        </Typography>
        <form className='form' onSubmit={(e) => {
           handleSubmit(e)
        }}>
          <Grid container spacing={2}>
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
          >
            Sign IN
          </Button>
          {
            alert.show && <Alert {...alert} removeAlert = {showAlert}></Alert>
          }
          {
            logginState?.error && <p className='alert danger'> Check username and password
            </p>
          }
        </form>
      </div>
    </Container>
  )
}

export default Signin


