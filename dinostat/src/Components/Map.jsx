import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Recenter from './Recenter';

export default function Map({ placeName }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Use Leaflet Geocoding API to search for the place by name
    console.log(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`);
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          const lat = parseFloat(data[0].lat);
          const lon = parseFloat(data[0].lon);
          setLocation({ lat, lon });
          console.log(location);
        } else {
          console.error('Place not found');
        }
      })
      .catch((error) => {
        console.error('Error fetching place details:', error);
      });
  }, [placeName]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {location && (
        <MapContainer center={[location.lat, location.lon]} zoom={6} style={{ width: '100%', height: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={[location.lat, location.lon]}>
            <Popup>{placeName}</Popup>
          </Marker>
          <Recenter lat={location.lat} lon={location.lon} />
        </MapContainer>
      )}
    </div>
  );
}
