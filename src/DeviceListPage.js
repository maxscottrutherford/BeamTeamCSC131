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
        <div>
            <h1 style={{ textAlign: 'center' }}>Table Example</h1>
            <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={handleSearch}
                style={{ margin: '10px' }}
            />
            <table>
                <thead>
                    <tr>
                        <th>Section ID</th>
                        <th>Org Assignment</th>
                        <th>Name</th>
                        <th>Method</th>
                        <th>Notes</th>
                        <th>Completed</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.sectionId}>
                            <td>{item.sectionId}</td>
                            <td>{item.orgAssignment}</td>
                            <td>{item.name}</td>
                            <td>{item.method}</td>
                            <td>{item.notes}</td>
                            <td>{item.completed ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
