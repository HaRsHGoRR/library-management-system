import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from './AuthState';
import { Link } from 'react-router-dom';

const AuthenticationComponent = () => {
    const { isBorrowerLoggedIn, setIsBorrowerLoggedIn, isUserAdminLoggedIn, setIsAdminLoggedIn } = useAuthState();

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
    const [showBorrowerRegistration, setShowBorrowerRegistration] = useState(false);
    const [showBorrowerLoginForm, setShowBorrowerLoginForm] = useState(true);

    const showToast = (message, type) => {
        setToastMessage(message);
        setToastStyle({
            display: 'block',
            backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
            position: 'fixed',
            top: '10px',
            right: '10px',
            padding: '10px',
            borderRadius: '4px',
            color: '#fff',
            zIndex: '9999'
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
                    setIsAdminLoggedIn(false);
                    setIsBorrowerLoggedIn(true);
                    sessionStorage.setItem('isBorrowerLoggedIn', 'true');
                    const borrowerDataString = JSON.stringify(borrowerLoginData);
                    sessionStorage.setItem('borrowerData', borrowerDataString);
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
        if (!borrowerRegistrationData.name || !borrowerRegistrationData.email || !borrowerRegistrationData.contactNumber || !borrowerRegistrationData.password) {
            showToast('All fields are required', 'error');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/borrowers/register', borrowerRegistrationData);
            if (response.status >= 200 && response.status < 300) {
                showToast('Borrower registration successful', 'success');
                setShowBorrowerLoginForm(true);
                setShowBorrowerRegistration(false);
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

    const handleShowRegistration = () => {
        setShowBorrowerRegistration(!showBorrowerRegistration);
        setShowBorrowerLoginForm(!showBorrowerLoginForm);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(2px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', width: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: '#fff' }}>Authentication</h2>

            <div style={{ display: 'flex', justifyContent: 'space-between', width: '800px' }}>
                {showBorrowerLoginForm && (
                    <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.6)',backdropFilter: 'blur(2px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', marginBottom: '20px', width: '380px', marginRight: '20px', transformStyle: 'preserve-3d', transform: showBorrowerRegistration ? 'rotateY(180deg)' : 'none', transition: 'transform 0.8s' }}>
                        <h3 style={{ marginBottom: '10px', color: '#007bff' }}>Borrower Login</h3>
                        <form onSubmit={handleBorrowerLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                            <input type="email" name="email" placeholder="Email" value={borrowerLoginData.email} onChange={handleBorrowerLoginInputChange} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="password" name="password" placeholder="Password" value={borrowerLoginData.password} onChange={handleBorrowerLoginInputChange} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                            <p style={{ marginTop: '10px', fontSize: '14px', color: '#007bff', cursor: 'pointer' }} onClick={handleShowRegistration}>Not registered? Register here.</p>
                        </form>
                    </div>
                )}
                {showBorrowerRegistration && (
                    <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.6)',backdropFilter: 'blur(2px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', marginBottom: '20px', width: '380px', marginRight: '20px', transformStyle: 'preserve-3d', transform: showBorrowerLoginForm ? 'rotateY(180deg)' : 'none', transition: 'transform 0.8s' }}>
                        <h3 style={{ marginBottom: '10px', color: '#007bff' }}>Borrower Registration</h3>
                        <form onSubmit={handleBorrowerRegistration} style={{ display: 'flex', flexDirection: 'column' }}>
                            <input type="text" name="name" placeholder="Name" value={borrowerRegistrationData.name} onChange={handleBorrowerRegistrationInputChange} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="email" name="email" placeholder="Email" value={borrowerRegistrationData.email} onChange={handleBorrowerRegistrationInputChange} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="text" name="contactNumber" placeholder="Contact Number" value={borrowerRegistrationData.contactNumber} onChange={handleBorrowerRegistrationInputChange} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <input type="password" name="password" placeholder="Password" value={borrowerRegistrationData.password} onChange={handleBorrowerRegistrationInputChange} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                            <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
                            <p style={{ marginTop: '10px', fontSize: '14px', color: '#007bff', cursor: 'pointer' }} onClick={handleShowRegistration}>Click here to login</p>
                        </form>
                    </div>
                )}
                <div style={{ backgroundColor: 'rgba(128, 128, 128, 0.6)',backdropFilter: 'blur(2px)', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', marginBottom: '20px', width: '380px' }}>
                    <h3 style={{ marginBottom: '10px', color: '#007bff' }}>Admin Login</h3>
                    <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                        <input type="email" name="email" placeholder="Email" value={adminLoginData.email} onChange={handleAdminInputChange} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        <input type="password" name="password" placeholder="Password" value={adminLoginData.password} onChange={handleAdminInputChange} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                    </form>
                </div>
            </div>
            <Link to="/home" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '20px', textDecoration: 'none' }}>Go to Home</Link>
            <div style={{ ...toastStyle }}>
                {toastMessage}
            </div>
        </div>
        </div>
        </div>
    );
};

export default AuthenticationComponent;
