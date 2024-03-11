import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowerManagementComponent = () => {
    // State variables
    const [borrowers, setBorrowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newBorrowerData, setNewBorrowerData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        password: '' // New field for password
    });
    const [showAddForm, setShowAddForm] = useState(false);

    // Function to fetch borrowers from the backend
    useEffect(() => {
        fetchBorrowers();
    }, []);

    const fetchBorrowers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/borrowers/alll');
            setBorrowers(response.data);
            console.log(response.data);
        } catch (error) {
            setError('Error fetching borrowers. Please try again later.');
            console.error('Error fetching borrowers:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle removing a borrower
    const handleRemoveBorrower = async (borrowerId) => {
        try {
            await axios.delete(`http://localhost:8080/api/borrowers/delete/${borrowerId}`);
            const updatedBorrowers = borrowers.filter(borrower => borrower.id !== borrowerId);
            setBorrowers(updatedBorrowers);
        } catch (error) {
            setError('Error removing borrower. Please try again later.');
            console.error('Error removing borrower:', error);
        }
    };

    // Function to add a new borrower
    const handleAddBorrower = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/borrowers/register', newBorrowerData);
            setBorrowers([...borrowers, response.data]);
            setShowAddForm(false); // Close the form after adding borrower
            setNewBorrowerData({ name: '', email: '', contactNumber: '', password: '' }); // Reset form data
        } catch (error) {
            setError('Error adding borrower. Please try again later.');
            console.error('Error adding borrower:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Borrower Management</h2>
            <button onClick={() => setShowAddForm(true)}>Add Borrower</button>
            {showAddForm && (
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newBorrowerData.name}
                        onChange={(e) => setNewBorrowerData({ ...newBorrowerData, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newBorrowerData.email}
                        onChange={(e) => setNewBorrowerData({ ...newBorrowerData, email: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Contact Number"
                        value={newBorrowerData.contactNumber}
                        onChange={(e) => setNewBorrowerData({ ...newBorrowerData, contactNumber: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password" // New input for password
                        value={newBorrowerData.password}
                        onChange={(e) => setNewBorrowerData({ ...newBorrowerData, password: e.target.value })}
                    />
                    <button onClick={handleAddBorrower}>Add</button>
                </div>
            )}
            <ul>
                {borrowers.map((borrower) => (
                    <li key={borrower.id}>
                        <div>
                            <strong>Name:</strong> {borrower.name}<br />
                            <strong>Email:</strong> {borrower.email}<br />
                            <strong>Contact Number:</strong> {borrower.contactNumber}<br />
                            <strong>Book ID:</strong> {borrower.bookid}<br />
                        </div>
                        <button onClick={() => handleRemoveBorrower(borrower.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowerManagementComponent;
