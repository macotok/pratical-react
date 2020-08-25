import './App.css';

import BarChart from './components/BarChart';
import DoughnutChart from './components/DoughnutChart';
import LineChart from './components/LineChart';
import React from 'react';

function App() {
  return (
    <div className="App">
      <div className="chart">
        <LineChart />
        <BarChart />
        <DoughnutChart />
      </div>
    </div>
  );
}

export default App;
