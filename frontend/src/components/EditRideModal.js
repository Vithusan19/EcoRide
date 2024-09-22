import React from "react";
import "../styles/EditProfileModal.css"; 

const EditRideModal = ({ formData, onChange, onSave, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onCancel}>X</button>
        <h2>Edit Ride Details</h2>
      
        <label>
          Departure Time:
          <input
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={onChange}
          />
        </label>
        <label>
          Destination Time:
          <input
            type="time"
            name="destinationTime"
            value={formData.destinationTime}
            onChange={onChange}
          />
        </label>
        <label>
          Available Seats:
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
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

export default EditRideModal;
