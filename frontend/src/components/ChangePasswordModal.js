import React, { useState } from "react";
import axios from "axios";

const ChangePasswordModal = ({ onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
  
    try {
      const url = "http://localhost/ecoRide-Backend/Connection/User/Changepassword.php";
      let fdata = new FormData();
      fdata.append("userID", sessionStorage.getItem("UserID"));
      fdata.append("currentPassword", currentPassword);
      fdata.append("newPassword", newPassword);
  
      const response = await axios.post(url, fdata);
      console.log(response.data);
  
      if (response.data.success) {
        onSave(); // Call onSave to close the modal
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Error changing password.");
    }
  };
  
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Change Password</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </label>
        <label>
          Confirm New Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
