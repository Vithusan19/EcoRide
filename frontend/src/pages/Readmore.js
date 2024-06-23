import React ,{useState}from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Readmore.css'; // Import the CSS file for Readmore styling
import vehicle1 from "../assets/1.jpg"; // Import the image file
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

const images = {
  'Toyota KDH': vehicle1,
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
const Readmore = ({ cards }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const card = cards[parseInt(id, 10)];
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [requestedSeats, setRequestedSeats] = useState(1);

  if (!card) {
    return <div>Card not found</div>;
  }

  const handleRequestRide = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmitRequest = () => {
    // Handle the request submission logic here
    console.log(`Requested ${requestedSeats} seats`);
    setIsPopupOpen(true);
  };
  return (
    <div className="readmore-container">
      <h2>{card.car}</h2>
      <div className="image">
        <img alt="img" src={images[card.car]} />
      </div>
      <div className="readmore-card-details">
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Vehicle Number:</strong></span> {card.vehicleNumber}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Driver Name:</strong></span> {card.driverName}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>From:</strong></span> {card.from}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>To:</strong></span> {card.to}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Route:</strong></span> {card.route.join(' ➜ ')}
        </div>
        <div className="readmore-detail">
          <span className="readmore-label"><strong>Time Period:</strong></span> {card.timePeriod}
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
        <div className="readmore-popup">
          <div className="readmore-popup-Inner">
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
          </div>
        </div>
      )}
    </div>
  );
};


export default Readmore;
