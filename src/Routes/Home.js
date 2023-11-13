import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import TestModal from './TestModal';
import { vendiaClient } from '../vendiaClient';
import '../Home.css'; // Import the CSS file for additional styling

const Home = () => {
  const { client } = vendiaClient();
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add a new device to Vendia entities
      const response = await client.entities.device.add({
        name: deviceName,
        completionPercentage: 0,
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
        const response = await client.entities.device.list();
        setDevices(response.items);
      } catch (error) {
        console.error('Error fetching data from table:', error);
      }
    };

    fetchDevicesFromTable();
  }, [client]);

  const handleRemove = async (deviceId) => {
    try {
      // Remove the device from Vendia entities
      await client.entities.device.remove(deviceId);

      // Update the state by removing the deleted device
      setDevices(devices.filter((device) => device._id !== deviceId));
    } catch (error) {
      console.error('Error removing device from Vendia:', error);
    }
  };

  const handleViewTests = (deviceId) => {
    setSelectedDevice(deviceId);
  };

  const handleCloseModal = () => {
    setSelectedDevice(null);
  };

  return (
    <div className="home-page">
      <h2>Current Devices</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Device Name"
            aria-label="Device Name"
            aria-describedby="button-addon2"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit" id="button-addon2">
            Add Device
          </button>
        </div>
      </form>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {devices.map((device) => (
          <div key={device._id} className="col">
            <div className="card h-100 border-dark">
              <div className="card-body">
                <h5 className="card-title">{device.DeviceName}</h5>
                <p className="card-text">Completion Percentage: {device.Status}%</p>
                <button onClick={() => handleRemove(device._id)} className="btn btn-danger">
                  Remove
                </button>
                <br />
                <Button
                  variant="primary"
                  onClick={() => handleViewTests(device._id)}
                >
                  View Tests
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDevice && (
        <TestModal
          deviceId={selectedDevice}
          deviceName={devices.find((device) => device._id === selectedDevice)?.DeviceName}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Home;
