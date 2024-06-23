
import React from 'react';
import '../styles/LogoutConfirmation.css';

const LogoutConfirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="logout-modal-content">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="modal-confirm" onClick={onConfirm}>Confirm</button>
          <button className="modal-cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
