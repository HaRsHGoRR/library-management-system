import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const loggedin = sessionStorage.getItem('isBorrowerLoggedIn');
  if (!loggedin) {
    return (<div>Please Login</div>);
  }

  const containerStyle = {
    textAlign: 'center',
    margin: '50px auto',
    maxWidth: '600px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backdropFilter: 'blur(2px)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#fff',
  };

  const titleStyle = {
    fontSize: '28px',
    marginBottom: '20px',
  };

  const paragraphStyle = {
    fontSize: '16px',
    marginBottom: '30px',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '18px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginBottom: '10px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Welcome to Library Management System</h1>
      <p style={paragraphStyle}>
        This is a library management system. Click on the buttons below
        to access different functionalities.
      </p>
      <div>
        <button style={buttonStyle}>
          <Link to="/search" style={{ color: '#fff', textDecoration: 'none' }}>Search Books</Link>
        </button>
      </div>
      <div>
        <button style={buttonStyle}>
          <Link to="/admin-panel" style={{ color: '#fff', textDecoration: 'none' }}>Admin Panel</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
