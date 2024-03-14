import React, { useState, useEffect } from "react";
import axios from "axios";

const BookManagementComponent = () => {
  
  // State variables
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({ id: "", title: "", author: "", genre: "" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [deleteBookId, setDeleteBookId] = useState("");

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
      const newBookWithAvailability = { ...newBook, available: true }; // Add available: true property
      const response = await axios.post(
        `http://localhost:8080/api/books?id=${newBook.id}`, // Pass the ID as a query parameter in the URL
        newBookWithAvailability
      );
      setBooks([...books, response.data]);
      setNewBook({ id: "", title: "", author: "", genre: "" });
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

  useEffect(() => {
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8080/api/books/${deleteBookId}`);
        const updatedBooks = books.filter((book) => book.id !== parseInt(deleteBookId));
        setBooks(updatedBooks);
        setDeleteBookId(""); // Clear the input field after deletion
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    };
  
    if (deleteBookId !== "") {
      handleDelete();
    }
  }, [deleteBookId, books]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
     <div style={{ backdropFilter: 'blur(2px)', backgroundColor: 'rgba(0, 0, 0, 0.8)', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
  <h2 style={{ marginBottom: "20px", color: "#fff" }}>Book Management</h2>
</div>

  
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)',backdropFilter: 'blur(2px)', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
        <h3 style={{ color: "#fff" }}>Add a New Book</h3>
        <form onSubmit={handleAddBook}>
          <input
            type="text"
            placeholder="ID"
            value={newBook.id}
            onChange={(e) => setNewBook({ ...newBook, id: e.target.value })}
            style={{ marginBottom: "10px", backgroundColor: "#fff", color: "#000" }}
          />
          <input
            type="text"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            style={{ marginBottom: "10px", backgroundColor: "#fff", color: "#000" }}
          />
          <input
            type="text"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            style={{ marginBottom: "10px", backgroundColor: "#fff", color: "#000" }}
          />
          <input
            type="text"
            placeholder="Genre"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            style={{ marginBottom: "10px", backgroundColor: "#fff", color: "#000" }}
          />
          <button type="submit" style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Add Book</button>
        </form>
      </div>
  
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {books.map((book) => (
          <div key={book.id} style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)',backdropFilter: 'blur(2px)', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px", padding: "20px", marginBottom: "20px", marginRight: "20px" }}>
            <h3 style={{ color: "#fff" }}>{book.title}</h3>
            <p style={{ color: "#fff" }}>ID: {book.id}</p>
            <p style={{ color: "#fff" }}>Author: {book.author}</p>
            <p style={{ color: "#fff" }}>Genre: {book.genre}</p>
            <p style={{ color: "#fff" }}>Status: {book.available ? 'Available' : 'Not Available'}</p>
            <button onClick={() => setSelectedBook(book)} style={{ width: "100%", backgroundColor: "#ffc107", color: "#fff", border: "none", padding: "10px 0", borderRadius: "5px", cursor: "pointer", marginTop: "10px" }}>Edit</button>
          </div>
        ))}
      </div>
  
      {selectedBook && (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)',backdropFilter: 'blur(2px)', boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
          <h3 style={{ color: "#fff" }}>Edit Book</h3>
          <form onSubmit={handleUpdateBook}>
            <input
              type="text"
              placeholder="Title"
              value={selectedBook.title}
              onChange={(e) => setSelectedBook({ ...selectedBook, title: e.target.value })}
              style={{ marginBottom: "10px", backgroundColor: "#fff", color: "#000" }}
            />
            <input
              type="text"
              placeholder="Author"
              value={selectedBook.author}
              onChange={(e) => setSelectedBook({ ...selectedBook, author: e.target.value })}
              style={{ marginBottom: "10px", backgroundColor: "#fff", color: "#000" }}
            />
            <input
              type="text"
              placeholder="Genre"
              value={selectedBook.genre}
              onChange={(e) => setSelectedBook({ ...selectedBook, genre: e.target.value })}
              style={{ marginBottom: "10px", backgroundColor: "#fff", color: "#000" }}
            />
            <button type="submit" style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }}>Update</button>
            <button onClick={() => setSelectedBook(null)} style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
          </form>
          <button 
            onClick={() => { 
              setDeleteBookId(selectedBook.id); 
            }} 
            style={{ 
              backgroundColor: "#dc3545", 
              color: "#fff", 
              border: "none", 
              padding: "10px 20px", 
              borderRadius: "5px", 
              cursor: "pointer", 
              marginTop: "10px" 
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
  
};

export default BookManagementComponent;
