import React, { useEffect, useState } from "react";
import { vendiaClient } from "./vendiaClient";

const {client} = vendiaClient();

export const Demo = () => {

    const [device, setDevice] = useState();
    const [testName, setTestName] = useState();
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

    const handleTestNameChange = (event) => {
        setTestName(event.target.value);
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
                        value={device}
                        onChange={handleDeviceChange}
                        />
                    </div>

                    <div>
                        <input 
                        type="text" 
                        name ="testName"
                        value={testName}
                        onChange={handleTestNameChange}
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

