import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Readmore.css';
import vehicle1 from "../assets/1.jpg"; 
import vehicle2 from "../assets/2.jpg";
import vehicle3 from "../assets/3.jpg";
import vehicle4 from "../assets/4.jpg";
import vehicle5 from "../assets/5.jpg";
import vehicle6 from "../assets/6.jpg";
import vehicle7 from "../assets/7.jpg";
import vehicle8 from "../assets/8.jpg";
import vehicle9 from "../assets/9.jpg";
import vehicle10 from "../assets/10.jpg";
import vehicle11 from "../assets/11.jpg";
import vehicle12 from "../assets/12.jpg";
import axios from 'axios';
import { Hourglass } from "react-loader-spinner";


const images = {
  'BMW': vehicle1,
  'Mercedes Benz': vehicle2,
  'Toyota Axio': vehicle3,
  'Ford Transit': vehicle4,
  'Renault Trafic': vehicle5,
  'Magic Wagon': vehicle6,
  'Mercedes Vito': vehicle7,
  'Maxus V80': vehicle8,
  'Hyundai Starex': vehicle9,
  'Volkswagen Crafter': vehicle10,
  'Byd M6': vehicle11,
  'Mercedes Sprinter': vehicle12
};

const Readmore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { card } = location.state || {}; 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [requestedSeats, setRequestedSeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [userid, setuserid] = useState("");
  useEffect(() => {
    const userID = sessionStorage.getItem("UserID");
    setuserid(userID);
  }, []);

  if (!card) {
    return <div>Card not found</div>;
  }

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  const handleRequestRide = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const url = "http://localhost/ecoRide-Backend/Connection/Ride/RequestRide.php";
    const Data = new FormData();
    Data.append("userID", userid);
    Data.append("seatsNo", requestedSeats);
    Data.append("rideID", card.rideID); // Append rideID here
    
    // Log values for debugging
    console.log("UserID:", userid);
    console.log("Requested Seats:", requestedSeats);
    console.log("RideID:", card.rideID);

    try {
        const response = await axios.post(url, Data);
        // Log the response data for debugging
        console.log("Response Data:", response.data);

        if (response.data.status === 1) {
            console.log('Request sent successfully');
            setIsLoading(false)
            console.log('Driver Email:', response.data.email);
        } else {
            console.log('Failed to Request Ride:', response.data.message);
        }
    } catch (error) {
        console.error("Connection error:", error);
    }

    setIsPopupOpen(false);
};


  return (
    <div className="readmore-container">
      <h2>{card.vehicleModel}</h2>
      <div className="image">
        <img alt="Vehicle" src={images[card.vehicleModel]} />
      </div>
      <div className="readmore-card-details">
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Vehicle Number:</strong></span> {card.vehicleNo}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Driver Name:</strong></span> {card.driverName}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>From:</strong></span> {card.departurePoint}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>To:</strong></span> {card.destinationPoint}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Route:</strong></span> {card.route}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Time Period:</strong></span> {formatTime(card.departureTime)} - {formatTime(card.destinationTime)}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Available Seats:</strong></span> {card.seats}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Preferences:</strong></span> {card.preferences}
        </div>
      </div>
      <div className="readmore-btn-container">
        <button className="readmore-back-button" onClick={() => navigate(-1)}>Back</button>
        <button className="readmore-request-button" onClick={handleRequestRide}>Request Ride</button>
      </div>

      {isPopupOpen && (
        <div className='readmore-popup-back'>
        <div className="readmore-popup">
          <div className="readmore-popup-inner">
            <h3>Request Seats</h3>
            <label>
              Number of Seats:
              <input
                type="number"
                value={requestedSeats}
                min="1"
                max={card.seats}
                onChange={(e) => setRequestedSeats(e.target.value)}
              />
            </label>
            <div className="readmore-button-container">
              <button className="readmore-action-button" onClick={handleClosePopup}>Cancel</button>
              <button className="readmore-action-button" onClick={handleSubmitRequest}>Submit</button>
              
            </div>
           <div className='loadingRequest'> 
            {isLoading &&(
                          <Hourglass
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="hourglass-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                          colors={['#306cce', '#72a1ed']}
                          />
                        )}
                        </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
};

export default Readmore;
