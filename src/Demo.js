import React, { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";

const {client} = vendiaClient();

export const Demo = () => {

    const [device, setDevice] = useState();
    const [testID, setTestID] = useState();
    const [orgAssignment, setOrgAssignment] = useState();
    const [testName, setTestName] = useState();
    const [testMethod, setTestMethod] = useState();
    const [notes, setNotes] = useState();
    const [testList, setTestList] = useState();

    useEffect(() => {
        const listTest = async () => {
            const listTestResponse= await client.entities.test.list();
            console.log(listTestResponse?.items);
            setTestList(listTestResponse?.items);
        }
    }, [])

    const addDevice = async () => {
        const addDeviceResponse = await client.entities.test.add({
            Device: device,
            TestName: testName
        })
        console.log(addDeviceResponse)
    }

    const handleDeviceChange = (event) => {
        setDevice(event.target.value);
    }

    const handleTestIDChange = (event) => {
        setTestID(parseInt(event.target.value));
    }

    const handleOrgAssignmentChange = (event) => {
        setOrgAssignment(event.target.value);
    }

    const handleTestNameChange = (event) => {
        setTestName(event.target.value);
    }

    const handleTestMethodChange = (event) => {
        setTestMethod(event.target.value);
    }

    const handleNotesChange = (event) => {
        setNotes(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addDevice()
    }

    return (
        <div>
            CSUS Fall 2023
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                        type="text" 
                        name ="Device"
                        placeholder="Device Name"
                        value={device}
                        onChange={handleDeviceChange}
                        />
                    </div>

                    <div>
                        <input 
                        type="text" 
                        name ="testID"
                        placeholder="Test ID (Integer)"
                        value={testID}
                        onChange={handleTestIDChange}
                        />
                    </div>

                    <div>
                        <input 
                        type="text" 
                        name ="orgAssignment"
                        placeholder="Organization"
                        value={orgAssignment}
                        onChange={handleOrgAssignmentChange}
                        />
                    </div>

                    <div>
                        <input 
                        type="text" 
                        name ="testName"
                        placeholder="Test Name"
                        value={testName}
                        onChange={handleTestNameChange}
                        />
                    </div>

                    <div>
                        <input 
                        type="text" 
                        name ="testMethod"
                        placeholder="Test Method"
                        value={testName}
                        onChange={handleTestMethodChange}
                        />
                    </div>

                    <div>
                        <input 
                        type="text" 
                        name ="notes"
                        placeholder="Notes"
                        value={notes}
                        onChange={handleNotesChange}
                        />
                    </div>

                    <input type="submit"/>
                </form>
                <div>
                    {testList?.map((item, index) => (
                        <div key={index}>
                            {item?.Device}
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    )
}

