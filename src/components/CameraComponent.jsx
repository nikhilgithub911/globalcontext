import { Box, Button, Modal } from '@mui/material'
import React, { useContext } from 'react'
import WebcamImage from './WebcamImage'
import FormDataContext from '../GlobalContext'
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';

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


const CameraComponent = () => {

    const { open, handleClose, handleImageCapture, handleSubmit, setStep, handleOpen, existingUserImage, capturedImage, recapture } = useContext(FormDataContext)
    return (
        <div>

            <div className="seconddto">
                {existingUserImage ? (
                    <img src={existingUserImage} alt="User" style={{ height: "120px", width: "120px" }} />
                ) : (
                    !capturedImage ? (
                        <CameraEnhanceIcon sx={{ fontSize: 30, color: "#00308F", cursor: "pointer" }} onClick={handleOpen} />
                    ) : (
                        <img src={capturedImage} alt="Captured" style={{ height: "120px", width: "120px" }} />
                    )
                )}

                {/* </div> */}

                {existingUserImage || capturedImage ?
                    (<div className="retakeImage">
                        <FlipCameraIosIcon sx={{ fontSize: 30, color: "#00308F", cursor: "pointer" }} onClick={recapture} />
                    </div>) : ("")
                }
            </div>

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
                    <WebcamImage onCloseModal={handleClose} onImageCapture={handleImageCapture} />
                </Box>
            </Modal>

            <Box sx={{ display: "flex", justifyContent: "space-between", border: "1" }}>

                <Button variant="contained" sx={{ width: "40%" }} onClick={() => setStep(2)}>Prev</Button>
                <Button variant="contained" sx={{ width: "40%" }} onClick={handleSubmit}>Submit</Button>

            </Box>
        </div>
    )
}

export default CameraComponent