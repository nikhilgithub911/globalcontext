import { Box, Button, FormControl, FormLabel, InputLabel, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import FormDataContext from '../GlobalContext'
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const MainForm2 = () => {

    // importing global context
    const {setStep} = useContext(FormDataContext)

    const [editMode, setEditMode] = useState(false);
    const [editButtonClicked, setEditButtonClicked] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(true);

    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const stateUrl = "http://192.168.12.54:8080/api/state/all";

    const handleEditClick = () => {
        // When the "Edit" icon is clicked, enable the text field for editing
        setEditButtonClicked(true);
        setEditMode(true);
        console.log("edit button clicked")
        setTooltipOpen(false);

    };

    // importing global context

    const { formData, setFormData, handleSubmit, handlePhoneNumberChange, fetchedUserData, setFetchedUserData, handleOpen, handleClose, open, setOpen, stream, setStream, localPhone, currentStep } = useContext(FormDataContext)

    // handle changes 
    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "state") {

            setFormData({
                ...formData,
                [name]: value,
            });
            fetchCitiesByState(value);

        }

        else if (name === "city") {


            setFormData({
                ...formData,
                [name]: value,
            });
        } else if (name === "email") {
            const emailError = validateInput(value, emailRegex);
            setFormData({
                ...formData,
                email: value,
                emailError: emailError,
            })
        } else if (name === "phoneNumber") {
            if (value.length <= 10) {

                const phoneNumberError = validateInput(value, /^\d{10}$/);
                setFormData({
                    ...formData,
                    phoneNumber: value,
                    phoneError: phoneNumberError,
                })
            }
        } else if (name === "aadhaarNumber") {
            if (value.length <= 12) {

                setFormData({
                    ...formData,
                    aadhaarNumber: value,
                })
            }
        }

        else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    // email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,3}$/i;

    // validate input function
    const validateInput = (value, validationRule) => {
        if (validationRule.test(value)) {
            return "";
        } else {
            return "Invalid Input"
        }
    }
    const emailError = validateInput(formData.email, emailRegex);
    const phoneNumberError = validateInput(formData.phoneNumber, /^\d{10}$/)

    //   fetch cities by state

    const fetchCitiesByState = async (state) => {
        try {
            const response = await axios.get(
                `http://192.168.12.54:8080/api/city/${state}`
            );
            if (response.status === 200 && response.data.data) {
                setCities(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching cities", error);
        }
    };

    useEffect(() => {
        const fetchStates = async () => {
            try {
                const response = await axios.get(stateUrl);
                if (response.status === 200 && response.data.data) {
                    setStates(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching states", error);
            }
        };

        fetchStates();
    }, []);


    useEffect(() => {
        if (formData.state) {
            fetchCitiesByState(formData.state);
        }
    }, [formData.state]);


    //   disable dates
    const shouldDisableDate = (date) => {
        return date < new Date().setDate(new Date().getDate() - 1);
    };
    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <Box
                    display="flex"
                    flexDirection="column"
                    minWidth="550px"
                    margin="auto"
                    marginTop={5}
                    padding={3}
                    borderRadius={5}
                    gap={4}
                    elevation={2}
                    boxShadow={"rgba(0, 0, 0, 0.25) 0px 5px 15px"}
                >
                    <Typography fontSize={30} color="gray" variant={"h1"} sx={{ fontSize: "40px", mb: 1 }}>
                        Personal Details
                        {fetchedUserData ? <Tooltip title="Edit" open={tooltipOpen} placement="right-start" arrow ><EditIcon onClick={handleEditClick} sx={{ ml: 2, cursor: "pointer" }} /></Tooltip>
                            : ""}
                    </Typography>


                    <TextField
                        placeholder="Full Name*"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        inputProps={{ maxLength: 25 }}
                        sx={{ mb: 1 }}
                        // disabled={true}
                        disabled={fetchedUserData && !editMode && !editButtonClicked} // Disable when not in edit mode and edit button not clicked
                    />

                    <TextField
                        placeholder=" Email*"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formData.emailError}
                        helperText={formData.emailError}
                        inputProps={{ maxLength: 50 }}
                        disabled={fetchedUserData && !editMode && !editButtonClicked}

                    />
                    <TextField
                        placeholder="Age*"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        inputProps={{ maxLength: 2 }}
                        disabled={fetchedUserData && !editMode && !editButtonClicked}
                    />

                    <div
                        className="input"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">State*</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={selectedState}
                                value={formData.state}
                                label="State"
                                name="state"
                                onChange={handleChange}
                                disabled={fetchedUserData && !editMode && !editButtonClicked}
                                MenuProps={MenuProps}
                            >
                                {states.map((state) => (
                                    <MenuItem key={state.id} value={state.id}
                                    >
                                        {state.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">City*</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.city}
                                label="City"
                                name="city"
                                onChange={handleChange}
                                disabled={fetchedUserData && !editMode && !editButtonClicked}
                                MenuProps={MenuProps}
                            >
                                {cities.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <TextField
                        placeholder=" Company Name*"
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        disabled={fetchedUserData && !editMode && !editButtonClicked}
                        inputProps={{ maxLength: 25 }}

                    />

                    {/* {---------------------------LAC----------------------------} */}

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                        <Button variant="contained"  sx={{width:"40%"}} onClick={()=>setStep(1)}>Prev</Button>
                        <Button variant="contained"  sx={{width:"40%"}}onClick={()=>setStep(3)}>Next</Button>

                    </Box>
                </Box>
            </form>
        </>
    )
}

export default MainForm2