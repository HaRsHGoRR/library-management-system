import React, { useState } from 'react';
import axios from 'axios';
import { useAuthState } from './AuthState';
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
                    //setIsBorrowerLoggedIn(true);
                    setIsAdminLoggedIn(false);
                    sessionStorage.setItem('isBorrowerLoggedIn', 'true');
                    

                    // Assuming you have the logged-in borrower object stored in a variable named loggedInBorrower

// Convert the borrower object to a JSON string
                    const borrowerDataString = JSON.stringify(borrowerLoginData);
console.log(borrowerDataString)
// Set the borrower data string to the session storage
                    sessionStorage.setItem('borrowerData', borrowerDataString);







                    console.log(sessionStorage.getItem('isBorrowerLoggedIn'));
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
        // Check if any required field is empty
        if (!borrowerRegistrationData.name || !borrowerRegistrationData.email || !borrowerRegistrationData.contactNumber || !borrowerRegistrationData.password) {
            showToast('All fields are required', 'error');
            return;
        }
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
                console.log(isUserAdminLoggedIn);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Authentication</h2>
            <div style={{ backgroundColor: '#f0f0f0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', marginBottom: '20px', width: '400px' }}>
                <h3 style={{ marginBottom: '10px', color: '#007bff' }}>Borrower Login</h3>
                <form onSubmit={handleBorrowerLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type="email" name="email" placeholder="Email" value={borrowerLoginData.email} onChange={handleBorrowerLoginInputChange} style={{ marginBottom: '10px' }} />
                    <input type="password" name="password" placeholder="Password" value={borrowerLoginData.password} onChange={handleBorrowerLoginInputChange} style={{ marginBottom: '10px' }} />
                    <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                </form>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', marginBottom: '20px', width: '400px' }}>
                <h3 style={{ marginBottom: '10px', color: '#007bff' }}>Borrower Registration</h3>
                <form onSubmit={handleBorrowerRegistration} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type="text" name="name" placeholder="Name" value={borrowerRegistrationData.name} onChange={handleBorrowerRegistrationInputChange} style={{ marginBottom: '10px' }} />
                    <input type="email" name="email" placeholder="Email" value={borrowerRegistrationData.email} onChange={handleBorrowerRegistrationInputChange} style={{ marginBottom: '10px' }} />
                    <input type="text" name="contactNumber" placeholder="Contact Number" value={borrowerRegistrationData.contactNumber} onChange={handleBorrowerRegistrationInputChange} style={{ marginBottom: '10px' }} />
                    <input type="password" name="password" placeholder="Password" value={borrowerRegistrationData.password} onChange={handleBorrowerRegistrationInputChange} style={{ marginBottom: '10px' }} />
                    <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
                    <p style={{ marginTop: '10px', color: 'red', fontSize: '12px' }}>All fields are required</p>
                </form>
            </div>
            <div style={{ backgroundColor: '#f0f0f0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '20px', marginBottom: '20px', width: '400px' }}>
                <h3 style={{ marginBottom: '10px', color: '#007bff' }}>Admin Login</h3>
                <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type="email" name="email" placeholder="Email" value={adminLoginData.email} onChange={handleAdminInputChange} style={{ marginBottom: '10px' }} />
                    <input type="password" name="password" placeholder="Password" value={adminLoginData.password} onChange={handleAdminInputChange} style={{ marginBottom: '10px' }} />
                    <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}>Login</button>
                </form>
            </div>
            <div style={{ ...toastStyle }}>
                {toastMessage}
            </div>
        </div>
    );
    
};

export default AuthenticationComponent;

