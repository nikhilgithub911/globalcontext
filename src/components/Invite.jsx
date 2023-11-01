import React, { useState, useEffect, useContext } from "react";
import {
  Box,
} from "@mui/material";

import "./Invite.css";

import FormDataContext from "../GlobalContext";

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MainForm from "./MainForm";
import MainForm2 from "./MainForm2";
import CameraComponent from "./CameraComponent";


export default function CompanyReg() {


  // global context
  const { currentStep } = useContext(FormDataContext)
  // keeping track of components being rendered
  function showStep(step) {
    switch (step) {
      case 1:
        return <MainForm />
      case 2:
        return <MainForm2 />
      case 3:
        return <CameraComponent />

      default: <MainForm />
    }
  }
  const steps = [
    'Enter Meeting Details',
     'Enter Personal Details',
     'Capture your image' 
  ]
  //  importing global context
  // const { formData,setFormData,handleSubmit,handlePhoneNumberChange,fetchedUserData,setFetchedUserData,handleOpen,handleClose,open,setOpen,stream,setStream,localPhone,currentStep} = useContext(FormDataContext)

  return (
    <>
      <div className="img">

        <Box
          display="flex"
          flexDirection="column"
          minWidth="550px"
          margin="auto"
          padding={3}
          borderRadius={5}
          gap={2}
          elevation={2}
          marginTop={3}
        >

          <header>
            <div className='center-stepper'>
              <Stepper style={{ width: "100%" }} activeStep={currentStep - 1} orientation="horizontal">
                {/* {steps.map((label)=>(
                  <Step key={label}>
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  </Step>
                ))} */}
                <Step>
                  {/* <StepLabel style={{flexDirection:"column"}}>Enter Meeting Details</StepLabel> */}
                  <StepLabel></StepLabel>
                </Step>
                <Step>
                  {/* <StepLabel style={{flexDirection:"column"}}>Enter Personal Details</StepLabel> */}
                  <StepLabel></StepLabel>

                </Step>
                <Step>
                  {/* <StepLabel style={{flexDirection:"column"}}>Capture Your Image</StepLabel> */}
                  <StepLabel></StepLabel>

                </Step>
              </Stepper>
            </div>
            {showStep(currentStep)}
          </header>
          {/* <MainForm/> */}
        </Box>
      </div>
    </>
  );
}
// pencil added