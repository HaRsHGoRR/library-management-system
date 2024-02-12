import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowerManagementComponent = () => {
    // State variables
    const [borrowers, setBorrowers] = useState([]);
    const [newBorrower, setNewBorrower] = useState({ name: '', email: '', membershipType: '' });

    // Function to fetch borrowers from the backend
    useEffect(() => {
        fetchBorrowers();
    }, []);

    const fetchBorrowers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/borrowers');
            setBorrowers(response.data);
        } catch (error) {
            console.error('Error fetching borrowers:', error);
        }
    };

    // Function to handle form submission for adding a new borrower
    const handleAddBorrower = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/borrowers', newBorrower);
            setBorrowers([...borrowers, response.data]);
            setNewBorrower({ name: '', email: '', membershipType: '' });
        } catch (error) {
            console.error('Error adding borrower:', error);
        }
    };

    return (
        <div>
            <h2>Borrower Management</h2>
            <form onSubmit={handleAddBorrower}>
                <input type="text" placeholder="Name" value={newBorrower.name} onChange={(e) => setNewBorrower({ ...newBorrower, name: e.target.value })} />
                <input type="email" placeholder="Email" value={newBorrower.email} onChange={(e) => setNewBorrower({ ...newBorrower, email: e.target.value })} />
                <input type="text" placeholder="Membership Type" value={newBorrower.membershipType} onChange={(e) => setNewBorrower({ ...newBorrower, membershipType: e.target.value })} />
                <button type="submit">Add Borrower</button>
            </form>
            <ul>
                {borrowers.map((borrower) => (
                    <li key={borrower.id}>
                        {borrower.name} - {borrower.email} - {borrower.membershipType}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowerManagementComponent;
