import React, { useState , useEffect } from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Skeleton from '@mui/material/Skeleton';


import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../app/features/User/userSlice';
import { uploadProfile } from './../app/features/User/userSlice';


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
    return state.user;
  })

  // for setting up ( opening and closing ) the modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  

  // for hadling image uplaod
  const [file, setFile] = useState('');
  const [profilePic, setProfilePic] = useState('');

  const handleChange = (e) => {
        console.log(e.target.files[0]);
        setProfilePic(e.target.files[0]);
        setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleClose = () => {
    if(file) {
      setFile('');
    }
    setOpen(false)
  };

  const handleSubmit = (id) => {
    const formData = new FormData();
    formData.append('profilePic' , profilePic);
    const details = {
      formData , id
    }
    dispatch(uploadProfile(details));
    handleClose();
  }

  

  // fetching the user details
  const dispatch = useDispatch();

  useEffect(() => {
      console.log('Hello');
      console.log(userState.success)
      dispatch(getUser());
  } , [userState.success]);

  useEffect(() => {
    if(userState.editSuccess) {
      console.log('Hello');
      console.log(userState.editSuccess)
      dispatch(getUser());
    }
  } , [userState.editSuccess]);


  return (
    <section className="card_container">
      {
          userState.loading ? 
          <Box
            sx={{
              bgcolor: 'white',
              p: 8,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
              <Skeleton
                sx={{ bgcolor: 'grey' }}
                variant="rectangular"
                width={210}
                height={300}
            />
          </Box>  : 
          <Card sx={{ width: '300px'  }}>
              <CardMedia
                sx={{ height: '250px' , padding: '10px' }}
                image= {userState.user?.user?.profileImage  ?  
                          userState.user?.user?.profileImage : 
                          "https://img.freepik.com/free-icon/avatar_318-158392.jpg" }
                title="green iguana"
              />
              {/* "https://img.freepik.com/free-icon/avatar_318-158392.jpg" */}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {userState.user?.user?.fullName}
                  {/* HI */}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {userState.user?.user?.email}
                  {/* Email */}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleOpen}>Profile Picture</Button>
              </CardActions>
          </Card>
      }

      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

           <div className='modal_div'>
              <h2>Add Image:</h2>
              <form>
                <input style={{margin: '3rem 0'}} type="file" onChange={handleChange} />
              </form>
              <img src={file ? file : 'https://img.freepik.com/free-icon/avatar_318-158392.jpg' } alt="imges" className='upload_Img'/>
           </div>
           <Button 
            onClick={() => {
              handleSubmit(userState.user?.user?._id)
            }}
            variant="contained" 
            sx={{marginLeft: '7.5rem' , height:'2rem' , marginTop: '1rem'}}>
             Upload
           </Button>
            
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