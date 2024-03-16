import React from 'react'
import { useEffect } from 'react';

const Logout = () => {


  useEffect(() => {
    // Clear the logged-in status
    sessionStorage.setItem('isBorrowerLoggedIn', 'false');
    // Redirect to the login page
    window.location.href = 'http://localhost:3000'; // Update this to the actual login page URL
}, []);
  return (
    <div>U are successfully logged out</div>
  )
}

export default Logout