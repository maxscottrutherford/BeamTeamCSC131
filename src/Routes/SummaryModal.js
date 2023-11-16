import React, { useState, useEffect } from 'react';
import { vendiaClient } from '../vendiaClient';
import { Modal, Button, ProgressBar } from 'react-bootstrap';

const SummaryModal = ({ deviceId, onHide }) => {
    const { client } = vendiaClient();
    const [completedTests, setCompletedTests] = useState(0);
    const [incompleteTests, setIncompleteTests] = useState(0);
    const [totalTests, setTotalTests] = useState(0);

    useEffect(() => {
        const fetchTestsForDevice = async () => {
            try {
                // Fetch tests associated with the specific device
                const testsResponse = await client.entities.test.list({ readMode: "NODE_LEDGERED" });
                const testsList = testsResponse.items;

                // Filter tests for the specified device
                const testsForDevice = testsList.filter((test) => test.Device === deviceId);

                let completedTestsCount = 0;
                let incompleteTestsCount = 0;

                testsForDevice.forEach((test) => {
                    // Check if the test is completed or not
                    if (test.Completed) {
                        completedTestsCount += 1;
                    } else {
                        incompleteTestsCount += 1;
                    }
                });

                // Update state with the counts
                setCompletedTests(completedTestsCount);
                setIncompleteTests(incompleteTestsCount);
                setTotalTests(testsForDevice.length);
            } catch (error) {
                console.error('Error fetching tests response:', error);
            }
        };

        fetchTestsForDevice();
    }, [client, deviceId]);

    const calculateOverallPercentage = () => {
        const total = totalTests;
        const completed = completedTests;
        return total === 0 ? 0 : (completed / total) * 100;
    };

    return (
        <Modal show={true} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Summary</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <p>
                        <strong>Total Number of Tests Assigned:</strong> {totalTests}
                    </p>
                    <p>
                        <strong>Tests Completed:</strong> {completedTests}
                    </p>
                    <p>
                        <strong>Tests Incompleted:</strong> {incompleteTests}
                    </p>
                    <ProgressBar now={calculateOverallPercentage()} label={`${calculateOverallPercentage()}%`} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SummaryModal;
