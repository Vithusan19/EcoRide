import React, { useState, useEffect } from 'react';
import '../styles/Currentride.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditRideModal from '../components/EditRideModal';
import StarRatingModal from '../components/StarRatingModal';
import Footer from '../components/Footer';
import ConfirmModal from '../components/ConfirmModal'; // Import Confirm Modal

const CurrentRide = () => {
  const [rides, setRides] = useState([]);
  const [userId, setUserId] = useState("");
  ///const [RideId, setRideId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showDriverDetails, setShowDriverDetails] = useState(null);
  const [showRequests, setShowRequests] = useState({});
  const [editingRide, setEditingRide] = useState(null);
  const [formData, setFormData] = useState({});
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rideToRate, setRideToRate] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // For confirmation modal
  const [confirmAction, setConfirmAction] = useState(null); // Store the action to confirm

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
        window.location.reload(); // Reload the page to show updated ride details
      } else {
        toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.update(loadingToast, { render: "Failed to accept the request", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleCancelBooking = async (Bookid) => {
    const loadingToast = toast.loading("Cancelling booking...");
    try {
      const Data = new FormData();
      Data.append("Bookid", Bookid);
      const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/CancelBooking.php', Data);

      if (response.data.status === 1) {
        toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
        window.location.reload(); 
      } else {
        toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.update(loadingToast, { render: "Failed to cancel the booking", type: "error", isLoading: false, autoClose: 3000 });
    }
  };



  const handleRejectRequest = async (Bookid, requestId) => {
    const loadingToast = toast.loading("Rejecting request...");
    try {
      const Data = new FormData();
      Data.append("Bookid", Bookid);
      Data.append("requestID", requestId);

      toast.update(loadingToast, { render: "Request rejected successfully", type: "success", isLoading: false, autoClose: 3000 });
      window.location.reload();
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.update(loadingToast, { render: "Failed to reject the request", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleConfirm = (action, Bookid, requestId) => {
    setConfirmAction({ action, Bookid, requestId });
    setShowConfirmModal(true); // Show confirmation modal
  };

  const executeConfirmAction = () => {
    if (confirmAction?.action === "accept") {
      handleAcceptRequest(confirmAction.Bookid, confirmAction.requestId);
    } else if (confirmAction?.action === "reject") {
      handleRejectRequest(confirmAction.Bookid, confirmAction.requestId);
    }
    setShowConfirmModal(false); // Hide confirmation modal
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
      rideid: ride.rideID,
    });
    setEditingRide(ride);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    try {
      console.log(formData.rideid)
      const Data = new FormData();
      Data.append("rideID", formData.rideid);
      Data.append("driverID", userId);
      Data.append("date", formData.date);
      Data.append("departureTime", formData.departureTime);
      Data.append("destinationTime", formData.destinationTime);
      Data.append("availableSeats", formData.availableSeats);

      const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/UpdateRideDetails.php', Data);

      if (response.data.status === 1) {
        console.log("done")
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
  //for driver
  const handleFinishRides = async (ride) => {
    const loadingToast = toast.loading("Finishing ride...");

    console.log("Finishing ride with rideID:", ride.rideID, " and userID:", userId);

    try {
        const Data = new FormData();
        // Data.append("rideID", ride.rideID); // Ensure ride.rideID is defined
        Data.append("userID", userId); // Ensure userId is defined in your component

        const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/Finishridedriver.php', Data);

        if (response.data.status === 1) {
            if (userRole === 'driver') {
                setShowRatingModal(true);
                setRideToRate(ride); // Set the ride to rate
            } else {
                // toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
                toast.info("Ride finished successfully!");
                window.location.reload(); // Refresh the page or update the state to reflect the finished ride
            }
        } else {
            toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
            window.location.reload(); 
          }
    } catch (error) {
        console.error("Error finishing ride:", error);
        toast.update(loadingToast, { render: "Failed to finish the ride", type: "error", isLoading: false, autoClose: 3000 });
    }
};
  const handleFinishRide = (ride) => {
    if (userRole === 'passenger') {
      setShowRatingModal(true);
      setRideToRate(ride);
    } else {
      toast.info("Ride finished successfully!");
    }
  };

  const closeRatingModal = () => {
    setShowRatingModal(false);
    setRideToRate(null);
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
                          <button onClick={() => handleConfirm('accept', ride.Bookid, index)}>Accept</button>
                          <button onClick={() => handleConfirm('reject', ride.Bookid, index)}>Reject</button>
                        </div>
                      ))
                    ) : (
                      <p>No requests available.</p>
                    )}
                  </div>
                )}
                <button onClick={() => handleEditClick(ride)}>Edit Ride</button>
                <button onClick={() => handleFinishRides(ride)}>Finish Ride</button>
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
                <button onClick={() => handleFinishRide(ride)}>Finish Ride</button>
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
      {showRatingModal && (
        <StarRatingModal
          ride={rideToRate}
          onClose={closeRatingModal}
        />
      )}
      {showConfirmModal && (
        <ConfirmModal
          onConfirm={executeConfirmAction}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default CurrentRide;
