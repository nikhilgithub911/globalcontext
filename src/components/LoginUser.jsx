// this component deals with fetching meeting details of user 
// for checking in 

import React, { useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

const LoginUser = () => {
  const [fetchedUserData, setFetchedUserData] = useState(null);
  // const [logoutmessage, setLogoutMessage] = useState(null);
  const [number, setNumber] = useState("");
  const [meetingId,setMeetingId] = useState("");
  const [disable,setDisable] = useState(true);
  const [phoneInput, setPhoneInput] = useState("");



  const navigate = useNavigate();

const formattedDateTimePicker1 = fetchedUserData ? fetchedUserData.meetingStartDateTime ? new Date(fetchedUserData.meetingStartDateTime).toISOString() : null : null;
const formattedDateTimePicker2 = fetchedUserData ? fetchedUserData.meetingEndDateTime ? new Date(fetchedUserData.meetingEndDateTime).toISOString() : null : null;
  //   search meeting
  const searchMeeting = async (event) => {
    const visitorPhoneNumber = event.target.value;
    localStorage.setItem("phoneNumber",visitorPhoneNumber)
    

    if (visitorPhoneNumber.length === 10) {
      try {
        const response = await axios.get(
          `http://192.168.12.54:8080/vis/getByPhone?phoneNumber=${visitorPhoneNumber}`
        );

        console.log(response.data,"meeting details response")
        if (response.status === 200 && response.data.data) {
          setFetchedUserData(response.data.data);
          setNumber(visitorPhoneNumber);
          setMeetingId(response.data.data.id)
          console.log(number)
          console.log(fetchedUserData)
          if(response.data.data.status === "PENDING"){
            setDisable(true);
          }else if(response.data.data.status === "APPROVED"){
            setDisable(false);
          }
          
        }
      } catch (error) {
        // toast.warning(" Please fill up the details!", {
        //   position: "top-right",
        //   autoClose: 1000,
        // });
        
      
        navigate("/invite")
        console.error(error);
      }
    }
  };
  // start meeting
  const handleStartMeeting = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://192.168.12.54:8080/vis/checkIn", {
        phoneNumber: fetchedUserData.visitor.phoneNumber,
        aadhaarNumber: fetchedUserData.visitor.aadhaarNumber,
        // meetingContext: "INTERVIEW",
        id:meetingId,
        visitor:{
          id:fetchedUserData.visitor.id
        },
        room:{
          id:fetchedUserData.room.id
        },
        // city:fetchedUserData.visitor.city.name,
        city:{
          id:fetchedUserData.visitor.city.id
        },
        state:{
          id:fetchedUserData.visitor.state.id
        },
        user:{
          id:fetchedUserData.user.id
        },
        meetingEndDateTime:formattedDateTimePicker2,
        name:fetchedUserData.visitor.name,
        email:fetchedUserData.visitor.email,
        age:fetchedUserData.visitor.age,
        meetingStartDateTime:formattedDateTimePicker1,
        address:fetchedUserData.visitor.address,
        gender:fetchedUserData.visitor.gender,
        context:fetchedUserData.context
      });
      toast.success("meeting started")
    } catch (err) {
      console.error(err, "There is some issue moving into the database");
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


   // handle phone length
   const handleLength = (event)=>{
    const phone = event.target.value;
    setPhoneInput(phone);

    setPhoneInput(phone.slice(0, 10));

  }
  return (
    <div>
      <TextField
        fullWidth
        placeholder="Enter your Phone Number*"
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

 
              <Button
                variant="contained"
                onClick={handleStartMeeting}
                sx={{ width: "12em" }}
                disabled={disable}
              >
                Start Meeting
              </Button>
              </Box>
          </>
        )}
        
      </Box>
     

    </div>
  );
};

export default LoginUser;


