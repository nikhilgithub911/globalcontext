// this component is for checking out user

import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkin = () => {
  const [fetchedUserData, setFetchedUserData] = useState(null);
  const [logoutmessage, setLogoutMessage] = useState(null);
  const [phoneInput, setPhoneInput] = useState("");
  const [disable,setDisable] = useState(true);


  console.log(fetchedUserData, "checkin details for checkin page")

  const searchMeeting = async (event) => {
    const visitorPhoneNumber = event.target.value;

    if (visitorPhoneNumber.length === 10) {
      try {
        const response = await axios.get(`http://192.168.12.54:8080/vis/getByPhone?phoneNumber=${visitorPhoneNumber}`)

        if (response.status === 200 && response.data.data) {
          setFetchedUserData(response.data.data);
        }
      } catch (error) {
        toast.warning(" user does not exist!", {
          position: "top-right",
          autoClose: 1000, 
        });
        console.error(error);
      }
    }
  };

  // checkout user by taking number
  // --------------------------------------------
  const checkoutUser = async () => {
    try {
      const response = await axios.get(`http://192.168.12.54:8080/api/meeting/checkout?phone=${fetchedUserData.visitor.phoneNumber}`);
      console.log(response, "response for checking out");
      if (response.status === 200 && response.data.data) {
        setLogoutMessage(response.data.data)
        // if(response.data.data.status === "COMPLETED"){
        //   setDisable(true);
        // toast.error("already checked out")
        // }
        // else{
        //   setDisable(false);
        //   console.log(logoutmessage,"this is a logout message"); 
        //   toast.success("Checkout successful!", {
        //     position: "top-right",
        //     autoClose: 1000, 
        //   });
        // }
      }
      toast.success("checkout successful !")
    } catch (error) {
      console.error(error);
      toast.warning(" already checked out", {
        position: "top-right",
        autoClose: 1000, 
      });
    }
  };
  

    // converting start time to day format
    const formatStartDate = () => {
      if (fetchedUserData && fetchedUserData.meetingStartDateTime) {
        const originalStartDate = new Date(fetchedUserData.meetingStartDateTime);
        const adjustedStartDate = new Date(originalStartDate.getTime() - (5 * 60 + 30) * 60 * 1000);
    
        return adjustedStartDate.toLocaleString();
      }
      return null;
    };
  //converting end time to day format
  
  const formatEndDate = () => {
    if (fetchedUserData && fetchedUserData.meetingEndDateTime) {
      const originalEndDate = new Date(fetchedUserData.meetingEndDateTime);
      const adjustedEndDate = new Date(originalEndDate.getTime() - (5 * 60 + 30) * 60 * 1000);
  
      return adjustedEndDate.toLocaleString();
    }
    return null;
  };


  // ---------------------handle phone length

  const handleLength = (event)=>{
    const phone = event.target.value;
    setPhoneInput(phone);

    setPhoneInput(phone.slice(0, 10)); 

  }
  // --------------------------------------------


  return (
    <div>
    <TextField
      fullWidth
      placeholder="Visitor Phone Number*"
      type="number"
      name="phoneNumber"
      autoComplete="off"
      onInput={searchMeeting}
      onChange={handleLength}
      value={phoneInput}
    />
    <Box>
      {fetchedUserData && (
        <>
          <Typography>
          <strong> Name: </strong>

              {fetchedUserData.visitor.name}</Typography>
          <Typography>
          <strong> Phone: </strong>

             {fetchedUserData.visitor.phoneNumber}
          </Typography>
         
          <Typography>
          <strong> Company: </strong>

            {fetchedUserData.visitor.companyName}
          </Typography>
          <br />

          {/* -------------------------------------------------------------------------------------------- */}
          
          <Typography variant="h6" sx={{ color: "blue" }}>
            Meeting Details:
          </Typography>
          <Typography>
            <strong>Host Name: </strong>
            {fetchedUserData.user.firstName}
          </Typography>
          <Typography>
            <strong>Start Time: </strong>
            {/* {start} */}
            {formatStartDate(fetchedUserData.meetingStartDateTime)}
          </Typography>
          <Typography>
            <strong>End Time: </strong>
            {formatEndDate(fetchedUserData.meetingEndDateTime)}
            {/* {fetchedUserData.meetingEndDateTime} */}
          </Typography>
          <Typography>
          <strong>Status: </strong>

            {fetchedUserData.status}</Typography>
          
          <Typography>
            <strong>Visit Type: </strong>
            {fetchedUserData.context}
          </Typography>
          <Box className="baton">


            <Button variant="contained" 
              sx={{ width: "12em" }}
              onClick={checkoutUser}
              // disabled={disable}
            >Check out</Button>
            </Box>
        </>
      )}
      
    </Box>
   

  </div>
);
  
};

export default Checkin;
