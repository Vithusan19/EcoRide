import React, { useState, useEffect } from 'react';
import '../styles/Currentride.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditRideModal from '../components/EditRideModal'; 

const CurrentRide = () => {
  const [rides, setRides] = useState([]);
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");

  const [showDriverDetails, setShowDriverDetails] = useState(null);
  const [showRequests, setShowRequests] = useState({});
  const [editingRide, setEditingRide] = useState(null); 
  const [formData, setFormData] = useState({}); 

  useEffect(() => {
    const userID = sessionStorage.getItem("UserID");
    setUserId(userID);
    getCurrentRidesForUser(userID);
    getuserole(userID);
  }, []);

  const getuserole = async (userId) => {
    try {
      const Data = new FormData();
      Data.append("userID", userId);
      const response = await axios.post('http://localhost/ecoRide-Backend/Connection/User/SelectUserrole.php', Data);
      setUserRole(response.data.userRole);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user role");
    }
  };

  const getCurrentRidesForUser = async (userId) => {
    try {
      const Data = new FormData();
      Data.append("userID", userId);
      const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/CurrentRideUsers.php', Data);
      setRides(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch current rides");
    }
  };

  const handleAcceptRequest = async (Bookid, requestId) => {
    const loadingToast = toast.loading("Accepting request...");
    try {
      const Data = new FormData();
      Data.append("Bookid", Bookid);
      const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/AcceptRide.php', Data);
      
      if (response.data.status === 1) {
        toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
        window.location.reload();
      } else {
        toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.update(loadingToast, { render: "Failed to accept the request", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleRejectRequest = async (Bookid, requestId) => {
    const loadingToast = toast.loading("Rejecting request...");
    try {
      const Data = new FormData();
      Data.append("Bookid", Bookid);
      Data.append("requestID", requestId);
      const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/RejectRide.php', Data);

      toast.update(loadingToast, { render: "Request rejected successfully", type: "success", isLoading: false, autoClose: 3000 });
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.update(loadingToast, { render: "Failed to reject the request", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleCancelBooking = async (rideId) => {
    try {
      const Data = new FormData();
      Data.append("rideID", rideId);
      await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/CancelBooking.php', Data);
      setRides(rides.filter(ride => ride.Bookid !== rideId));
      toast.success("Booking canceled successfully");
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast.error("Failed to cancel booking");
    }
  };

  const toggleDriverDetails = (rideId) => {
    setShowDriverDetails((prevId) => (prevId === rideId ? null : rideId));
  };

  const toggleRequests = (rideId) => {
    setShowRequests((prevState) => ({
      ...prevState,
      [rideId]: !prevState[rideId],
    }));
  };
  const handleEditClick = (ride) => {
    setFormData({
      date: ride.date,
      departureTime: ride.departureTime,
      destinationTime: ride.destinationTime,
      availableSeats: ride.availableSeats,
    });
    setEditingRide(ride);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async (UserID) => {
    try {
      const Data = new FormData();
      Data.append("rideID", editingRide.Bookid); // Ensure this is the correct ID
      Data.append("driverID", userId); // Ensure userId is the correct driver ID
      Data.append("date", formData.date);
      Data.append("departureTime", formData.departureTime);
      Data.append("destinationTime", formData.destinationTime);
      Data.append("availableSeats", formData.availableSeats);
  
      console.log("Sending data:", {
        rideID: editingRide.Bookid,
        driverID: userId,
        departureTime: formData.departureTime,
        destinationTime: formData.destinationTime,
        availableSeats: formData.availableSeats
      });
  
      const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/UpdateRideDetails.php', Data);
  
      if (response.data.status === 1) {
        setRides(rides.map(ride =>
          ride.Bookid === editingRide.Bookid
            ? { ...ride, ...formData }
            : ride
        ));
        setEditingRide(null);
      } else {
        console.error("Error updating ride:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving ride:", error);
    }
  };
    

  const handleCancel = () => {
    setEditingRide(null);
  };

  return (
    <div className="current-ride-container">
      <ToastContainer />
      <h1>Current Rides</h1>
      {rides.length > 0 ? (
        rides.map((ride) => (
          <div key={ride.Bookid} className="ride-details">
            <p><strong>Departure Point:</strong> {ride.departurePoint}</p>
            <p><strong>Destination Point:</strong> {ride.destinationPoint}</p>
            <p><strong>Date:</strong> {ride.date}</p>
            <p><strong>Time:</strong> {ride.departureTime} - {ride.destinationTime}</p>
            <p><strong>Vehicle:</strong> {ride.vehicleModel}</p>
            <p><strong>Cost per Seat:</strong> LKR {ride.seatCost}</p>

            {userRole === 'driver' && (
              <div>
                <p><strong>Available Seats:</strong> {ride.availableSeats}</p>
                <button onClick={() => toggleRequests(ride.Bookid)}>
                  {showRequests[ride.Bookid] ? 'Hide Requests' : 'Passenger Requests'}
                </button>
                {showRequests[ride.Bookid] && (
                  <div className="request-details">
                    {ride.requests.length > 0 ? (
                      ride.requests.map((request, index) => (
                        <div key={index} className="request">
                          <p><strong>Name:</strong> {request.passengerName}</p>
                          <p><strong>Contact:</strong> {request.passengerContact}</p>
                          <p><strong>Seats Requested:</strong> {request.seatsRequested}</p>
                          <button onClick={() => handleAcceptRequest(ride.Bookid, index)}>Accept</button>
                          <button onClick={() => handleRejectRequest(ride.Bookid, index)}>Reject</button>
                        </div>
                      ))
                    ) : (
                      <p>No requests available.</p>
                    )}
                  </div>
                )}
                <button onClick={() => handleEditClick(ride)}>Edit Ride</button>
              </div>
            )}

            {userRole === 'passenger' && (
              <div>
                <p><strong>Status:</strong> {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}</p>
                {ride.status === 'accepted' && (
                  <>
                    <button onClick={() => toggleDriverDetails(ride.Bookid)}>
                      {showDriverDetails === ride.Bookid ? 'Hide Driver Details' : 'Show Driver Details'}
                    </button>
                    {showDriverDetails === ride.Bookid && (
                      <div className="driver-details">
                        <p><strong>Driver Name:</strong> {ride.driver.name}</p>
                        <p><strong>Contact:</strong> {ride.driver.contact}</p>
                      </div>
                    )}
                    <button className="cancel-booking-button" onClick={() => handleCancelBooking(ride.Bookid)}>
                      Cancel Ride
                    </button>
                  </>
                )}
                {ride.status === 'waiting' && (
                  <button className="cancel-booking-button" onClick={() => handleCancelBooking(ride.Bookid)}>
                    Cancel Booking
                  </button>
                )}
              </div>
            )}

            {userRole === 'driver' && ride.acceptedPassengers.length > 0 && (
              <div className="accepted-passengers">
                <h3>Accepted Passengers</h3>
                {ride.acceptedPassengers.map((passenger, index) => (
                  <div key={index} className="accepted-passenger">
                    <p><strong>Name:</strong> {passenger.passengerName}</p>
                    <p><strong>Contact:</strong> {passenger.passengerContact}</p>
                    <p><strong>Seats Requested:</strong> {passenger.seatsRequested}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="no-rides-message">You have no current rides.</p>
      )}
      {editingRide && (
        <EditRideModal
          formData={formData}
          onChange={handleFormChange}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CurrentRide;
