import React, { useState, useEffect } from "react";
import axios from "axios";

const BookManagementComponent = () => {
  // State variables
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "" });
  const [selectedBook, setSelectedBook] = useState(null);

  // Function to fetch books from the backend
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Function to handle form submission for adding a new book
  // Function to handle form submission for adding a new book
const handleAddBook = async (event) => {
  event.preventDefault();
  try {
    const newBookWithAvailability = { ...newBook, available: true }; // Set available to true
    const response = await axios.post(
      "http://localhost:8080/api/books",
      newBookWithAvailability // Send the modified book object with availability set to true
    );
    setBooks([...books, response.data]);
    setNewBook({ title: "", author: "", genre: "" });
  } catch (error) {
    console.error("Error adding book:", error);
  }
};


  // Function to handle updating a book
  const handleUpdateBook = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/books/${selectedBook.id}`,
        selectedBook
      );
      const updatedBooks = books.map((book) =>
        book.id === selectedBook.id ? response.data : book
      );
      setBooks(updatedBooks);
      setSelectedBook(null);
    } catch (error) {
      console.error("Error updating book:", error);
    }
  };

  // Function to handle deleting a book
  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/books/${id}`);
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h2>Book Management</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
        />
        <button type="submit">Add Book</button>
      </form>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
          {book.id} - {book.title} - {book.author} - {book.genre} - {book.available ? 'Available' : 'Not Available'}
          <button onClick={() => setSelectedBook(book)}>Edit</button>
          <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
        </li>
        
        ))}
      </ul>
      {selectedBook && (
        <div>
          <h2>Edit Book</h2>
          <form onSubmit={handleUpdateBook}>
            <input
              type="text"
              placeholder="Title"
              value={selectedBook.title}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Author"
              value={selectedBook.author}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, author: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Genre"
              value={selectedBook.genre}
              onChange={(e) =>
                setSelectedBook({ ...selectedBook, genre: e.target.value })
              }
            />
            <button type="submit">Update</button>
            <button onClick={() => setSelectedBook(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookManagementComponent;
