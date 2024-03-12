import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from './AuthState';
import { toast } from 'react-toastify';

const SearchComponent = () => {
    const loggedin = sessionStorage.getItem('isBorrowerLoggedIn');
  if(!loggedin)
  {
    return(<>Please Login</>)
  }
    // State variables
    const  isBorrowerLoggedIn  = sessionStorage.getItem('isBorrowerLoggedIn');
    console.log("isBorrowerLoggedIn:", isBorrowerLoggedIn); 
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
            toast('please login')
            return;
        }
        try {
            // Include borrower information in the request body
            const borrowerData = JSON.parse(sessionStorage.getItem('borrowerData'));
    console.log(sessionStorage.getItem('borrowerData'))
            // Make API call to pick the selected book
            const response = await axios.post(`http://localhost:8080/api/books/${bookId}/borrow`, borrowerData);
            // Assuming the backend returns the updated book data
            const updatedBook = response.data;
            console.log(updatedBook)
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

    return (
        <div>
            <h2>Search Books</h2>
            <form onSubmit={handleSearch}>
                <input type="text" placeholder="Search by title, author, genre, etc." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit">Search</button>
            </form>
            <div>
                <h3>Search Results</h3>
                <ul>
                    {searchResults.map((book) => (
                        <li key={book.id}>
                            {book.title} by {book.author} 
                            {isBorrowerLoggedIn && book.available && <button onClick={() => handlePickBook(book.id)}>Pick</button>}
                            {!book.available && <span>Book not available</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchComponent;
