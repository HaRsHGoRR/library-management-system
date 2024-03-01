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
            const response = await axios.get('http://localhost:8080/api/borrowers/withBooks'); // Adjusted URL
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
            await axios.delete(`http://localhost:8080/api/borrowers/delete/${borrowerId}`); // Adjusted URL
            const updatedBorrowers = borrowers.filter(borrower => borrower.id !== borrowerId);
            setBorrowers(updatedBorrowers);
        } catch (error) {
            setError('Error removing borrower. Please try again later.');
            console.error('Error removing borrower:', error);
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
            <ul>
                {borrowers.map((borrower) => (
                    <li key={borrower.id}>
                        <div>
                            <strong>Name:</strong> {borrower.name}<br />
                            <strong>Email:</strong> {borrower.email}<br />
                            <strong>Contact Number:</strong> {borrower.contactNumber}<br />
                            <strong>Books Borrowed:</strong>
                            <ul>
                                {borrower.booksBorrowed.map((book) => (
                                    <li key={book.id}>{book.title} by {book.author}</li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => handleRemoveBorrower(borrower.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BorrowerManagementComponent;
