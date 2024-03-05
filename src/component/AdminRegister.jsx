import React, { useState } from 'react';
import axios from 'axios';

const AdminRegister = () => {
  const [adminData, setAdminData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (adminData.password !== adminData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      // Make API request to register admin
      const response = await axios.post('http://localhost:8080/api/auth/adminregister', adminData);
      console.log(response.data); // Handle successful registration
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={adminData.email}
            onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={adminData.password}
            onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={adminData.confirmPassword}
            onChange={(e) => setAdminData({ ...adminData, confirmPassword: e.target.value })}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default AdminRegister;
