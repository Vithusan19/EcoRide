import React, { useState } from 'react';
import '../styles/ConfirmModal.css';
import Modal from 'react-modal';

const ConfirmModal = ({ show, onConfirm, onCancel, action, ride, passengercost }) => {
  const [isChecked, setIsChecked] = useState(false); // State to manage checkbox

  const deduction = (passengercost * 0.1).toFixed(2);
  const message = action === 'accept' 
    ? `For this request, the system will deduct Rs. ${deduction} from your account`
    : `Are you sure you want to reject the request for the ride from ${ride.departurePoint} to ${ride.destinationPoint}?`;

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle checkbox state
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onCancel}
      contentLabel="Confirm Action"
      ariaHideApp={false}
    >
      <h2>Confirm {action.charAt(0).toUpperCase() + action.slice(1)}</h2>
      <p>{message}</p>

      <div className="terms-container">
        <label>
          <input 
            type="checkbox" 
            checked={isChecked} 
            onChange={handleCheckboxChange} 
            required // Ensures checkbox is required for form submission
          />
          I agree to the terms and conditions
        </label>
      </div>

      <div className="confirm-modal-buttons">
        <button onClick={onConfirm} disabled={!isChecked}>Yes</button> {/* Disable if checkbox is not checked */}
        <button onClick={onCancel}>No</button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
