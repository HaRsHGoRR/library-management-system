import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: "Harsh",
    lastName: "Gor",
    email: "harsh.gor@example.com",
    // Other profile fields
  });

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Logic to save updated profile data via API call
  };

  return (
    <div>
      <h2>Profile Settings</h2>
      <label>
        First Name:
        <input
          type="text"
          name="firstName"
          value={profile.firstName}
          onChange={handleProfileChange}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          name="lastName"
          value={profile.lastName}
          onChange={handleProfileChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleProfileChange}
        />
      </label>
      <button onClick={handleSaveProfile}>Save Changes</button>
    </div>
  );
};

export default Settings;
