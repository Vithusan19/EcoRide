import React from "react";
import "../styles/EditProfileModal.css"; // Import the CSS for styling

const EditProfileModal = ({ formData, onChange, onSave, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onCancel}>X</button>
        <h2>Edit Profile</h2>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
          />
        </label>
        <label>
          Phone number:
          <input
            type="text"
            name="phoneno"
            value={formData.phoneno}
            onChange={onChange}
          />
        </label>
        <label>
          NIC Number:
          <input
            type="text"
            name="nicno"
            value={formData.nicno}
            onChange={onChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={onChange}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
