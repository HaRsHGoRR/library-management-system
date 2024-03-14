import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from './AuthState';
import { toast } from 'react-toastify';

const SearchComponent = () => {
    // State variables
    const isBorrowerLoggedIn = sessionStorage.getItem('isBorrowerLoggedIn');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    // Function to handle search
    const handleSearch = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/books/search?q=${searchQuery}`);
            setSearchResults(response.data); // Update search results state with fetched data
        } catch (error) {
            console.error('Search failed:', error);
        }
    };

    const handlePickBook = async (bookId) => {
        if (!isBorrowerLoggedIn) {
            toast('Please login');
            return;
        }
        try {
            // Include borrower information in the request body
            const borrowerData = JSON.parse(sessionStorage.getItem('borrowerData'));
            // Make API call to pick the selected book
            const response = await axios.post(`http://localhost:8080/api/books/${bookId}/borrow`, borrowerData);
            // Assuming the backend returns the updated book data
            const updatedBook = response.data;
            // Update search results by marking the book as unavailable
            const updatedResults = searchResults.map(book =>
                book.id === updatedBook.id ? updatedBook : book
            );
            setSearchResults(updatedResults);
        } catch (error) {
            console.error('Failed to pick the book:', error);
        }
    };

    useEffect(() => {
        console.log("Search results:", searchResults);
    }, [searchResults]);

    if (!isBorrowerLoggedIn) {
        return (<div>Please Login</div>);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ backgroundColor: '#f0f0f0', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', padding: '20px', maxWidth: '600px', width: '100%' }}>
                <h2 style={{ color: '#007bff', marginBottom: '20px', textAlign: 'center' }}>Search Books</h2>
                <form onSubmit={handleSearch} style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <input type="text" placeholder="Search by title, author, genre, etc." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginRight: '10px', width: '70%' }} />
                    <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Search</button>
                </form>
                <div>
                    <h3 style={{ color: '#007bff', textAlign: 'center' }}>Search Results</h3>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {searchResults.map((book) => (
                            <li key={book.id} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                                <div>
                                    <strong>{book.title}</strong> by {book.author}
                                    {book.available && <button onClick={() => handlePickBook(book.id)} style={{ marginLeft: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Pick</button>}
                                    {!book.available && <span style={{ marginLeft: '10px', color: 'red' }}>Book not available</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
