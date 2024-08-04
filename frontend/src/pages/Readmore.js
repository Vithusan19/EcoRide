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
import vehicle01 from "../assets/01.jpg";
import vehicle02 from "../assets/02.jpg";
import vehicle03 from "../assets/03.jpg";
import vehicle04 from "../assets/04.jpg";
import axios from 'axios';
import { Hourglass } from "react-loader-spinner";
import Footer from '../components/Footer';
import '../styles/Footer.css';
import demos from '../assets/Readmore.mp4';

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
  'Mercedes Sprinter': vehicle12,
  '01': vehicle01,
  '02': vehicle02,
  '03': vehicle03,
  '04': vehicle04,
};

const photos = [
  vehicle01, vehicle02, vehicle03, vehicle04
];

const Readmore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { card } = location.state || {};
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [requestedSeats, setRequestedSeats] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    const availableSeats = card.seats - card.BookingSeats;
    if (requestedSeats > availableSeats) {
      setErrorMessage(`You can't request more than ${availableSeats} seats.`);
      return;
    }
    setIsLoading(true);
    const url = "http://localhost/ecoRide-Backend/Connection/Ride/RequestRide.php";
    const Data = new FormData();
    Data.append("userID", userid);
    Data.append("seatsNo", requestedSeats);
    Data.append("rideID", card.rideID);

    console.log("UserID:", userid);
    console.log("Requested Seats:", requestedSeats);
    console.log("RideID:", card.rideID);

    try {
      const response = await axios.post(url, Data);

      console.log("Response Data:", response.data);

      if (response.data.status === 1) {
        console.log('Request sent successfully');
        setIsLoading(false);
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
    <div className="read-container">
      <div className="readmore-container">
        <h2>{card.vehicleModel}</h2>

        <div className="readmore-content">
          <div className="readmore-image">
            <img alt="Vehicle" src={images[card.vehicleModel] || images['BMW']} />
          </div>
          <div className="readmore-main-details">
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
              <span className="readmore-label"><strong>Seat Cost:</strong></span> Rs.{card.seatCost}
            </div>
          </div>
        </div>
        <div className="readmore-secondary-details">
          <div className="readmore-detail">
            <span className="readmore-label"><strong>Time Period:</strong></span> {formatTime(card.departureTime)} - {formatTime(card.destinationTime)}
          </div>
          <div className="readmore-detail">
            <span className="readmore-label"><strong>Available Seats:</strong></span> {card.seats - card.BookingSeats}
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
          <div className="readmore-popup">
            <div className="readmore-popup-inner">
              <h3>Request Seats</h3>
              <label>
                Number of Seats:
                <input
                  type="number"
                  value={requestedSeats}
                  min="1"
                  max={card.seats - card.BookingSeats}
                  onChange={(e) => {
                    setRequestedSeats(e.target.value);
                    setErrorMessage("");
                  }}
                />
              </label>
              <div className="readmore-button-container">
                <button className="readmore-action-button" onClick={handleClosePopup}>Cancel</button>
                <div className="loadingRequest">
                {isLoading && (
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
                <button className="readmore-action-button" onClick={handleSubmitRequest}>Submit</button>
              </div>
              {errorMessage && <div className="error-message">{errorMessage}</div>}
              
            </div>
          </div>
        )}
      </div>
      <div className="readmore-row-2">
        <div className="readmore-container-row2">
          <div className="headline">
            <h1>We’re here every step of the way</h1>
          </div>
          <div className="readmore-features">
            <div className="readmore-feature">
              <h2>At your service 24/7</h2>
              <p>Our team is at your disposal to answer any questions by email or social media. You can also have a live chat directly with experienced members.</p>
            </div>
            <div className="readmore-feature">
              <h2>EcoRide at your side</h2>
              <p>Ride Save , Here you can send ride request to the driver.</p>
            </div>
            <div className="readmore-feature">
              <h2>100% secure information</h2>
              <p>Our team is dedicated to the protection of your data, which is always 100% confidential thanks to monitoring tools, secure navigation and encrypted data.</p>
            </div>
          </div>
          <div className="readmore-statistics">
            <div className="readmore-stat">
              <i className="fa-sharp-duotone fa-solid fa-money-bill"></i>
              <h3>Travel at low prices</h3>
            </div>
            <div className="readmore-stat">
              <i className="fa-sharp fa-solid fa-shield"></i>
              <h3>Trustworthy and simple</h3>
            </div>
            <div className="readmore-stat">
              <i className="fas fa-car"></i>
              <h3>Proximity makes it easier</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="readmore-photos-container">
        <h3>Additional Photos</h3>
        <div className="readmore-photos">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Additional ${index + 1}`} />
          ))}
        </div>
      </div>

      <div className="video-instructions-container">
        <div className="readmore-video-container">
          <h3>System Explanation</h3>
          <video controls width="100%">
                <source src={demos} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
        </div>
        <div className="readmore-instructions">
          <h3>How to Use This Page</h3>
          <p>Welcome to the vehicle details page. Here’s how to navigate and utilize this information:</p>
          <ul>
            <i className="fas fa-car"></i> <strong>View Vehicle Details:</strong> Check out the details on the right side of the image, including vehicle number, driver name, and travel route.<br></br><br></br>
            <i className="fas fa-calendar-check"></i> <strong>Request a Ride:</strong> Click the "Request Ride" button to open a popup where you can specify the number of seats you want to request.<br></br><br></br>
            <i className="fas fa-arrow-left"></i> <strong>Back Button:</strong> Use the "Back" button to return to the previous page.<br></br><br></br>
            <i className="fas fa-image"></i> <strong>Additional Photos and Videos:</strong> View more photos and a video explanation of the system below for additional context and details.<br></br><br></br>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Readmore;
