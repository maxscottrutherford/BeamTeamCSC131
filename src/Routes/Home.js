import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { vendiaClient } from '../vendiaClient';
import '../Home.css'; // Import the CSS file for additional styling
import SummaryModal from './SummaryModal';
import { Context } from "../Context/AuthContext";
import { useContext } from "react";



const Home = () => {
  const { client } = vendiaClient();
  const { user } = useContext(Context); // Import Context from AuthContext
  const [devices, setDevices] = useState([]);
  const [deviceName, setDeviceName] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Add a new device to Vendia entities
      const response = await client.entities.device.add({
        DeviceName: deviceName,
        Status: 0, // Assuming completion percentage starts at 0
      });

      // Directly append the new device to the current state
      setDevices((prevDevices) => [
        ...prevDevices,
        {
          _id: response._id,
          DeviceName: deviceName,
          Status: 100,
        },
      ]);

      setDeviceName('');
    } catch (error) {
      console.error('Error adding device to Vendia:', error);
    }
  };

  const handleSummary = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setShowSummaryModal(true);
  };

  const handleRemove = async (deviceId) => {
    try {
      // Remove the device from Vendia entities
      await client.entities.device.remove(deviceId);

      // Update the state by removing the deleted device
      setDevices((prevDevices) => prevDevices.filter((device) => device._id !== deviceId));
    } catch (error) {
      console.error('Error removing device from Vendia:', error);
    }
  };

  useEffect(() => {
    const fetchDevicesFromTable = async () => {
      try {
        // Fetch the list of devices
        const devicesResponse = await client.entities.device.list({ readMode: "NODE_LEDGERED" });
        const devicesList = devicesResponse.items;

        // Calculate completion percentage for each device
        const devicesWithCompletion = await Promise.all(
          devicesList.map(async (device) => {
            // Fetch tests associated with the device
            const testsResponse = await client.entities.test.list({ readMode: "NODE_LEDGERED" });
            const deviceTests = testsResponse.items.filter((test) => test.Device === device.DeviceName);

            // Calculate completion percentage based on completed tests
            const completedTests = deviceTests.filter((test) => test.Completed);
            const completionPercentage = deviceTests.length > 0
              ? (completedTests.length / deviceTests.length) * 100
              : 100; // Set to 0% if no tests are assigned to the device

            return {
              ...device,
              Status: completionPercentage,
            };
          })
        );

        // Update the state with the new list of devices including completion percentage
        setDevices(devicesWithCompletion);
      } catch (error) {
        console.error('Error fetching data from table:', error);
      }
    };

    fetchDevicesFromTable();
  }, [client]);

  return (
    <div className="home-page">
      <h2>Current Devices</h2>
      {user && user.email.includes('admin') && (
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
      )}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {devices.map((device) => (
          <div key={device._id} className="col">
            <div className="card h-100 border-dark">
              <div className="card-body">
                <h5 className="card-title">{device.DeviceName}</h5>
                <p className="card-text">Completion Percentage: {device.Status}%</p>
                {user && user.email.includes('admin') && (
                  <>
                    <button
                      onClick={() => handleRemove(device._id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                    <br />
                  </>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => handleSummary(device.DeviceName)}
                >
                  Summary
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showSummaryModal && (
        <SummaryModal
          deviceId={selectedDeviceId}
          onHide={() => setShowSummaryModal(false)}
        />
      )}
    </div>
  );
};

export default Home;
