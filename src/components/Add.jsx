import React, { useState } from 'react';
import { Box, Button, Modal, Paper, TextField, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import log from "../Images/rapidsoft.png";
import "./Add.css";
import Checkin from "./Checkin"
import LoginUser  from "./LoginUser"


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Add = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  }
  const [open2, setOpen2] = useState(false);
  const handleClose2 = () => setOpen2(false);
  const handleOpen2 = () => {
    setOpen2(true);
  
  }


  return (
    <Paper
      className='Checks'
      elevation={7}
      sx={{
        width: 700,
        height: 700,
        mt: 7,
      }}
    >

      <Box sx={{ mt: 4 }}>
        <img src={log} alt="logo" width="300px" sx={{ mt: 2 }} />
      </Box>



      <Box sx={{
        mt: 4,
        height: "60%",
        width: "100%",
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
      }}>

        {/* CheckIn button w */}
        {/* <NavLink to="/invite" style={{ textDecoration: 'none', color: 'inherit' }}> */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              width: "200px",
              height: "200px",
              display: "flex",
              alignItems: 'center',
              justifyContent: 'center',
              border: 1,
              borderRadius: '50%',
              borderColor: 'white'
            }}
          >
            <LoginIcon sx={{ width: "100px", height: "100px", color: "#fff" }} onClick={handleOpen2} />
            <div>

              {/* <Button variant="contained" onClick={handleOpen}>Capture</Button> */}
              <Modal
                open={open2}
                onClose={handleClose2}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ zIndex: 1 }}
              >

                {/* webcam in modal */}
                <Box sx={style}>
                  <LoginUser />
                </Box>
              </Modal>
            </div>
          </Box>
          <Typography sx={{ mt: 2, fontSize: "22px", color: "#fff" }} >CheckIn</Typography>
        </Box>
        {/* </NavLink> */}

        {/* ------------------------------------------------------------------------------------------- */}




        {/* Checkout logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Box sx={{
            width: "200px",
            height: "200px",
            display: "flex",
            alignItems: 'center',
            justifyContent: 'center',
            border: 1,
            borderRadius: '50%',
            borderColor: 'white',
            cursor: "pointer"
          }}>

            {/* modal will open up when clicking on logout icon */}

            <LogoutIcon sx={{ width: "100px", height: "100px", color: "#fff" }} onClick={handleOpen} />
            <div>
              {/* <Button variant="contained" onClick={handleOpen}>Capture</Button> */}
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ zIndex: 1 }}
              >

                {/* webcam in modal */}
                <Box sx={style}>
                  <Checkin />
                  {/* <Button>checkout</Button> */}
                </Box>
              </Modal>
            </div>
          </Box>
          <Typography sx={{ mt: 2, fontSize: "22px", color: "#fff" }}>CheckOut</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default Add;
