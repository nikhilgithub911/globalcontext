import './App.css';
import { Route, Routes } from 'react-router-dom';
import Invite from './components/Invite';
import Add from './components/Add';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MeetingDetails from './components/MeetingDetails';
import { Toaster } from 'react-hot-toast';




function App() {


  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Add />} />
          <Route path="/invite" element={<Invite />} />
          <Route path ="MeetingDetails" element={<MeetingDetails/>}/>
        </Routes>
        {/* add toast */}
        <ToastContainer/>
        <Toaster />

    </div>
  );
}

export default App;



// appproving meeetingggg