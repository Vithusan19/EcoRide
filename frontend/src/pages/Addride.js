import React, { useState, useEffect } from 'react';
import '../styles/Addride.css';
import { FaUser, FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle, FaEnvelope, FaCar, FaLock } from 'react-icons/fa';
import axios from 'axios';
import visa from '../assets/visacard.png';
import master from '../assets/mastercard.png';
import Footer from '../components/Footer';
import bg from '../assets/step-1.jpeg';
import bg2 from '../assets/step-7.jpg';
import demo from '../assets/Addride.mp4';  // Import the video



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
    preferences: '',
    carType: '',
    distance: ''
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
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const todayDate = new Date().toISOString().split('T')[0];

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

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleCardChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      setCardData({ ...cardData, [name]: files[0] });
    } else {
      setCardData({ ...cardData, [name]: value });
    }
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
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
    Data.append("carType", formData.carType);
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
    Data.append("ridedistance", formData.distance);

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
    if (!agreedToTerms) {
      alert("You must agree to the terms and conditions to proceed.");
      return;
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


  useEffect(() => {
    if (formData.carType && formData.distance && formData.seats) {
      const costPerSeat = calculateCostPerSeat();
      setFormData({ ...formData, seatCost: costPerSeat });
    }
  }, [formData.carType, formData.distance, formData.seats]);


  const calculateCostPerSeat = () => {
    const { carType, distance, seats } = formData;

    let costPerKm;

    switch (carType) {
      case 'low-consumption':
        costPerKm = 30.73; // Cost per km for low-consumption vehicles
        break;
      case 'medium-consumption':
        costPerKm = 45.10; // Cost per km for medium-consumption vehicles
        break;
      case 'high-consumption':
        costPerKm = 60.86; // Cost per km for high-consumption vehicles
        break;
      case 'hybrid':
        costPerKm = 30.20; // Cost per km for electric or hybrid vehicles
        break;

      default:
        costPerKm = 0; // Default cost
    }

    // Calculate the total cost for the ride
    const totalCost = costPerKm * distance;

    // Apply the 70% discount
    const discountedCost = totalCost * 0.75;

    // Divide by the number of seats to get the cost per seat
    const costPerSeat = discountedCost / seats;

    // Round the result to 2 decimal places for precision
    return costPerSeat.toFixed(2);
  };

  return (
    <>
      <div className="add-ride-container">
        <div className="header-image-container">
          <img
            src={step === 1 ? bg : bg2}
            alt="Header"
            className="header-image-1"
          />
          {step === 1 && (
            <div className="form-container-add">
              <h1 className="add-ride-title">Car Information</h1>
              <form onSubmit={handleNextStep} className="add-ride-form">
                <div className="form-row-add">
                  <div className="form-group-add">
                    <label>Vehicle No:</label>
                    <input className="add-input" type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} required />
                  </div>
                  <div className="form-group-add">
                    <label>Vehicle Model:</label>
                    <input className="add-input" type="text" name="vehicleModel" value={formData.vehicleModel} onChange={handleChange} required />
                  </div>
                </div>
                <div className="form-row-add">
                  <div className="form-group-add">
                    <label>Number of Seats:</label>
                    <input className="add-input" type="number" name="seats" value={formData.seats} onChange={handleChange} required min="1" />
                  </div>
                  <div className="form-group-add">
                    <label>Air Condition:</label>
                    <input className="add-input-check" type="checkbox" name="airCondition" checked={formData.airCondition} onChange={handleChange} />
                  </div>
                </div>
                <div className="form-row-add">
                  <div className="form-group-add">
                    <label>Car Type:</label>
                    <div className="radio-group">
                      <div className="radio-row">
                        <label>
                          <input
                            type="radio"
                            name="carType"
                            value="low-consumption"
                            checked={formData.carType === "low-consumption"}
                            onChange={handleChange}
                            required
                          />
                          Low Consumption Vehicles
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="carType"
                            value="medium-consumption"
                            checked={formData.carType === "medium-consumption"}
                            onChange={handleChange}
                            required
                          />
                          Medium Consumption Vehicles
                        </label>
                      </div>
                      <div className="radio-row">
                        <label>
                          <input
                            type="radio"
                            name="carType"
                            value="high-consumption"
                            checked={formData.carType === "high-consumption"}
                            onChange={handleChange}
                            required
                          />
                          High Consumption Vehicles
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="carType"
                            value="hybrid"
                            checked={formData.carType === "hybrid"}
                            onChange={handleChange}
                            required
                          />
                          Electric or Hybrid Vehicles
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="add-ride-button" type="submit">Next Step</button>
              </form>
            </div>
          )}

        </div>


        {step === 2 && (

          <div className="form-container-add">
            <h1 className="add-ride-title">Ride Details</h1>
            <form onSubmit={handleSubmit} className="add-ride-form">
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Departure Point:</label>
                  <input className="add-input" type="text" name="departurePoint" value={formData.departurePoint} onChange={handleChange} required />
                </div>
                <div className="form-group-add">
                  <label>Destination Point:</label>
                  <input className="add-input" type="text" name="destinationPoint" value={formData.destinationPoint} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Date:</label>
                  <input className="add-input" type="date" name="date" value={formData.date} onChange={handleChange} required min={todayDate} />
                </div>
                <div className="form-group-add">
                  <label>Total Distance (km):</label>
                  <p>Go to <a href="https://www.google.com/maps" target="_blank">Map</a></p>
                  <input className="add-input" type="number" name="distance" value={formData.distance} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row-add">       <div className="form-group-add">
                <label>Seat Cost (Calculated):</label>
                <input
                  className="add-input"
                  type="text"
                  name="seatCost"
                  value={formData.seatCost}
                  onChange={handleChange}
                  readOnly
                />
              </div>

              </div>
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Departure Time:</label>
                  <input className="add-input" type="time" name="departureTime" value={formData.departureTime} onChange={handleChange} required />
                </div>
                <div className="form-group-add">
                  <label>Destination Time:</label>
                  <input className="add-input" type="time" name="destinationTime" value={formData.destinationTime} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row-add">
                <div className="form-group-add">
                  <label>Gender Preference:</label>
                  <select className="add-input" name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="any">Any</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="form-group-add">
                <label>Route:</label>
                <textarea className="add-input" name="route" value={formData.route} onChange={handleChange} required></textarea>
              </div>
              <div className="form-group-add">
                <label>Preferences:</label>
                <textarea className="add-input" name="preferences" value={formData.preferences} onChange={handleChange}></textarea>
              </div>
              <div className="form-group-add terms-container">
  <input
    type="checkbox"
    name="agreedToTerms"
    checked={agreedToTerms}
    onChange={(e) => setAgreedToTerms(e.target.checked)}
    required
  />
  <label htmlFor="agreedToTerms">
    I agree to the <strong>Terms and Conditions</strong>
  </label>
</div>



              <div className="button-group">


                <button type="button" className="add-ride-button-2" onClick={handlePrevStep}>Back</button>
                <button className="add-ride-button-2" type="submit">Payment</button>

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

          <div className='instruction'>
            <div className="video-instruction">
              <h2>Driver Instructions</h2>
              <video controls width="100%">
                <source src={demo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className='points-instruction'>
              <h3>Steps to Follow:</h3>
              <p><FaUser className="icons" /> Add your profile picture, a few words about you, and your phone number to increase trust between members.</p>
              <p><FaMapMarkerAlt className="icons" /> Indicate departure and arrival points, the date of the ride, and check our recommended price to increase your chances of getting your first passengers and ratings.</p>
              <p><FaCheckCircle className="icons" /> Review passenger profiles and accept their requests to ride with you. That’s how easy it is to start saving on travel costs!</p>

            </div>
          </div>
        </div>


        <div className="addride-row-3">
          <div className="addride-container-row3">
            <div className="column">
              <FaEnvelope className="icons" />
              <h3>At your service 24/7</h3>
              <p>Our team is at your disposal to answer any questions by email or social media. You can also have a live chat directly with experienced members.</p>
            </div>
            <div className="column">
              <FaCar className="icons" />
              <h3>Eco-Ride at your side</h3>
              <p>For just 2 €, benefit from the reimbursement of up to 1,500€ of your excess when you publish a ride as a driver on BlaBlaCar.</p>
            </div>
            <div className="column">
              <FaLock className="icons" />
              <h3>100% secure information</h3>
              <p>Our team is dedicated to the protection of your data, which is always 100% confidential thanks to monitoring tools, secure navigation and encrypted data.</p>
            </div>
          </div>
        </div>

        <Footer />
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelPayment}>&times;</span>
            <h2 className="modal-title-pay">Payment Information</h2>
            <p className='add-ride-payment'>
              All drivers are required to pay a specified fee upon accepting each ride request from passengers to the system.
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
                <button type="submit" className='add-ride-button'>Ok <span className='button-price'></span></button>
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
