import React from "react";
import BookManagementComponent from "./BookManagementComponent";
import BorrowerManagementComponent from "./BorrowerManagementComponent";

const AdminPanelComponent = () => {
  const loggedin = sessionStorage.getItem('isBorrowerLoggedIn');
  if(!loggedin)
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
