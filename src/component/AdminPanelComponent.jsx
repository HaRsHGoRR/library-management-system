import React from "react";
import BookManagementComponent from "./BookManagementComponent";
import BorrowerManagementComponent from "./BorrowerManagementComponent";

const AdminPanelComponent = () => {
  return (
    <div>
      <h2>Admin Panel</h2>
      <BookManagementComponent />
      <BorrowerManagementComponent />
    </div>
  );
};

export default AdminPanelComponent;
