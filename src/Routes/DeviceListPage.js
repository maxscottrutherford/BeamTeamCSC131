import React, { useState } from 'react';

const DummyData = [
    {
        sectionId: 1,
        orgAssignment: 'Org 1',
        name: 'John Doe',
        method: 'Method A',
        notes: 'Lorem ipsum dolor sit amet',
        completed: true,
    },
    {
        sectionId: 2,
        orgAssignment: 'Org 2',
        name: 'Jane Smith',
        method: 'Method B',
        notes: 'Consectetur adipiscing elit',
        completed: false,
    },
    // Add more dummy data entries here
];

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(DummyData);

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredResults = DummyData.filter((item) =>
            item.name.toLowerCase().includes(searchText)
        );
        setSearchTerm(searchText);
        setFilteredData(filteredResults);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mb-3">
                    <h1 className="text-center">Device Table</h1>
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
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}>Section ID</th>
                            <th style={{ border: '1px solid black' }}>Org Assignment</th>
                            <th style={{ border: '1px solid black' }}>Name</th>
                            <th style={{ border: '1px solid black' }}>Method</th>
                            <th style={{ border: '1px solid black' }}>Notes</th>
                            <th style={{ border: '1px solid black' }}>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item) => (
                            <tr key={item.sectionId}>
                                <td style={{ border: '1px solid black' }}>{item.sectionId}</td>
                                <td style={{ border: '1px solid black' }}>{item.orgAssignment}</td>
                                <td style={{ border: '1px solid black' }}>{item.name}</td>
                                <td style={{ border: '1px solid black' }}>{item.method}</td>
                                <td style={{ border: '1px solid black' }}>{item.notes}</td>
                                <td style={{ border: '1px solid black' }}>{item.completed ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
        
    );
}

export default App;
