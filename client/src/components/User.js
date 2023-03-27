import React, { useState , useEffect } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';


import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../app/features/User/userSlice';


// Modal styling
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

function User() {

  const userState = useSelector((state) => {
    return state.user?.user;
  })

  // for setting up ( opening and closing ) the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // for hadling image uplaod
  const [file, setFile] = useState('');

  const handleChange = (e) => {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
  }


  // fetching the user details
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Hello');
    dispatch(getUser());
  },[]);


  return (
    <section className="card_container">
      <Card sx={{ width: '300px'  }}>
          <CardMedia
            sx={{ height: '250px' , padding: '10px' }}
            image="https://img.freepik.com/free-icon/avatar_318-158392.jpg"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {userState.user?.fullName}
              {/* HI */}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userState.user?.email}
              {/* Email */}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleOpen}>Profile Picture</Button>
          </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

           <div className='modal_div'>
              <h2>Add Image:</h2>
              <input style={{margin: '3rem 0'}} type="file" onChange={handleChange} />
              <img src={file ? file : 'https://img.freepik.com/free-icon/avatar_318-158392.jpg' } alt="imges" className='upload_Img'/>
           </div>
            
        </Box>
      </Modal>
      
    </section>
  )
}

export default User






// const [message, setMessage] = useState('');

  // const sendUserFetchRequest =  async() => {
  //   const responseData = await axios.get('http://localhost:4000/auth/dashboard' , {
  //       withCredentials: true
  //   });
  //   const message = await responseData.data;
  //   return message;
  // }

// sendUserFetchRequest().then(message => setMessage(message.message));



{/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}