import React from 'react';
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

  if (!card) {
    return <div>Card not found</div>;
  }

  return (
    <div className="readmore-container">
      <h2>{card.car}</h2>
      <div className="image">
        <img alt="img" src={images[card.car]} />
      </div>
      <div className="card-details">
        <div className="detail">
          <span className="label"><strong>Vehicle Number:</strong></span> {card.vehicleNumber}
        </div>
        <div className="detail">
          <span className="label"><strong>Driver Name:</strong></span> {card.driverName}
        </div>
        <div className="detail">
          <span className="label"><strong>From:</strong></span> {card.from}
        </div>
        <div className="detail">
          <span className="label"><strong>To:</strong></span> {card.to}
        </div>
        <div className="detail">
          <span className="label"><strong>Route:</strong></span> {card.route.join(' ➜ ')}
        </div>
        <div className="detail">
          <span className="label"><strong>Time Period:</strong></span> {card.timePeriod}
        </div>
        <div className="detail">
          <span className="label"><strong>Available Seats:</strong></span> {card.seats}
        </div>
        <div className="detail">
          <span className="label"><strong>Preferences:</strong></span> {card.preferences}
        </div>
      </div>
      <div className="btn-container">
        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
        <button className="request-button">Request Ride</button>
      </div>
    </div>
  );
};


export default Readmore;
