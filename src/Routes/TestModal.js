// TestModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Table } from 'react-bootstrap';
import { vendiaClient } from '../vendiaClient';

const TestModal = ({ deviceId, deviceName, onClose }) => {
    const { client } = vendiaClient();
    const [tests, setTests] = useState([]);

    useEffect(() => {
        const fetchTestsForDevice = async () => {
            try {
                const response = await client.entities.test.list({ readMode: "NODE_LEDGERED" });
                const testsForDevice = response.items.filter((test) => test.Device === deviceName);
                setTests(testsForDevice);
            } catch (error) {
                console.error('Error fetching tests for device:', error);
            }
        };

        fetchTestsForDevice();
    }, [client, deviceName]);

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Tests for Device: {deviceName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {tests.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Test ID</th>
                                <th>Org Assignment</th>
                                <th>Test Name</th>
                                <th>Test Method</th>
                                {/* Add more table headers based on your Test schema */}
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test) => (
                                <tr key={test.TestID}>
                                    <td>{test.TestID}</td>
                                    <td>{test.OrgAssignment}</td>
                                    <td>{test.TestName}</td>
                                    <td>{test.TestMethod}</td>
                                    {/* Add more table data based on your Test schema */}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p>No tests found for the selected device.</p>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default TestModal;
