import React, { useState } from 'react';
import axios from 'axios';

const AuthenticationComponent = () => {
    const [isBorrowerLoggedIn, setIsBorrowerLoggedIn] = useState(false);
    const [isUserAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [borrowerLoginData, setBorrowerLoginData] = useState({ email: '', password: '' });
    const [borrowerRegistrationData, setBorrowerRegistrationData] = useState({
        name: '',
        email: '',
        contactNumber: '',
        password: ''
    });
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

    const handleBorrowerLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/borrowers/get/${borrowerLoginData.email}`);
            if (response.status === 200) {
                const password = response.data;
                if (password.password === borrowerLoginData.password) {
                    setIsBorrowerLoggedIn(true);
                    setIsAdminLoggedIn(false);
                    showToast('Borrower login successful', 'success');
                } else {
                    showToast('Invalid credentials', 'error');
                }
            } else {
                showToast('Invalid credentials', 'error');
            }
        } catch (error) {
            console.error('Borrower login failed:', error);
            showToast('Error logging in', 'error');
        }
    };

    const handleBorrowerRegistration = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/borrowers/register', borrowerRegistrationData);
            if (response.status >= 200 && response.status < 300) {
                showToast('Borrower registration successful', 'success');
            } else {
                showToast('Failed to register borrower', 'error');
            }
        } catch (error) {
            console.error('Error registering borrower:', error);
            showToast('Error registering borrower', 'error');
        }
    };

    const handleAdminLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/api/auth/admin/${adminLoginData.email}`);
            if (response.data && response.data.password === adminLoginData.password) {
                setIsAdminLoggedIn(true);
                setIsBorrowerLoggedIn(false);
                showToast('Admin login successful', 'success');
            } else {
                showToast('Invalid credentials', 'error');
            }
        } catch (error) {
            console.error('Admin login failed:', error);
            showToast('Error logging in', 'error');
        }
    };

    const handleBorrowerLoginInputChange = (event) => {
        const { name, value } = event.target;
        setBorrowerLoginData({ ...borrowerLoginData, [name]: value });
    };

    const handleBorrowerRegistrationInputChange = (event) => {
        const { name, value } = event.target;
        setBorrowerRegistrationData({ ...borrowerRegistrationData, [name]: value });
    };

    const handleAdminInputChange = (event) => {
        const { name, value } = event.target;
        setAdminLoginData({ ...adminLoginData, [name]: value });
    };

    return (
        <div>
            <h2>Authentication</h2>
            <div>
                <h3>Borrower Login</h3>
                <form onSubmit={handleBorrowerLogin}>
                    <input type="email" name="email" placeholder="Email" value={borrowerLoginData.email} onChange={handleBorrowerLoginInputChange} />
                    <input type="password" name="password" placeholder="Password" value={borrowerLoginData.password} onChange={handleBorrowerLoginInputChange} />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div>
                <h3>Borrower Registration</h3>
                <form onSubmit={handleBorrowerRegistration}>
                    <input type="text" name="name" placeholder="Name" value={borrowerRegistrationData.name} onChange={handleBorrowerRegistrationInputChange} />
                    <input type="email" name="email" placeholder="Email" value={borrowerRegistrationData.email} onChange={handleBorrowerRegistrationInputChange} />
                    <input type="text" name="contactNumber" placeholder="Contact Number" value={borrowerRegistrationData.contactNumber} onChange={handleBorrowerRegistrationInputChange} />
                    <input type="password" name="password" placeholder="Password" value={borrowerRegistrationData.password} onChange={handleBorrowerRegistrationInputChange} />
                    <button type="submit">Register</button>
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
