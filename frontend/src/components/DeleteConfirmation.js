import React from 'react';
import '../styles/DeleteConfirmation.css'; // Assuming you have a CSS file for styling

const DeleteConfirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="delete-confirmation-overlay">
      <div className="delete-confirmation-popup">
        <div className="delete-confirmation-header">
          <h2>Confirmation</h2>
          <button className="close-btn" onClick={onCancel}>X</button>
        </div>
        <p>{message}</p>
        <div className="delete-confirmation-actions">
          <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
