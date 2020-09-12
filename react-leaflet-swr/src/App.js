import './App.css';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import React, { useState } from 'react';

import L from 'leaflet';
import useSwr from 'swr';

const Icon = new L.Icon({
  iconUrl: '',
  iconSize: [25, 25],
});

const fetcher = (...args) => fetch(...args).then((response) => response.json());

function App() {
  const [activeCrime, setActiveCrime] = useState(null);

  const url =
    'https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10';
  const { data, error } = useSwr(url, { fetcher });

  const crimes = data && !error ? data.slice(0, 10) : [];

  return (
    <Map center={[52.631438, -1.134658]} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {crimes.map((crime) => {
        Icon.options.iconUrl =
          'https://cdn.pixabay.com/photo/2020/06/26/17/16/daisies-5343423_960_720.jpg';

        return (
          <Marker
            key={crime.id}
            position={[crime.location.latitude, crime.location.longitude]}
            onclick={() => {
              setActiveCrime(crime);
            }}
            icon={Icon}
          />
        );
      })}

      {activeCrime && (
        <Popup
          position={[
            activeCrime.location.latitude,
            activeCrime.location.longitude,
          ]}
          onClose={() => {
            setActiveCrime(null);
          }}
        >
          <div>
            <h2>{activeCrime.location.street.name}</h2>
            <p>{activeCrime.category}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
}

export default App;
