import React, { useState } from "react";

const NotificationSettings = () => {
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    sms: false,
    inApp: true,
  });

  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;
    setNotificationPreferences((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div>
      <h2>Notification Settings</h2>
      <label>
        <input
          type="checkbox"
          name="email"
          checked={notificationPreferences.email}
          onChange={handlePreferenceChange}
        />
        Receive Email Notifications
      </label>
      <label>
        <input
          type="checkbox"
          name="sms"
          checked={notificationPreferences.sms}
          onChange={handlePreferenceChange}
        />
        Receive SMS Notifications
      </label>
      <label>
        <input
          type="checkbox"
          name="inApp"
          checked={notificationPreferences.inApp}
          onChange={handlePreferenceChange}
        />
        Receive In-App Notifications
      </label>
    </div>
  );
};

export default NotificationSettings;
