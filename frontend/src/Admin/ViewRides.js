import React, { useState } from "react";
import userIcon from '../assets/usersIcon.png';
import car from '../assets/car.png';

const ViewRides = () => {
  const [searchTermUser, setSearchTermUser] = useState("");
  const [searchTermStartPlace, setSearchTermStartPlace] = useState("");
  const [searchTermEndPlace, setSearchTermEndPlace] = useState("");
  const [selectedRide, setSelectedRide] = useState(null);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const rides = [
    { id: 1, name: "CST21012", start_place: "Jaffna", end_place: "Colombo", car_number: "CAR-1909", cost: "500", start_time: "12.00", end_time: "15.00", published_time: "8.00", user: { name: "Vithusan", email: "vithu@example.com", phone: "1234567890" } },
    { id: 2, name: "CST21013", start_place: "Kandy", end_place: "Badulla", car_number: "CAR-0602", cost: "1200", start_time: "15.00", end_time: "17.00", published_time: "12.00", user: { name: "Shan", email: "Shan@example.com", phone: "1234567890" } },
    { id: 3, name: "CST21019", start_place: "Vavuniya", end_place: "Colombo", car_number: "CAR-0682", cost: "1900", start_time: "18.00", end_time: "6.00", published_time: "12.00", user: { name: "Rajah", email: "Rajah@example.com", phone: "1234567890" } },
    { id: 4, name: "CST21073", start_place: "Colombo", end_place: "Jaffna", car_number: "CAR-0689", cost: "1200", start_time: "15.00", end_time: "17.00", published_time: "15.00", user: { name: "Malur", email: "Malur@example.com", phone: "1234567890" } },
   
  ];

  const handleUserSearchChange = (event) => {
    setSearchTermUser(event.target.value);
  };

  const handleStartPlaceSearchChange = (event) => {
    setSearchTermStartPlace(event.target.value);
  };

  const handleEndPlaceSearchChange = (event) => {
    setSearchTermEndPlace(event.target.value);
  };

  const handleViewMore = (ride) => {
    setSelectedRide(ride);
  };

  const closeModal = () => {
    setSelectedRide(null);
  };

  const showDeleteDialog = () => {
    setIsDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setIsDeleteDialogVisible(false);
  };

  // const handleDeleteRide = () => {
  //   if (selectedRide) {
  //     console.log(`Ride with id ${selectedRide.id} deleted`);
     
  //     hideDeleteDialog();
  //     closeModal();
  //   }
  // };

  const calculateElapsedTime = (publishedTime) => {
    const currentTime = new Date();
    const [publishedHour, publishedMinute] = publishedTime.split('.').map(Number);

    const publishedDate = new Date();
    publishedDate.setHours(publishedHour);
    publishedDate.setMinutes(publishedMinute);

    const elapsedTime = Math.floor((currentTime - publishedDate) / (1000 * 60)); 
    const hours = Math.floor(elapsedTime / 60);
    const minutes = elapsedTime % 60;

    if (hours > 0) {
      return `${hours} hour(s) ago`;
    } else {
      return `${minutes} minute(s) ago`;
    }
  };

  const filteredRides = rides.filter(ride =>
    ride.end_place.toLowerCase().includes(searchTermEndPlace.toLowerCase()) &&
    ride.start_place.toLowerCase().includes(searchTermStartPlace.toLowerCase()) &&
    ride.user.name.toLowerCase().includes(searchTermUser.toLowerCase())
  );

  return (
    <>
      <h1>Ride details</h1>
      <p>Here are the user details.</p>

      <div className="search-con">
        <input
          type="text"
          placeholder="Search by username"
          className="search-users"
          value={searchTermUser}
          onChange={handleUserSearchChange}
        />
        <input
          type="text"
          placeholder="Search by Departure"
          className="search-users"
          value={searchTermStartPlace}
          onChange={handleStartPlaceSearchChange}
        />
        <input
          type="text"
          placeholder="Search by Destination"
          className="search-users"
          value={searchTermEndPlace}
          onChange={handleEndPlaceSearchChange}
        />
      </div>

      <div className="viewRide-bars">
        {filteredRides.map((ride) => (
          <div key={ride.id} className="viewRide-bar">
            <div className="viewRide-bar-up">
              <div className="viewRide-details">
                <span className="timeplace">Departure</span>
                <span className="timeplace">{ride.start_time}</span>
                <span className="timeplace">{ride.start_place}</span>
              </div>
              <div className="viewRide-details">
                <span className="timeplace">Destination</span>
                <span className="timeplace">{ride.end_time}</span>
                <span className="timeplace">{ride.end_place}</span>
              </div>
              <div className="viewRide-details">
                <span className="viewRide-price">LKR {ride.cost}</span>
              </div>
            </div>
            <div className="viewRide-bar-middle">
              <hr />
            </div>
            <div className="viewRide-bar-down">
              <div className="car-details-vr">
                <img src={car} alt="car" className="vr-car" />
                <span className="vr-carnumber">{ride.car_number}</span>
              </div>
              <div className="user-details-vr">
                <img src={userIcon} alt="user" className="vr-userimg" />
                <span className="vr-username">{ride.user.name}</span>
              </div>
              <span className="vr-time">{calculateElapsedTime(ride.published_time)}</span>
              <button className="vr-button" onClick={() => handleViewMore(ride)}>
                View more
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedRide && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Ride Details</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="ride-details">
              <p><strong>Car Number:</strong> {selectedRide.car_number}</p>
              <p><strong>Cost:</strong> {selectedRide.cost}</p>
            </div>
            <div className="user-details">
              <p><strong>User Name:</strong> {selectedRide.user.name}</p>
              <p><strong>Email:</strong> {selectedRide.user.email}</p>
              <p><strong>Phone:</strong> {selectedRide.user.phone}</p>
            </div>
            <button className="delete-button" onClick={showDeleteDialog}>
              Delete Ride
            </button>
          </div>
        </div>
      )}

      {isDeleteDialogVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this ride?</p>
            <div className="modal-content-delete-button">
            <button className="confirm-delete-button" >
              Yes
            </button>
            <button className="user-button" onClick={hideDeleteDialog}>
              No
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewRides;
