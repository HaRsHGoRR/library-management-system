import React from "react";
import BookManagementComponent from "./BookManagementComponent";
import BorrowerManagementComponent from "./BorrowerManagementComponent";

const AdminPanelComponent = () => {
  const aloggedin = sessionStorage.getItem('isAdminLoggedIn');
  if (!aloggedin) {
    alert('Please Login');
    window.location.href = 'http://localhost:3000'; // Redirect back to localhost:3000 after the alert is closed
    return <div>Please Login</div>;
}
  if(!aloggedin)
  {
    return(<>Please Login</>)
  }
  return (
    <div>
      <h2>Admin Panel</h2>
      <BookManagementComponent />
      <BorrowerManagementComponent />
    </div>
  );
};

export default AdminPanelComponent;
