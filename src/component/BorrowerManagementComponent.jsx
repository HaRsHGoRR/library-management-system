import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowerManagementComponent = () => {
    // State variables
    const [borrowers, setBorrowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch borrowers from the backend
    useEffect(() => {
        fetchBorrowers();
    }, []);

    const fetchBorrowers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/borrowers/alll');
            setBorrowers(response.data);
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

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '20px', color: '#fff' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(2px)' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#fff' }}>Borrower Management</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {borrowers.map((borrower) => (
                    <li key={borrower.id} style={{ backgroundColor: 'rgba(128, 128, 128, 0.5)', borderRadius: '5px', marginBottom: '10px', padding: '10px', color: '#f0f0f0' }}>

                        <div>
                            <strong>Name:</strong> {borrower.name}<br />
                            <strong>Email:</strong> {borrower.email}<br />
                            <strong>Contact Number:</strong> {borrower.contactNumber}<br />
                            <strong>Book ID:</strong> {borrower.bookid}<br />
                        </div>
                        <button onClick={() => handleRemoveBorrower(borrower.id)} style={{ backgroundColor: 'red', color: '#fff', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer' }}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowerManagementComponent;
