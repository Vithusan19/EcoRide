import React from 'react';
import '../styles/ConfirmModal.css';
import Modal from 'react-modal';
// const ConfirmModal = ({ ride, onConfirm, onCancel }) => {
//   const passengercost = ride?.passengercost || 0; // Default to 0 if ride is undefined
//   return (
//     <div className="confirm-modal-overlay">
//       <div className="confirm-modal">
//         <h2>Confirm Action</h2>
//         <p>For this request, the system will deduct Rs. {(passengercost) * 0.1} from your account.</p>
//         <p>Are you sure you want to proceed?</p>
//         <div className="confirm-modal-buttons">
//           <button className="confirm-modal-btn confirm" onClick={onConfirm}>
//             Confirm
//           </button>
//           <button className="confirm-modal-btn cancel" onClick={onCancel}>
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default ConfirmModal;
const ConfirmModal = ({ show, onConfirm, onCancel, action, ride, passengercost }) => {
  const deduction = (passengercost * 0.1).toFixed(2);  
  const message = action === 'accept' 
    ? `For this request, the system will deduct Rs. ${deduction} from your account`
    : `Are you sure you want to reject the request for the ride from ${ride.departurePoint} to ${ride.destinationPoint}?`;

  return (
    <Modal
      isOpen={show}
      onRequestClose={onCancel}
      contentLabel="Confirm Action"
      ariaHideApp={false}
    >
      <h2>Confirm {action.charAt(0).toUpperCase() + action.slice(1)}</h2>
      <p>{message}</p>
      
      <button onClick={onConfirm}>Yes</button>
      <button onClick={onCancel}>No</button>
    </Modal>
  );
};

export default ConfirmModal;