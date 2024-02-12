import React, { useState, useEffect } from "react";
import axios from "axios";

const BookManagementComponent = () => {
  // State variables
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ title: "", author: "", genre: "" });

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
  const handleAddBook = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/books",
        newBook,
      );
      setBooks([...books, response.data]);
      setNewBook({ title: "", author: "", genre: "" });
    } catch (error) {
      console.error("Error adding book:", error);
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
            {book.title} - {book.author} - {book.genre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookManagementComponent;
