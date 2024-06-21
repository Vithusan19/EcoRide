import React, { useState } from 'react';
import '../styles/Currentride.css';
import ReactStars from "react-rating-stars-component";

const Editride = ({ currentrightdata, onSave, onClose, userRole }) => {
  const [formData, setFormData] = useState(currentrightdata);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="currentride-popup">
      <div className="currentride-popup-Inner">
        <div className="currentride-popup-header">
          <button className="currentride-close-btn" onClick={onClose}>X</button>
        </div>
        <h3>Edit Ride details</h3>
        <div className='currentride-form'>
          {userRole === 'driver' && (
            <>
              <label>
                Date:
                <input
                  type="date"
                  name="Date"
                  value={formData.Date}
                  onChange={handleChange}
                />
              </label>
              <br /><br />
              <label>
                Number of seats:
                <input
                  type="text"
                  name="Numberofseats"
                  value={formData.Numberofseats}
                  onChange={handleChange}
                />
              </label>
              <br /><br />
              <label>
                Time:
                <input
                  type="text"
                  name="Time"
                  value={formData.Time}
                  onChange={handleChange}
                />
              </label>
              <br /><br />
              <label>
                Preference:
                <input
                  type="text"
                  name="Preference"
                  value={formData.Preference}
                  onChange={handleChange}
                />
              </label>
              <br /><br />
            </>
          )}
          {userRole === 'passenger' && (
            <>
              <label>
                Number of seats:
                <input
                  type="text"
                  name="Numberofseats"
                  value={formData.Numberofseats}
                  onChange={handleChange}
                />
              </label>
              <br /><br />
            </>
          )}
        </div>
        <button className="currentride-action-button" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

const Rating = ({ onClose }) => {
  const [driverRating, setDriverRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setDriverRating(newRating);
  };

  const handleSubmitRating = () => {
    // Handle rating submission logic here
    alert(`Rating submitted: ${driverRating} stars`);
    onClose();
  };

  return (
    <div className="currentride-popup">
      <div className="currentride-popup-Inner">
        <div className="currentride-popup-header">
          <button className="currentride-close-btn" onClick={onClose}>X</button>
        </div>
        <h3>Rate Your Ride</h3>
        <div className='currentride-rating'>
          <label >
            
            <ReactStars
              count={5}
              size={50}
              activeColor="#ffd700"
              value={driverRating}
              onChange={handleRatingChange}
            />
          </label>
          <br />
        </div>
        <button className="currentride-action-button" onClick={handleSubmitRating}>
          Submit Rating
        </button>
      </div>
    </div>
  );
};

const Currentride = ({ userRole }) => {
  const initialcurrentridedata = {
    VehicleNumber: 'ABC123',
    DriverName: 'John Doe',
    Date: '2023-05-01',
    PickupLocation: 'Kandy',
    DropoffLocation: 'Galle',
    Route: ['Kandy', 'Matara', 'Galle'],
    Time: '5 AM - 11 AM',
    Numberofseats: '5',
    Preference: 'No smoking',
  };

  const [currentrightdata, setcurrentridedata] = useState(initialcurrentridedata);
  const [openpopup, setopenpopup] = useState(false);
  const [cancelride, setcancelride] = useState(null);
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [isFinishDialogVisible, setFinishDialogVisible] = useState(false);
  const [isRatingDialogVisible, setRatingDialogVisible] = useState(false);

  const handleSavecurrentride = (formData) => {
    setcurrentridedata(formData);
  };

  const toggleopenpopup = () => {
    setopenpopup(!openpopup);
  };

  const handlecancel = (formData) => {
    setcancelride(formData);
  };

  const closeModel = () => {
    setcancelride(null);
  };

  const showDeleteDialoge = () => {
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialoge = () => {
    setDeleteDialogVisible(false);
  };

  const handleFinishRide = () => {
    setFinishDialogVisible(true);
    if (userRole === 'passenger') {
      setRatingDialogVisible(true);
    }
  };

  const hideFinishDialog = () => {
    setFinishDialogVisible(false);
  };

  const hideRatingDialog = () => {
    setRatingDialogVisible(false);
  };

  const DriverView = () => (
    <>
      <div className='currentride-card-box'>
        <h3>Ride details</h3>
        <div className='currentride-box-container'>
          <div className='currentride-box'>
            <p><strong>Date:</strong> {currentrightdata.Date}</p>
            <p><strong>Pickup Location:</strong> {currentrightdata.PickupLocation}</p>
            <p><strong>Drop-off Location:</strong>{currentrightdata.DropoffLocation}</p>
            <p><strong>Route: </strong>{currentrightdata.Route.join(' ➜ ')}</p>
            <p><strong>Time Period:</strong> {currentrightdata.Time}</p>
            <p><strong>Number of seats:</strong> {currentrightdata.Numberofseats}</p>
            <p><strong>Preference:</strong> {currentrightdata.Preference}</p>
          </div>
        </div>
        <div className="currentride-button-container">
          <button className='currentride-action-button' onClick={toggleopenpopup}>Edit Ride</button>
          {openpopup && (
            <Editride
              currentrightdata={currentrightdata}
              onSave={handleSavecurrentride}
              onClose={toggleopenpopup}
              userRole={userRole}
            />
          )}

<button className='currentride-action-button' onClick={handlecancel}>Cancel Ride</button>
          {cancelride && (
            <div className="currentride-popup">
              <div className="currentride-popup-Inner">
                <button className="currentride-close-btn" onClick={closeModel}>
                  &times;
                </button><br />
                <h2>Ride Details</h2><br />
                <p><strong>Date:</strong> {currentrightdata.Date}</p><br />
                <p><strong>Number of seats:</strong> {currentrightdata.Numberofseats}</p><br />
                <p><strong>Preference:</strong> {currentrightdata.Preference}</p><br />
                <p><strong>Time:</strong> {currentrightdata.Time}</p><br />
                <p><strong>Pickup Location:</strong> {currentrightdata.PickupLocation}</p><br />
                <p><strong>Drop-off Location:</strong> {currentrightdata.DropoffLocation}</p><br />
                <button className="currentride-delete-button" onClick={showDeleteDialoge}>
                  Delete Ride
                </button>
              </div>
            </div>
          )}
          {isDeleteDialogVisible && (
            <div className="currentride-popup">
              <div className="currentride-popup-delete-inner">
                <h2>Confirm Deletion</h2><br />
                <p>Are you sure you want to delete this Ride?</p><br />
                <div className='currentride-button-container'>
                  <button className='currentride-yes-button'>
                    Yes
                  </button>
                  <button className="currentride-No-button" onClick={hideDeleteDialoge}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          <button className='currentride-action-button' onClick={handleFinishRide}>Finish Ride</button>
          {isFinishDialogVisible && (
            <div className="currentride-popup">
              <div className="currentride-popup-delete-inner">
                <h2>Ride Finished!</h2>
                <br />
                <p>Your ride is finished!</p>
                <br />
                <button className="currentride-action-button" onClick={hideFinishDialog}>Close</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const PassengerView = () => (
    <div className='currentride-card-box'>
      <h3>Ride details</h3>
      <div className='currentride-box-container'>
        <div className='currentride-box'>
          <p><strong>Driver Name:</strong> {currentrightdata.DriverName}</p>
          <p><strong>Vehicle Number:</strong> {currentrightdata.VehicleNumber}</p>
          <p><strong>Date:</strong> {currentrightdata.Date}</p>
          <p><strong>Time:</strong> {currentrightdata.Time}</p>
          <p><strong>Pickup Location:</strong> {currentrightdata.PickupLocation}</p>
          <p><strong>Drop-off Location:</strong> {currentrightdata.DropoffLocation}</p>
          <p><strong>Route: </strong>{currentrightdata.Route.join(' ➜ ')}</p>
          <p><strong>Number of seats:</strong> {currentrightdata.Numberofseats}</p>
          <p><strong>Preference:</strong> {currentrightdata.Preference}</p>
        </div>
      </div>
      <div className="currentride-button-container">
        <button className='currentride-action-button' onClick={toggleopenpopup}>Edit Ride</button>
        {openpopup && (
          <Editride
            currentrightdata={currentrightdata}
            onSave={handleSavecurrentride}
            onClose={toggleopenpopup}
            userRole={userRole}
          />
        )}

<button className='currentride-action-button' onClick={handlecancel}>Cancel Ride</button>
          {cancelride && (
            <div className="currentride-popup">
              <div className="currentride-popup-Inner">
                <button className="currentride-close-btn" onClick={closeModel}>
                  &times;
                </button>
                <h2>Ride Details</h2>
                <p><strong>Driver Name:</strong> {currentrightdata.DriverName}</p>
          <p><strong>Vehicle Number:</strong> {currentrightdata.VehicleNumber}</p>
          <p><strong>Date:</strong> {currentrightdata.Date}</p>
          <p><strong>Time:</strong> {currentrightdata.Time}</p>
          <p><strong>Pickup Location:</strong> {currentrightdata.PickupLocation}</p>
          <p><strong>Drop-off Location:</strong> {currentrightdata.DropoffLocation}</p>
          <p><strong>Route: </strong>{currentrightdata.Route.join(' ➜ ')}</p>
          <p><strong>Number of seats:</strong> {currentrightdata.Numberofseats}</p>
          <p><strong>Preference:</strong> {currentrightdata.Preference}</p>
                <button className="currentride-delete-button" onClick={showDeleteDialoge}>
                  Delete Ride
                </button>
              </div>
            </div>
          )}
          {isDeleteDialogVisible && (
            <div className="currentride-popup">
              <div className="currentride-popup-delete-inner">
                <h2>Confirm Deletion</h2><br />
                <p>Are you sure you want to delete this Ride?</p><br />
                <div className='currentride-button-container'>
                  <button className='currentride-yes-button'>
                    Yes
                  </button>
                  <button className="currentride-No-button" onClick={hideDeleteDialoge}>
                    No
                  </button>
                </div>
              </div>
            </div>
          )}


        <button className='currentride-action-button' onClick={handleFinishRide}>Finish Ride</button>
        {isFinishDialogVisible && (
          <div className="currentride-popup">
            <div className="currentride-popup-delete-inner">
              <h2>Ride Finished!</h2>
              <br />
              <p>Your ride is finished!</p>
              <br />
              <button className="currentride-action-button" onClick={hideFinishDialog}>Close</button>
            </div>
          </div>
        )}
        {isRatingDialogVisible && (
          <Rating onClose={hideRatingDialog} />
        )}
      </div>
    </div>
  );

  return (
    <div className='currentride'>
      <div className='currentride-header-title'>
        <h1>Current Ride</h1>
      </div>
      {userRole === 'driver' ? <DriverView /> : <PassengerView />}
    </div>
  );
};

export default Currentride;
