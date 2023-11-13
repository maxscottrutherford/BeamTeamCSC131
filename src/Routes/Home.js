import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vendiaClient } from '../vendiaClient';
import '../Home.css'; // Import the CSS file for styling

const Home = () => {
  const { client } = vendiaClient();
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add a new device to Vendia entities
      const response = await client.entities.devices.create({
        name: deviceName,
        completionPercentage: 0, // Assuming completion percentage starts at 0
      });

      // Update the state with the newly created device
      setDevices([...devices, response]);
      setDeviceName('');
    } catch (error) {
      console.error('Error adding device to Vendia:', error);
    }
  };

  useEffect(() => {
    const fetchDevicesFromTable = async () => {
      try {
        console.log('Fetching devices from table...');
        console.log('client.entities:', client.entities); // Add this line for debugging

        if (client.entities && client.entities.devices) {
          const response = await client.entities.devices.list();
          console.log('Response from list:', response); // Add this line for debugging
          setDevices(response.items);
        } else {
          console.error('Client or client.entities.devices is undefined.');
        }
      } catch (error) {
        console.error('Error fetching data from table:', error);
      }
    };


    fetchDevicesFromTable();
  }, []);

  const handleRemove = async (deviceId) => {
    try {
      // Remove the device from Vendia entities
      await client.entities.devices.remove(deviceId);

      // Update the state by removing the deleted device
      setDevices(devices.filter((device) => device.id !== deviceId));
    } catch (error) {
      console.error('Error removing device from Vendia:', error);
    }
  };

  return (
    <div className="home-page">
      <h2>Current Devices</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={deviceName}
          onChange={(e) => setDeviceName(e.target.value)}
        />
        <button type="submit">Add Device</button>
      </form>
      <div className="device-container">
        {devices.map((device) => (
          <div key={device.id} className="device-item">
            <h3>{device.name}</h3>
            <p>Completion Percentage: {device.completionPercentage}%</p>
            <button onClick={() => handleRemove(device.id)}>Remove</button>
            <br />
            <button>
              <Link to={`/devicelist/${device.id}`}>View Tests</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
