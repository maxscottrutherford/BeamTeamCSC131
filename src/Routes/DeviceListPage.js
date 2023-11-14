import React, { useState, useEffect } from 'react';
import { vendiaClient } from '../vendiaClient';
import { Table, Button, Modal } from 'react-bootstrap';

const TableDesign = () => {
    const { client } = vendiaClient();
    const [testData, setTestData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editRowIndex, setEditRowIndex] = useState(null);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        const fetchDataFromTable = async () => {
            try {
                const response = await client.entities.test.list();
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

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        setSearchTerm(searchText);

        // Filter data based on search term
        const filteredResults = testData.filter((item) =>
            Object.values(item).some(
                (value) =>
                    value &&
                    typeof value === 'string' &&
                    value.toLowerCase().includes(searchText)
            )
        );

        setFilteredData(filteredResults);
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

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mb-3">
                    <h1 className="text-center">Device Tests</h1>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <input
                        className="form-control mb-3"
                        type="text"
                        placeholder="Search by Name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
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
                                <th>Device</th> {/* Add this header for the Device attribute */}
                                <th>Edit</th>
                                <th>Delete</th>
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
                                    <td>{row.Device}</td> {/* Display the Device attribute here */}
                                    <td>
                                        <Button variant="primary" onClick={() => handleEdit(index)}>
                                            Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={() => handleDelete(index)}>
                                            Delete
                                        </Button>
                                    </td>
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