import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const containerStyle = {
    textAlign: 'center',
    margin: '50px auto',
    maxWidth: '600px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  };

  const titleStyle = {
    color: '#333',
    fontSize: '28px',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    color: '#666',
    fontSize: '16px',
    marginBottom: '30px',
  };

  const linkStyle = {
    display: 'block',
    color: '#007bff',
    fontSize: '18px',
    textDecoration: 'none',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to Library Management System</h1>
      <p style={paragraphStyle}>
        This is a  library management system. Click on the links below
        to access different functionalities.
      </p>
      <h2>Available Links:</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>
          <Link to="/book-management" style={linkStyle}>Book Management</Link>
        </li>
        <li>
          <Link to="/borrower-management" style={linkStyle}>Borrower Management</Link>
        </li>
        <li>
          <Link to="/authentication" style={linkStyle}>Authentication</Link>
        </li>
        <li>
          <Link to="/search" style={linkStyle}>Search</Link>
        </li>
        {/* <li>
          <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
        </li> */}
        <li>
          <Link to="/admin-panel" style={linkStyle}>Admin Panel</Link>
        </li>
        <li>
          <Link to="/notification-settings" style={linkStyle}>Notification Settings</Link>
        </li>
        <li>
          <Link to="/settings" style={linkStyle}>Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
