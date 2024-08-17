import React, { useState } from 'react';
import visa from '../assets/visacard.png';
import master from '../assets/mastercard.png';

const PaymentModal = ({ onSubmit, onCancel, seatCost, seats }) => {
  const [cardData, setCardData] = useState({
    cardName: '',
    cardNumber: '',
    cardExpiryDate: '',
    cardCVV: ''
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit(cardData);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onCancel}>&times;</span>
        <h2 className="modal-title-pay">Enter Payment Information</h2>
        <p className='add-ride-payment'>
          All drivers are required to pay 10% of their earnings from each ride to the system.
        </p>
        <div className='atm-container'>
          <img src={visa} alt='visa' />
          <img src={master} alt='master' />
        </div>
        <form onSubmit={handleFormSubmit} className="modal-form">
          <div className="form-row">
            <div className="form-group">
              <label>Card Holder Name:</label>
              <input className="add-input" type="text" name="cardName" value={cardData.cardName} onChange={handleCardChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Card Number:</label>
              <input className="add-input" type="text" name="cardNumber" value={cardData.cardNumber} onChange={handleCardChange} required />
            </div>
            <div className="form-group">
              <label>Expiry Date:</label>
              <input className="add-input" type="date" name="cardExpiryDate" value={cardData.cardExpiryDate} onChange={handleCardChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>CVV:</label>
              <input className="add-input" type="text" name="cardCVV" value={cardData.cardCVV} onChange={handleCardChange} required />
            </div>
          </div>
          <div className="button-group">
            <button type="submit" className='add-ride-button'>
              Pay <span className='button-price'>LKR {seatCost * seats / 10}</span>
            </button>
            <button type="button" className="add-ride-button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentModal;
