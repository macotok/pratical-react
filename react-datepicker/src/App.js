import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

import React, { useState } from 'react';

import DatePicker from 'react-datepicker';

function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <div className="App">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="yyyy/MM/dd"
        placeholderText={'dd/mm/yyyy'}
        // minDate={new Date()}
        // maxDate={new Date()}
        isClearable
        filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
        showYearDropdown
        scrollableYearDropdown
      />
    </div>
  );
}

export default App;
