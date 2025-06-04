// src/components/BusMap/BusMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './BusMap.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const BusMap = ({ buses }) => {
  const center = buses.length > 0 ? 
    [buses[0].currentLocation.lat, buses[0].currentLocation.lng] : 
    [19.0760, 72.8777]; // Default to Mumbai coordinates

  return (
    <div className="bus-map-container">
      <MapContainer center={center} zoom={12} className="bus-map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {buses.map(bus => (
          <Marker
            key={bus.id}
            position={[bus.currentLocation.lat, bus.currentLocation.lng]}
            icon={L.icon({
              iconUrl: require('../../assets/icons/bus-icon.png'),
              iconSize: [32, 32],
            })}
          >
            <Popup>
              <div>
                <h4>Bus {bus.id}</h4>
                <p>Route: {bus.route}</p>
                <p>Speed: {bus.speed} km/h</p>
                <p>Passengers: {bus.passengerCount}</p>
                <p>Fuel: {bus.fuelLevel}%</p>
                <p>Last Update: {new Date(bus.lastUpdated).toLocaleTimeString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BusMap;