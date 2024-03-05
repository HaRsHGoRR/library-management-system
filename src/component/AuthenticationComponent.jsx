import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AuthenticationComponent = () => {
    // State variables
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registrationData, setRegistrationData] = useState({ name: '', email: '', password: '' });
    const [passwordRecoveryData, setPasswordRecoveryData] = useState({ email: '' });
    const [isUserLogin, setIsUserLogin] = useState(false);

    // Function to handle user login
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
            console.log(response.data); // Handle successful login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    // Function to handle user registration
    const handleRegistration = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', registrationData);
            console.log(response.data); // Handle successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    // Function to handle password recovery
    const handlePasswordRecovery = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth/recover-password', passwordRecoveryData);
            console.log(response.data); // Handle successful password recovery
        } catch (error) {
            console.error('Password recovery failed:', error);
        }
    };

    // Toggle between user login and admin login
    const toggleLogin = () => {
        setIsUserLogin(!isUserLogin);
    };

    return (
        <div>
            <h2>Authentication</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                    <h3>Normal User Login</h3>
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                        <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                        <button type="submit">Login</button>
                    </form>
                    <Link to="/normal-user-registration">Register as Normal User</Link>
                </div>
                <div>
                    <h3>Admin Login</h3>
                    <form onSubmit={handleLogin}>
                        <input type="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                        <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                        <button type="submit">Login</button>
                    </form>
                    <Link to="/admin-registration">Register as Admin</Link>
                </div>
            </div>
        </div>
    );
};

export default AuthenticationComponent;
