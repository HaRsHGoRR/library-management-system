import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import BookManagementComponent from './component/BookManagementComponent';
import BorrowerManagementComponent from './component/BorrowerManagementComponent';
import AuthenticationComponent from './component/AuthenticationComponent';
import SearchComponent from './component/SearchComponent';
// import DashboardComponent from './component/DashboardComponent';
import AdminPanelComponent from './component/AdminPanelComponent';
import NotificationSettings from './component/NotificationSettings';
import Settings from './component/Settings';
import NormalUserRegister from './component/NormalUserRegister';
import AdminRegister from './component/AdminRegister';
import { useAuthState } from './component/AuthState';

function App() {
  const { isBorrowerLoggedIn, setIsBorrowerLoggedIn, isUserAdminLoggedIn, setIsAdminLoggedIn } = useAuthState();
  return (
    <div style={{
      backgroundImage: 'url("https://i0.wp.com/www.studentprojects.live/wp-content/uploads/2022/02/Library-Management-System.jpg?fit=2057%2C1206&ssl=1")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      width: '100vw',
      height: '100vh',
      position: 'fixed',
      overflow: 'auto'
    }}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthenticationComponent />} />
          <Route path="/book-management" element={<BookManagementComponent />} />
          <Route path="/borrower-management" element={<BorrowerManagementComponent />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchComponent />} />
          {/* <Route path="/dashboard" element={<DashboardComponent />} /> */}
          <Route path="/admin-panel" element={<AdminPanelComponent />} />
          <Route path="/notification-settings" element={<NotificationSettings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path='/normal-user-registration' element={<NormalUserRegister />}/>
          <Route path='/admin-registration' element={<AdminRegister />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
