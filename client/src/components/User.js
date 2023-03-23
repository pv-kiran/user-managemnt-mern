import axios from 'axios'
import React, { useEffect, useState } from 'react'
axios.defaults.withCredentials = true;


function User() {

  const [message, setMessage] = useState('');

  const sendUserFetchRequest =  async() => {
    const responseData = await axios.get('http://localhost:4000/auth/dashboard' , {
        withCredentials: true
    });
    const message = await responseData.data;
    return message;
  }

  useEffect(() => {
    sendUserFetchRequest().then(message => setMessage(message.message));
  })
  return (
    <div>
        {
            message && <h1>{message}</h1>
        }
    </div>
  )
}

export default User