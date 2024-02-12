import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used for navigation

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Library Management System</h1>
      <div className="navigation-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/book-management">Book Management</Link>
        <Link to="/borrower-management">Borrower Management</Link>
        <Link to="/search">Search</Link>
        <Link to="/admin-panel">Admin Panel</Link>
        <Link to="/notification-settings">Notification Settings</Link>
        <Link to="/user-settings">User Settings</Link>
      </div>
    </div>
  );
};

export default Home;
