import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { toast } from 'react-toastify';

toast.configure();

const CustomToast = ({ closeToast }) => {
  return (
    <div>
      Something went wrong! <button onClick={closeToast}>Close</button>
    </div>
  );
};

function App() {
  const notify = () => {
    toast('Basic notification!', { position: toast.POSITION.TOP_LEFT });
    toast.success('Success! notification!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 8000,
    });
    toast.info('Info! notification!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: false,
    });
    toast.warn(<CustomToast />, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    toast.error('Error! notification!', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
    toast('Basic notification!', { position: toast.POSITION.BOTTOM_RIGHT });
  };

  return (
    <div className="App">
      <button onClick={notify}>Notify !</button>
    </div>
  );
}

export default App;
