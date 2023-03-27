import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



function Home() {
  const authState = useSelector((state) => {
    return state.auth.authState;
  })

  console.log(authState);
  return (
    <section className='home'>
      {
        authState?.role === 'admin' ? <Button component = {Link} to = "/dashboard" variant="contained">VIEW DASHBOARD</Button> : <Button component = {Link} to = "/user" variant="contained">PROFILE</Button>
      }
      
    </section>
  )
}

export default Home