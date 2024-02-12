import React, { useState } from 'react';
import axios from 'axios';

const AuthenticationComponent = () => {
    // State variables
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [registrationData, setRegistrationData] = useState({ name: '', email: '', password: '' });
    const [passwordRecoveryData, setPasswordRecoveryData] = useState({ email: '' });

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

    return (
        <div>
            <h2>Authentication</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                <input type="password" placeholder="Password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                <button type="submit">Login</button>
            </form>
            <form onSubmit={handleRegistration}>
                <input type="text" placeholder="Name" value={registrationData.name} onChange={(e) => setRegistrationData({ ...registrationData, name: e.target.value })} />
                <input type="email" placeholder="Email" value={registrationData.email} onChange={(e) => setRegistrationData({ ...registrationData, email: e.target.value })} />
                <input type="password" placeholder="Password" value={registrationData.password} onChange={(e) => setRegistrationData({ ...registrationData, password: e.target.value })} />
                <button type="submit">Register</button>
            </form>
            <form onSubmit={handlePasswordRecovery}>
                <input type="email" placeholder="Email" value={passwordRecoveryData.email} onChange={(e) => setPasswordRecoveryData({ ...passwordRecoveryData, email: e.target.value })} />
                <button type="submit">Recover Password</button>
            </form>
        </div>
    );
};

export default AuthenticationComponent;
