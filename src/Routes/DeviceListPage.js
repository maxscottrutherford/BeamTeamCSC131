import React, { useState, useEffect, useContext } from 'react';
import { vendiaClient } from '../vendiaClient';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Context } from '../Context/AuthContext';

const TableDesign = () => {
    const { client } = vendiaClient();
    const { user } = useContext(Context);
    const [testData, setTestData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [editedData, setEditedData] = useState({});
    const [devices, setDevices] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState([]);

    useEffect(() => {
        const fetchDataFromTable = async () => {
            try {
                const response = await client.entities.test.list({ readMode: "NODE_LEDGERED" });
                setTestData(response.items);
                setFilteredData(response.items); // Initialize filteredData with all data
            } catch (error) {
                console.error('Error fetching data from table:', error);
            }
        };

        fetchDataFromTable();
    }, []);

    useEffect(() => {
        // Update filteredData whenever testData changes
        setFilteredData(testData);
    }, [testData]);

    useEffect(() => {
        // Fetch devices from the vendia API
        const fetchDevices = async () => {
            try {
                const response = await client.entities.device.list({ readMode: "NODE_LEDGERED" });
                setDevices(response.items);
            } catch (error) {
                console.error('Error fetching devices from Vendia:', error);
            }
        };

        fetchDevices();
    }, []);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchTerm(searchText);

        // Filter data based on search term and selected devices
        const filteredResults = testData.filter((item) =>
            Object.values(item).some(
                (value) =>
                    value &&
                    typeof value === 'string' &&
                    value.toLowerCase().includes(searchText)
            )
        );

        // Apply device filter
        if (selectedDevices.length > 0) {
            setFilteredData(filteredResults.filter((item) =>
                selectedDevices.includes(item.Device)
            ));
        } else {
            setFilteredData(filteredResults);
        }
    };

    const handleEdit = (index) => {
        setShowModal(true);
        setEditedData(filteredData[index]);
        setEditRowIndex(index);
    };

    const handleSave = async () => {
        const { _owner, _acl, ...updatedData } = editedData;
        const updatedTestData = [...testData];
        updatedTestData[editRowIndex] = updatedData;
        setTestData(updatedTestData);

        try {
            await client.entities.test.update(updatedData);
            const response = await client.entities.test.get(updatedData._id);
            const updatedTestDataAfterSave = updatedTestData.map((item) =>
                item._id === response._id ? response : item
            );
            setTestData(updatedTestDataAfterSave);
            setShowModal(false);
        } catch (error) {
            console.error('Error updating data in Vendia:', error);
        }
    };

    const handleDelete = async (index) => {
        const updatedTestData = [...testData];
        const deletedItem = updatedTestData.splice(index, 1)[0];
        setTestData(updatedTestData);

        try {
            await client.entities.test.remove(deletedItem._id);
        } catch (error) {
            console.error('Error deleting data in Vendia:', error);
        }
    };

    const handleDeviceChange = (deviceName) => {
        const updatedDevices = [...selectedDevices];
        const index = updatedDevices.indexOf(deviceName);

        if (index !== -1) {
            // Device is already selected, remove it
            updatedDevices.splice(index, 1);
        } else {
            // Device is not selected, add it
            updatedDevices.push(deviceName);
        }

        setSelectedDevices(updatedDevices);

        // Filter data based on search term and selected devices
        const filteredResults = testData.filter((item) =>
            Object.values(item).some(
                (value) =>
                    value &&
                    typeof value === 'string' &&
                    value.toLowerCase().includes(searchTerm)
            )
        );

        // Apply device filter
        if (updatedDevices.length > 0) {
            setFilteredData(filteredResults.filter((item) =>
                updatedDevices.includes(item.Device)
            ));
        } else {
            setFilteredData(filteredResults);
        }
    };

    const isAdmin = user && user.email.includes('admin');
    const userOrg = user ? user.email.split('@')[1] : '';
    console.log(userOrg);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mb-3">
                    <h1 className="text-center">Device Tests</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8" style={{ width: '100%', margin: '0 auto' }}>
                    <Form>
                        <Form.Group controlId="searchTerm">
                            <Form.Control
                                type="text"
                                placeholder="Search by Name"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </Form.Group>
                    </Form>
                    <div className="mb-3">
                        {devices.map((device, index) => (
                            <Form.Check
                                key={index}
                                type="checkbox"
                                label={device.DeviceName}
                                checked={selectedDevices.includes(device.DeviceName)}
                                onChange={() => handleDeviceChange(device.DeviceName)}
                                inline
                            />
                        ))}
                    </div>
                    <Table responsive striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Org Assignment</th>
                                <th>Name</th>
                                <th>Method</th>
                                <th>Notes</th>
                                <th>Completed</th>
                                <th>Updated By</th>
                                <th>Device</th>
                                {isAdmin && <th>Actions</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.TestID}</td>
                                    <td>{row.OrgAssignment}</td>
                                    <td>{row.TestName}</td>
                                    <td>{row.TestMethod}</td>
                                    <td>{row.Notes}</td>
                                    <td>{row.Completed ? 'Completed' : 'Not Completed'}</td>
                                    <td>{row.UpdatedBy}</td>
                                    <td>{row.Device}</td>
                                    {isAdmin && (
                                        <React.Fragment>
                                            <td>
                                                <Button variant="primary" onClick={() => handleEdit(index)}>
                                                    Update
                                                </Button>
                                            </td>
                                            <td>
                                                <Button variant="danger" onClick={() => handleDelete(index)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </React.Fragment>
                                    )}

                                    {!isAdmin && userOrg.toLowerCase().includes(row.OrgAssignment.toLowerCase()) && (
                                        <React.Fragment>
                                            <td>
                                                <Button variant="primary" onClick={() => handleEdit(index)}>
                                                    Update
                                                </Button>
                                            </td>
                                        </React.Fragment>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>ID</label>
                        <input
                            className="form-control"
                            value={editedData.TestID}
                            onChange={(e) => setEditedData({ ...editedData, TestID: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Org Assignment</label>
                        <input
                            className="form-control"
                            value={editedData.OrgAssignment}
                            onChange={(e) => setEditedData({ ...editedData, OrgAssignment: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            className="form-control"
                            value={editedData.TestName}
                            onChange={(e) => setEditedData({ ...editedData, TestName: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Method</label>
                        <input
                            className="form-control"
                            value={editedData.TestMethod}
                            onChange={(e) => setEditedData({ ...editedData, TestMethod: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Notes</label>
                        <input
                            className="form-control"
                            value={editedData.Notes}
                            onChange={(e) => setEditedData({ ...editedData, Notes: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Completed</label>
                        <input
                            type="checkbox"
                            checked={editedData.Completed}
                            onChange={(e) => setEditedData({ ...editedData, Completed: e.target.checked })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Updated By</label>
                        <input
                            className="form-control"
                            value={editedData.UpdatedBy}
                            onChange={(e) => setEditedData({ ...editedData, UpdatedBy: e.target.value })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default TableDesign;
