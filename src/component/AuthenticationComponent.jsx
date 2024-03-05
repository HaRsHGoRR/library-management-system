import React, { useState } from 'react';
import axios from 'axios';

const AuthenticationComponent = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [isUserAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [userLoginData, setUserLoginData] = useState({ email: '', password: '' });
    const [adminLoginData, setAdminLoginData] = useState({ email: '', password: '' });
    const [toastMessage, setToastMessage] = useState('');
    const [toastStyle, setToastStyle] = useState({});

    const showToast = (message, type) => {
        setToastMessage(message);
        setToastStyle({
            display: 'block',
            backgroundColor: type === 'success' ? '#28a745' : '#dc3545'
        });
        setTimeout(() => {
            setToastStyle({ display: 'none' });
        }, 3000);
    };

    const handleUserLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/user/${userLoginData.email}`);
            if (response.data && response.data.password === userLoginData.password) {
                setIsUserLoggedIn(true);
                setIsAdminLoggedIn(false);
                showToast('User login successful', 'success');
            } else {
                showToast('Invalid credentials', 'error');
            }
        } catch (error) {
            console.error('User login failed:', error);
            showToast('Error logging in', 'error');
        }
    };

    const handleAdminLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/admin/${adminLoginData.email}`);
            if (response.data && response.data.password === adminLoginData.password) {
                setIsAdminLoggedIn(true);
                setIsUserLoggedIn(false);
                showToast('Admin login successful', 'success');
            } else {
                showToast('Invalid credentials', 'error');
            }
        } catch (error) {
            console.error('Admin login failed:', error);
            showToast('Error logging in', 'error');
        }
    };


    const handleUserInputChange = (event) => {
        const { name, value } = event.target;
        setUserLoginData({ ...userLoginData, [name]: value });
    };

    const handleAdminInputChange = (event) => {
        const { name, value } = event.target;
        setAdminLoginData({ ...adminLoginData, [name]: value });
    };

    return (
        <div>
            <h2>Authentication</h2>
            <div>
                <h3>Normal User Login</h3>
                <form onSubmit={handleUserLogin}>
                    <input type="email" name="email" placeholder="Email" value={userLoginData.email} onChange={handleUserInputChange} />
                    <input type="password" name="password" placeholder="Password" value={userLoginData.password} onChange={handleUserInputChange} />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <h3>Admin Login</h3>
                <form onSubmit={handleAdminLogin}>
                    <input type="email" name="email" placeholder="Email" value={adminLoginData.email} onChange={handleAdminInputChange} />
                    <input type="password" name="password" placeholder="Password" value={adminLoginData.password} onChange={handleAdminInputChange} />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div style={{ ...toastStyle, position: 'fixed', top: '10px', right: '10px', padding: '10px', borderRadius: '4px', color: '#fff' }}>
                {toastMessage}
            </div>
        </div>
    );
};

export default AuthenticationComponent;
