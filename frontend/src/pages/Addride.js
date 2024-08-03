import React, { useState, useEffect } from 'react';
import '../styles/Addride.css';

import axios from 'axios';
import visa from '../assets/visacard.png';
import master from '../assets/mastercard.png';
import Footer from '../components/Footer';

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
    route: '',
    preferences: ''
  });

  const [userid, setuserid] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [cardData, setCardData] = useState({
    cardImage: null,
    cardName: '',
    cardNumber: '',
    cardExpiryDate: '',
    cardCVV: ''
  });

  useEffect(() => {
    const userID = sessionStorage.getItem("UserID");
    setuserid(userID);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowModal(true);

    const url = "http://localhost/ecoRide-Backend/Connection/Ride/Addride.php";
    const Data = new FormData();

    Data.append("vehicleNo", formData.vehicleNo);
    Data.append("vehicleModel", formData.vehicleModel);
    Data.append("seats", formData.seats);
    Data.append("airCondition", formData.airCondition);
    Data.append("departurePoint", formData.departurePoint);
    Data.append("destinationPoint", formData.destinationPoint);
    Data.append("date", formData.date);
    Data.append("seatCost", formData.seatCost);
    Data.append("departureTime", formData.departureTime);
    Data.append("destinationTime", formData.destinationTime);
    Data.append("gender", formData.gender);
    Data.append("route", formData.route);
    Data.append("preferences", formData.preferences);
    Data.append("DriverID", userid);

    try {
      const response = await axios.post(url, Data);
      console.log(response.data);
      if (response.data.status === 1) {
        console.log('Ride added successfully');
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    console.log(cardData);
    setShowModal(false);
  };

  const handleCancelPayment = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="add-ride-container">
        <div className="start-bg">
        </div>

        {step === 1 && (
          <div className="form-container-add">
            <h1 className="add-ride-title">Car Information</h1>
            <form onSubmit={handleNextStep} className="add-ride-form">
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Vehicle No:</label>
                  <input className="add-input" type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} />
                </div>
                <div className="form-group-add">
                  <label>Vehicle Model:</label>
                  <input className="add-input" type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Number of Seats:</label>
                  <input className="add-input" type="number" name="seats" value={formData.seats} onChange={handleChange} />
                </div>
                <div className="form-group-add">
                  <label>Air Condition:</label>
                  <input className="add-input-cheack" type="checkbox" name="airCondition" checked={formData.airCondition} onChange={handleChange} />
                </div>
              </div>
              <button className="add-ride-button" type="submit">Next Step</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="form-container-add">
            <h1 className="add-ride-title">Ride Details</h1>
            <form onSubmit={handleSubmit} className="add-ride-form">
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Departure Point:</label>
                  <input className="add-input" type="text" name="departurePoint" value={formData.departurePoint} onChange={handleChange} />
                </div>
                <div className="form-group-add">
                  <label>Destination Point:</label>
                  <input className="add-input" type="text" name="destinationPoint" value={formData.destinationPoint} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Date:</label>
                  <input className="add-input" type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
                <div className="form-group-add">
                  <label>Seat Cost:</label>
                  <input className="add-input" type="number" name="seatCost" value={formData.seatCost} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Departure Time:</label>
                  <input className="add-input" type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} />
                </div>
                <div className="form-group-add">
                  <label>Destination Time:</label>
                  <input className="add-input" type="time" name="destinationTime" value={formData.destinationTime} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Gender Preference:</label>
                  <select className="add-input" name="gender" value={formData.gender} onChange={handleChange}>
                    <option value="">Select</option>
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-group-add">
                <label>Route:</label>
                <textarea className="add-input" name="route" value={formData.route} onChange={handleChange}></textarea>
              </div>
              <div className="form-group-add">
                <label>Preferences:</label>
                <textarea className="add-input" name="preferences" value={formData.preferences} onChange={handleChange}></textarea>
              </div>
              <div className="button-group">
                <button className="add-ride-button" type="submit">Add Ride</button>
                <button type="button" className="add-ride-button" onClick={handlePrevStep}>Back</button>
              </div>
            </form>
          </div>
        )}

        <div className="addride-row-2">
          <div className="addride-container-row2">
            <div className="headline">
              <h1>Drive. Share. Save.</h1>
            </div>
            <div className="features">
              <div className="feature">
                <h2>Drive.</h2>
                <p>Keep your plans! Hit the road just as you anticipated and make the most of your vehicle’s empty seats.</p>
              </div>
              <div className="feature">
                <h2>Share.</h2>
                <p>Travel with good company. Share a memorable ride with travellers from all walks of life.</p>
              </div>
              <div className="feature">
                <h2>Save.</h2>
                <p>Tolls, petrol, electricity... Easily divvy up all the costs with other passengers.</p>
              </div>
            </div>
            <div className="statistics">
              <div className="stat">
                <h3>+ 50 million</h3>
                <p>members</p>
              </div>
              <div className="stat">
                <h3>+ 22 million</h3>
                <p>reviews</p>
              </div>
              <div className="stat">
                <h3>+ 530 million</h3>
                <p>carpoolers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="instructions">
          <h2>Driver Instructions</h2>
          <div className='instruction'>
            <div className="video-instruction">
              <video controls width="100%">
                <source src="path_to_video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className='points-instruction'>
              <h3>Steps to Follow:</h3>
              <p>Ensure your vehicle is clean and well-maintained.</p>
              <p>Plan your route in advance to avoid delays.</p>
              <p>Communicate with passengers regarding pickup times and locations.</p>
              <p>Drive safely and follow all traffic laws.</p>
              <p>Provide a comfortable and courteous service to all passengers.</p>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="modal-title-pay">Enter Payment Information</h2>
            <p className='add-ride-payment'>
              All drivers are required to pay 10% of their earnings from each ride to the system.
            </p>
            <div className='atm-container'>
              <img src={visa} alt='visa' />
              <img src={master} alt='master' />
            </div>
            <form onSubmit={handleCardSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Card Holder Name:</label>
                  <input className="add-input" type="text" name="cardName" value={cardData.cardName} onChange={handleCardChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Card Number:</label>
                  <input className="add-input" type="text" name="cardNumber" value={cardData.cardNumber} onChange={handleCardChange} />
                </div>
                <div className="form-group">
                  <label>Expiry Date:</label>
                  <input className="add-input" type="date" name="cardExpiryDate" value={cardData.cardExpiryDate} onChange={handleCardChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>CVV:</label>
                  <input className="add-input" type="text" name="cardCVV" value={cardData.cardCVV} onChange={handleCardChange} />
                </div>
              </div>
              <div className="button-group">
                <button type="submit" className='add-ride-button'>Pay <span className='button-price'>LKR {formData.seatCost * formData.seats / 10}</span></button>
                <button type="button" className="add-ride-button" onClick={handleCancelPayment}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Addride;
