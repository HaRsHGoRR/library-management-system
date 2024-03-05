import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AuthenticationComponent = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleUserLogin = async (event) => {
        event.preventDefault();
        try {
            // Make API request to authenticate normal user
            const response = await axios.post('http://localhost:8080/api/auth/user/login', loginData);
            setIsUserLoggedIn(true);
            console.log(response.data); // Handle successful user login
        } catch (error) {
            console.error('User login failed:', error);
        }
    };

    const handleAdminLogin = async (event) => {
        event.preventDefault();
        try {
            // Make API request to authenticate admin
            const response = await axios.post('http://localhost:8080/api/auth/admin/login', loginData);
            setIsAdminLoggedIn(true);
            console.log(response.data); // Handle successful admin login
        } catch (error) {
            console.error('Admin login failed:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLoginData({ ...loginData, [name]: value });
    };

    return (
        <div>
            <h2>Authentication</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <h3>Normal User Login</h3>
                    <form onSubmit={handleUserLogin}>
                        <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleInputChange} />
                        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleInputChange} />
                        <button type="submit">Login</button>
                    </form>
                    <Link to="/normal-user-registration">Register as Normal User</Link>
                </div>
                <div>
                    <h3>Admin Login</h3>
                    <form onSubmit={handleAdminLogin}>
                        <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={handleInputChange} />
                        <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleInputChange} />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationComponent;
