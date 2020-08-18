import './App.css';

import { FaReact } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { MdAlarm } from 'react-icons/md';
import React from 'react';

function App() {
  return (
    <IconContext.Provider value={{ color: 'blue', size: '5rem' }}>
      <div className="App">
        <FaReact />
        <MdAlarm color="purple" size="10rem" />
      </div>
    </IconContext.Provider>
  );
}

export default App;
