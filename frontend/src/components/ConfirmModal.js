import React from 'react';
import '../styles/ConfirmModal.css';
import axios from 'axios';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmModal = ({ show, onConfirm, onCancel, action, ride, passengercost }) => {
  const deduction = (passengercost * 0.1).toFixed(2);  
  const message = action === 'accept' 
    ? `For this request, the system will deduct Rs. ${deduction} from your account`
    : `Are you sure you want to reject the request for the ride from ${ride.departurePoint} to ${ride.destinationPoint}?`;

    
    const handleConfirm = async (Bookid) => {
      const loadingToast = toast.loading("Processing request...");
      try {
        const Data = new FormData();
        Data.append("BookingID", Bookid); // send the bookingId
        console.log("BookingID:", Bookid);
        const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/Deduction.php', Data);
  
        if (response.data.status === 1) {
          toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
          window.location.reload(); // Reload the page to show updated ride details
        } else {
          toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
        }
      } catch (error) {
        console.error("Error processing deduction:", error);
        toast.update(loadingToast, { render: "Failed to process the deduction", type: "error", isLoading: false, autoClose: 3000 });
      }
    };
    console.log('Ride object:', ride);
  return (
    <Modal
      isOpen={show}
      onRequestClose={onCancel}
      contentLabel="Confirm Action"
      ariaHideApp={false}
    >
      <h2>Confirm {action.charAt(0).toUpperCase() + action.slice(1)}</h2>
      <p>{message}</p>
      <ToastContainer/>
      <button onClick={() => handleConfirm(ride.Bookid)}>Yes</button>
      <button onClick={onCancel}>No</button>
    </Modal>
  );
};

export default ConfirmModal;