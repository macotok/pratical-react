import './App.css';

import * as parkData from './data/skateboard-parks.json';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';

import { Icon } from 'leaflet';

const icon = new Icon({
  iconUrl: '/skateboarding.svg',
  iconSize: [25, 25],
});

function App() {
  const [activePark, setActivePark] = useState(null);

  return (
    <Map center={[45.4, -75.7]} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parkData.features.map((park) => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0],
          ]}
          onclick={() => {
            setActivePark(park);
          }}
          icon={icon}
        />
      ))}

      {activePark && (
        <Popup
          position={[
            activePark.geometry.coordinates[1],
            activePark.geometry.coordinates[0],
          ]}
          onClose={() => {
            setActivePark(null);
          }}
        >
          <div>
            <h2>{activePark.properties.NAME}</h2>
            <p>{activePark.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
