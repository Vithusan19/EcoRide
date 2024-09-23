import React, { useState } from 'react';
import '../styles/StarRatingModal.css'; // Add any CSS for styling the modal
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios here

const StarRatingModal = ({ ride, onClose }) => {
  const [rating, setRating] = useState(0);

  const handleSubmitRating = async () => {
    try {
      const Data = new FormData();
      Data.append('rideID', ride.Bookid);
      Data.append('rating', rating);
      
      // Send rating data to backend
      await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/SubmitRating.php', Data);

      toast.success("Rating submitted successfully");
      onClose();
    } catch (error) {
      console.error("Error submitting rating:", error);
      toast.error("Failed to submit rating");
    }
  };

  return (
    <div className="star-rating-modal">
      <h2>Rate Your Ride</h2>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={star <= rating ? 'star filled' : 'star'}
            onClick={() => setRating(star)}
          >
            ★
          </span>
        ))}
      </div>
      <button onClick={handleSubmitRating} className="submit-rating-button">Submit Rating</button>
      <button onClick={onClose} className="close-modal-button">Cancel</button>
    </div>
  );
};

export default StarRatingModal;
