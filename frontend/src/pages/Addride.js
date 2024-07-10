import React, { useState } from 'react';
import '../styles/Addride.css';
import addride from '../assets/addride.png';
import visa from '../assets/visacard.png';
import master from '../assets/mastercard.png';
//import axios from 'axios';


const Addride = () => {
  const [formData, setFormData] = useState({
    vehicleNo: '',
    vehicleModel: '',
    seats: '',
    airCondition: false,
    departurePoint: '',
    destinationPoint: '',
    date: '',
    departureTime: '',
    destinationTime: '',
    seatCost: '',
    gender: '',
   // image: null,
    route: '',
    preferences: ''
  });
  
 

  const [showModal, setShowModal] = useState(false);
  const [cardData, setCardData] = useState({
    cardImage: null,
    cardName: '',
    cardNumber: '',
    cardExpiryDate: '',
    cardCVV: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCardChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setCardData({ ...cardData, [name]: files[0] });
    } else {
      setCardData({ ...cardData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setShowModal(true);
   
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    console.log(cardData);
    setShowModal(false);
  };

  return (
    <div className="add-ride-container">
      <img src={addride} alt="Stylish Ride" className="ride-image-top" />


      <h1 className='add-ride-title'>Create Ride</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="add-ride-form">
          <div className="form-row">
            <div className="form-group">
              <label>Vehicle No:</label>
              <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Vehicle Model:</label>
              <input type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Number of Seats:</label>
              <input type="number" name="seats" value={formData.seats} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Air Condition:</label>
              <input type="checkbox" name="airCondition" checked={formData.airCondition} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Departure Point:</label>
              <input type="text" name="departurePoint" value={formData.departurePoint} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Destination Point:</label>
              <input type="text" name="destinationPoint" value={formData.destinationPoint} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Date:</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Seat Cost:</label>
              <input type="number" name="seatCost" value={formData.seatCost} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Departure Time:</label>
              <input type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Destination Time:</label>
              <input type="time" name="destinationTime" value={formData.destinationTime} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Gender Preference:</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            {/* <div className="form-group">
              <label>Add Image:</label>
              <input type="file" name="image" onChange={handleChange} />
            </div> */}
          </div>
          <div className="form-group">
            <label>Route:</label>
            <textarea name="route" value={formData.route} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label>Preferences:</label>
            <textarea name="preferences" value={formData.preferences} onChange={handleChange}></textarea>
          </div>
          <button className='add-ride-button' type="submit">Add Ride</button>
        </form>
      </div>

      {showModal && (
        <div className="add-ride-modal">
          <div className="add-ride-modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className='add-ride-card-title'>Card Payment</h2>
            <p className='add-ride-payment'>
              All drivers are required to pay 10% of their earnings from each ride to the system.
            </p>
            <div className='atm-container'>
              <img src={visa} alt='visa' />
              <img src={master} alt='master' />
            </div>
            <form onSubmit={handleCardSubmit} className="card-form">
              <div className="form-group">
                <label>Card Holder Name:</label>
                <input type="text" name="cardName" value={cardData.cardName} onChange={handleCardChange} required />
              </div>
              <div className="form-group">
                <label>Card Number:</label>
                <input type="text" name="cardNumber" value={cardData.cardNumber} onChange={handleCardChange} required />
              </div>
              <div className='date-cv'>
                <div className="form-group">
                  <label>Card Expiry Date:</label>
                  <input type="text" name="cardExpiryDate" value={cardData.cardExpiryDate} onChange={handleCardChange} required />
                </div>
                <div className="form-group">
                  <label>CVV:</label>
                  <input type="text" name="cardCVV" value={cardData.cardCVV} onChange={handleCardChange} required />
                </div>
              </div>
              <button type="submit" className='add-ride-button'>Pay <span className='button-price'>LKR {formData.seatCost * formData.seats / 10}</span></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Addride;