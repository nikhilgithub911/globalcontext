import { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// global uypdated
// updates

const FormDataContext = createContext();

export function FormDataProvider({ children }) {

  // keeping track of the steps
  const[currentStep,setStep] = useState(1);
// captured image will be stored here
  const [capturedImage, setCapturedImage] = useState(null);

  const navigate = useNavigate();
  const localPhone = localStorage.getItem("phoneNumber")

  const [existingUserImage, setExistingUserImage] = useState("");
  // console.log(existingUserImage,"existinguser image")

 // Effect to call handlePhoneNumberChange when the component mounts
 useEffect(() => {
  if (localPhone) {
    handlePhoneNumberChange({ target: { value: localPhone } });
  }
}, []);

  const initialFormData = {
    id: "",
    name: "",
    phoneNumber: localPhone || "",
    email: "",
    gender: "",
    age: "",
    state: "",
    city: "",
    address: "",
    imageUrl: null,
    aadhaarNumber: "",

    companyName: "",

  };

  const [formData, setFormData] = useState({ ...initialFormData });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any of the required fields are empty
    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.email ||
      !formData.age ||
      !formData.state ||
      !formData.city ||
      !formData.companyName
    ) {
      // toast.error('Please fill up all the details before submitting the form.');
      // toast.error("Please fill up all the details")
      toast('Please fill up all the details!',
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
      );

      return;
    }

    // capture image from local storage
    const meetingUpdatedFormData = {
      phone:formData.phone || '',
      context:formData.remarks || '',
      remarks:formData.remarks || '',
      user:formData.user.id || ''
    }
    const imageUrl = localStorage.getItem("capturedImageURL");
    const updatedFormData = {
      // ...formData,
      id: formData.id,

      name: formData.name || "",
      phoneNumber: formData.phoneNumber || "",
      email: formData.email || "",
      age: formData.age || "",
      state: {
        id: formData.state,
      },
      city: {
        id: formData.city,
      },
      imageUrl: existingUserImage || imageUrl,
      companyName: formData.companyName,
    };

    try {
      const response = await axios.post(
        "http://192.168.12.54:8080/vis/add",
        updatedFormData
      );
      if (response.status === 200) {
        console.log("Form Data:", updatedFormData);
        localStorage.removeItem("capturedImageURL");
        toast.success("data added successfully")
        // console.log("Request successful", response.data);
      }
    } catch (err) {
      console.error(err, "There is some issue moving into the database");
    }

    navigate('/');
    setFormData({ ...initialFormData });
    localStorage.removeItem("capturedImageURL");

  };

  //  state to store fetched user data
  const [fetchedUserData, setFetchedUserData] = useState(null);
  // get formdata by phone Number
  // event handler for phone number input change
  const handlePhoneNumberChange = async (event) => {
    const phoneNumber = event.target.value;

    // handle selected states
    if (phoneNumber.length === 10) {
      try {
        const response = await axios.get(`http://192.168.12.54:8080/vis/getVisitorByPhone?phoneNumber=${phoneNumber}`)


        if (response.status === 200 && response.data.data) {
          // set the fetched user data in the form 
          setFetchedUserData(response.data.data);
          console.log(fetchedUserData)

          setExistingUserImage(response.data.data.imageUrl);
          console.log(response.data.data.id, "existing visitor id")


          setFormData({
            ...formData,
            id: response.data.data.id,
            imageUrl: response.data.data.imageUrl,
            name: response.data.data.name || "",
            phoneNumber: phoneNumber,
            email: response.data.data.email || "",
            age: response.data.data.age || "",

            state: response.data.data.state.id,
            city: response.data.data.city.id,

            address: response.data.data.address || "",
            companyName: response.data.data.companyName || "",

          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  // opening the camera modal
  const [open, setOpen] = useState(false);
  const [stream, setStream] = useState(null);
    // opening the camera modal
    const handleOpen = async () => {

      try {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({ video: true })
  
        setStream(userMediaStream);
        setOpen(true);
      } catch (error) {
        console.error('webcam access denied', error);
      }
    }

    // closing the camera modal
    const handleClose = () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setOpen(false);
  
    };
    

  // function for handling the captured image

  const handleImageCapture = (imageURL) => {
    // Set the captured image URL in the state
    setCapturedImage(imageURL);
  };


  // recapture the image
  const recapture = () => {
    console.log("removing the captured image")
    setCapturedImage(null);
    setExistingUserImage("");

    setFormData({
      ...formData,
      imageUrl: null,
    });

  }

  return (
    <FormDataContext.Provider value={{recapture, formData, setFormData,handleSubmit ,handlePhoneNumberChange,fetchedUserData,setFetchedUserData,handleOpen,handleClose,open,setOpen,stream,setStream,localPhone,currentStep,setStep,handleImageCapture,existingUserImage,capturedImage}}>
      {children}
    </FormDataContext.Provider>
  );
}

export default FormDataContext;