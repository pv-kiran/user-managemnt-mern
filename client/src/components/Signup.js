import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {

  const [user, setUser] = useState({name: '' , email: '' , password: ''});
  const navigate = useNavigate();

  const handleChange = (e) => {
     const {name , value} = e.target ;
     setUser((prev) => {
        return {
            ...prev , [name]: value
        }
     })
  }

  const sendUserRegisterRequest = async () => {
    try {
      const responseData = await axios.post('http://localhost:4000/auth/register' , {
          fullName: user.name ,
          email: user.email ,
          password: user.password
      });
      const newUser = await responseData.data;
      console.log(newUser);
      return newUser;
    } catch(err) {
        console.log(err);
    }
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!(user.name && user.email && user.password)) {
        console.log('Please provide all required fields');
    } else {
        sendUserRegisterRequest().then(() => navigate('/signin'));
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
                name="name"
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
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default Signup