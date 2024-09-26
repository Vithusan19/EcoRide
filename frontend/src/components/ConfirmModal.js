import React from 'react';
import '../styles/ConfirmModal.css';

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="confirm-modal-overlay">
      <div className="confirm-modal">
        <h2>Confirm Action</h2>
        <p>For this request, the system will deduct Rs. 50 from your account.</p>
        <p>Are you sure you want to proceed?</p>
        <div className="confirm-modal-buttons">
          <button className="confirm-modal-btn confirm" onClick={onConfirm}>
            Confirm
          </button>
          <button className="confirm-modal-btn cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
