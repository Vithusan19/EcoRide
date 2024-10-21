import React, { useState, useEffect } from 'react';
import '../styles/Currentride.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditRideModal from '../components/EditRideModal';
import StarRatingModal from '../components/StarRatingModal';
import Footer from '../components/Footer';
import ConfirmModal from '../components/ConfirmModal'; 
import Modal from 'react-modal';

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
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [confirmAction, setConfirmAction] = useState(null); 

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
      const filteredRides = response.data.filter(ride => ride.status !== 'finished' );
        setRides(filteredRides);
        
    } catch (error) {
      console.error(error);
     // toast.error("Failed to fetch current rides");
    }
  };


  
  

  const handleCancelBooking = async (Bookid) => {
    const loadingToast = toast.loading("Cancelling booking...");
    console.log(Bookid);
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
      console.log('Bookid:', Bookid, 'requestID:', requestId);

      if (response.data.status === 1) {
        toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
        window.location.reload();
      } else {
        toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.update(loadingToast, { render: "Failed to reject the request", type: "error", isLoading: false, autoClose: 3000 });
    }
  };

  const handleConfirm = (action, Bookid, requestId,ride) => {
    setConfirmAction({ action, Bookid, requestId,ride });
    setShowConfirmModal(true); 
  };


  const executeConfirmAction = () => {
    if (confirmAction?.action === "accept") {
      handleAcceptRequest(confirmAction.Bookid, confirmAction.requestId);
    } else if (confirmAction?.action === "reject") {
      handleRejectRequest(confirmAction.Bookid, confirmAction.requestId);
    }
    setShowConfirmModal(false); 
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

  const canCancelBooking = (departureTime) => {
    console.log("Received departureTime:", departureTime);
    console.log("Type of departureTime:", typeof departureTime);
  
    const today = new Date(); 
    const formattedDepartureTime = `${today.toISOString().split("T")[0]}T${departureTime}`; 
  
    console.log("Formatted departureTime:", formattedDepartureTime);
  
    const rideStartTime = new Date(formattedDepartureTime).getTime(); 
    console.log("Converted rideStartTime:", rideStartTime); 
  
    const currentTime = Date.now(); 
    console.log("Current time:", currentTime);
  
    const timeDiff = rideStartTime - currentTime; 
    console.log("Time difference:", timeDiff);
  
    return timeDiff > 3600000;
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
        Data.append("rideID", ride.rideID);
        Data.append("userID", userId); 

        const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/Finishridedriver.php', Data);

        if (response.data.status === 1) {
            if (userRole === 'driver') {
             
                toast.update(loadingToast, { render: "Ride finished successfully!", type: "success", isLoading: false, autoClose: 3000 });
                setRides((prevRides) => prevRides.filter(r => r.rideID !== ride.rideID));  
                
              } else {
                toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
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
      setRides((prevRides) => prevRides.filter(r => r.rideID !== ride.rideID));
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

  const ConfirmModal = ({ show, onConfirm, onCancel, action, ride, passengercost }) => {
    const deduction = (passengercost * 0.1).toFixed(2);  
    const message = action === 'accept' 
      ? `For this request, the system will deduct Rs. ${deduction} from your account`
      : `Are you sure you want to reject the request for the ride from ${ride.departurePoint} to ${ride.destinationPoint}?`;
  
    const handleAcceptRequest = async (Bookid) => {
      const loadingToast = toast.loading("Accepting request...");
      try {
        const Data = new FormData();
        Data.append("Bookid", Bookid);
  
        const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/AcceptRide.php', Data);
  
        if (response.data.status === 1) {
          toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
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
  
        if (response.data.status === 1) {
          toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
          window.location.reload();
        } else {
          toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
          window.location.reload();
        }
      } catch (error) {
        console.error("Error rejecting request:", error);
        toast.update(loadingToast, { render: "Failed to reject the request", type: "error", isLoading: false, autoClose: 3000 });
      }
    };
  
    const handleConfirmDeduction = async (Bookid) => {
      const loadingToast = toast.loading("Processing deduction...");
      try {
        const Data = new FormData();
        Data.append("BookingID", Bookid);
  
        const response = await axios.post('http://localhost/ecoRide-Backend/Connection/Ride/Deduction.php', Data);
    
        if (response.data.status === 1) {
          handleAcceptRequest(Bookid);
          toast.update(loadingToast, { render: response.data.message, type: "success", isLoading: false, autoClose: 3000 });
          window.location.reload();
        } else {
          toast.update(loadingToast, { render: response.data.message, type: "error", isLoading: false, autoClose: 3000 });
        }
      } catch (error) {
        console.error("Error processing deduction:", error);
        toast.update(loadingToast, { render: "Failed to process the deduction", type: "error", isLoading: false, autoClose: 3000 });
      }
    };
  
    const handleConfirm = () => {
      if (action === 'accept') {
        handleConfirmDeduction(ride.Bookid);
      } else if (action === 'reject') {
        handleRejectRequest(ride.Bookid, ride.requestId);
      } else {
        onConfirm(ride.Bookid);
      }
    };
  
    // Modal styles
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',  
        padding: '20px', 
        borderRadius: '10px', 
        transition: 'all 0.3s ease-in-out', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        transition: 'opacity 0.3s ease-in-out' 
      }
    };
  
    return (
      <Modal
        isOpen={show}
        onRequestClose={onCancel}
        contentLabel="Confirm Action"
        ariaHideApp={false}
        style={customStyles} 
      >
        <h2>Confirm {action.charAt(0).toUpperCase() + action.slice(1)}</h2>
        <p>{message}</p>
        <ToastContainer />
        <div className="button-container">
        <button onClick={handleConfirm}>Yes</button>
        <button onClick={onCancel}>No</button>
      </div>
      </Modal>
    );
  };
  
  return (
    <div className="current-ride-container">
      <ToastContainer />
      <h1 style={{textAlign:"center"}}> Current Rides</h1>
      {rides.length > 0 ? (
        rides.map((ride) => (
          
          <div key={ride.Bookid} className="ride-details">
            <p><strong>Departure Point:</strong> {ride.departurePoint}</p>
            <p><strong>Destination Point:</strong> {ride.destinationPoint}</p>
            
            <p><strong>Date:</strong> {ride.date}</p>
            <p><strong>Time:</strong> {ride.departureTime} - {ride.destinationTime}</p>
            <p><strong>Vehicle:</strong> {ride.vehicleModel}</p>
            {/* <p><strong>Cost per Seat:</strong> LKR {ride.seatCost}</p> */}
           


            {userRole === 'driver' && (
              <div>
                <p><strong>Cost per Seat:</strong> LKR {ride.seatCost}</p>
                <p><strong>Available Seats:</strong> {ride.availableSeats}</p>
                <button onClick={() => toggleRequests(ride.Bookid)}>
                  {showRequests[ride.Bookid] ? 'Hide Requests' : 'Passenger Requests'}
                </button>

                <button onClick={() => handleEditClick(ride)}>Edit Ride</button>
                <button onClick={() => handleFinishRides(ride)}>Finish Ride</button>
              </div>
            )}
                {showRequests[ride.Bookid] && (
                  <div className="request-details">
                    {ride.requests.length > 0 ? (
                      ride.requests.map((request, index) => (
                        <div key={index} className="request">
                          <p><strong>Name:</strong> {request.passengerName}</p>
                          <p><strong>Contact:</strong> {request.passengerContact}</p>
                          <p><strong>From to Where:</strong> {request.place}</p>
                          <p><strong>Seats Requested:</strong> {request.seatsRequested}</p>
                          <p><strong>Cost :</strong> {request.passengercost}</p>
                          {ride.availableSeats > 0 && ride.availableSeats >= request.seatsRequested ? (
                <>
                  <button onClick={() => handleConfirm('accept', ride.Bookid, index, ride)}>
                    Accept
                  </button>
                  <button onClick={() => handleConfirm('reject', ride.Bookid, index, ride)}>
                    Reject
                  </button>
                </>
              ) : (
                <p>Insufficient available seats to accept this request.</p>
              )}
            </div>
          ))
                    ) : (
                      <p>No requests available.</p>
                    )}
                  </div>
                )}
            {userRole === 'passenger' && (
              <div>
                <p><strong>Cost:</strong>LKR {ride.passengercost}</p>
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
                   
                   {canCancelBooking(ride.departureTime) ? (
  <button className="cancel-booking-button" onClick={() => handleCancelBooking(ride.Bookid)}>
    Cancel Ride
  </button>
) : (
  <p>You can no longer cancel this ride (less than 1 hour remaining).</p>
)}
                    <button onClick={() => handleFinishRide(ride)}>Finish Ride</button>
                  </>
                )}
                {ride.status === 'waiting' && (
                  <button className="cancel-booking-button" onClick={() => handleCancelBooking(ride.Bookid)}>
                    Cancel Booking
                  </button>
                )}
                {/* <button onClick={() => handleFinishRide(ride)}>Finish Ride</button> */}
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
                    <p><strong>Seat Cost:</strong> LKR {passenger.passengercost}</p>
                    <p><strong>From to Where:</strong> {passenger.place}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="no-rides-message">You have no current ride.</p>
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
      {/* {showConfirmModal && (
        <ConfirmModal
        ride={confirmAction?.ride}
          onConfirm={executeConfirmAction}
          onCancel={() => setShowConfirmModal(false)}
        />
      )} */}
      {showConfirmModal && confirmAction && (
        <ConfirmModal
          show={showConfirmModal}
          action={confirmAction.action}
          ride={confirmAction.ride}
          passengercost={confirmAction.ride.passengercost}
          onConfirm={() => executeConfirmAction()}
          onCancel={() => setShowConfirmModal(false)}
        />
)}
      <Footer />
     

    </div>
  );
};

export default CurrentRide;