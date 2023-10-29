import React, { useEffect, useState } from "react";
import { vendiaClient } from "../vendiaClient";
import 'bootstrap/dist/css/bootstrap.min.css';

const { client } = vendiaClient();

export const Demo = () => {
    const [device, setDevice] = useState("");
    const [testID, setTestID] = useState("");
    const [orgAssignment, setOrgAssignment] = useState("");
    const [testName, setTestName] = useState("");
    const [testMethod, setTestMethod] = useState("");
    const [notes, setNotes] = useState("");
    const [testList, setTestList] = useState([]);

    useEffect(() => {
        const listTest = async () => {
            const listTestResponse = await client.entities.test.list();
            console.log(listTestResponse?.items);
            setTestList(listTestResponse?.items);
        };

        listTest();
    }, []);

    const addDevice = async () => {
        const addDeviceResponse = await client.entities.test.add({
            Device: device,
            TestID: testID,
            OrgAssignment: orgAssignment,
            TestName: testName,
            TestMethod: testMethod,
            Notes: notes
        });
        console.log(addDeviceResponse);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        addDevice();
    };

    const inputStyle = {
        maxWidth: '250px',
        padding: '5px',
        margin: '2px 0', // Reduced margin
        fontSize: '14px'
    };

    const buttonStyle = {
        maxWidth: '250px',
        padding: '5px',
        margin: '10px 0',
        fontSize: '14px'
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">CSUS Fall 2023</h2>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2 d-flex justify-content-center">
                            <input
                                className="form-control"
                                type="text"
                                name="Device"
                                placeholder="Device Name"
                                value={device}
                                onChange={(e) => setDevice(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div className="mb-2 d-flex justify-content-center">
                            <input
                                className="form-control"
                                type="number"
                                name="testID"
                                placeholder="Test ID (Integer)"
                                value={testID}
                                onChange={(e) => setTestID(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div className="mb-2 d-flex justify-content-center">
                            <input
                                className="form-control"
                                type="text"
                                name="orgAssignment"
                                placeholder="Organization"
                                value={orgAssignment}
                                onChange={(e) => setOrgAssignment(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div className="mb-2 d-flex justify-content-center">
                            <input
                                className="form-control"
                                type="text"
                                name="testName"
                                placeholder="Test Name"
                                value={testName}
                                onChange={(e) => setTestName(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div className="mb-2 d-flex justify-content-center">
                            <input
                                className="form-control"
                                type="text"
                                name="testMethod"
                                placeholder="Test Method"
                                value={testMethod}
                                onChange={(e) => setTestMethod(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div className="mb-2 d-flex justify-content-center">
                            <input
                                className="form-control"
                                type="text"
                                name="notes"
                                placeholder="Notes"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <input
                                className="btn btn-primary btn-block"
                                type="submit"
                                value="Submit"
                                style={buttonStyle}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="mt-4">
                {testList?.map((item, index) => (
                    <div key={index}>{item?.Device}</div>
                ))}
            </div>
        </div>
    );
};

export default Demo;
