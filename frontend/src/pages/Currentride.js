import React, { useState } from 'react';
import '../styles/Currentride.css';
import axios from 'axios';

const CurrentRide = () => {
  const [rides, setRides] = useState([
    {
      id: 1,
      departurePoint: 'New York',
      destinationPoint: 'Boston',
      date: '2024-06-27',
      departureTime: '08:00',
      destinationTime: '12:00',
      vehicleModel: 'Toyota Camry',
      seatCost: 1500,
      status: 'waiting', // Possible statuses: 'waiting', 'accepted'
      availableSeats: 3,
      driver: {
        name: 'David Smith',
        contact: '987-654-3210'
      },
      requests: [
        {
          id: 1,
          passengerName: 'John Doe',
          passengerContact: '123-456-7890',
          seatsRequested: 2
        }
      ],
      acceptedPassengers: [] // Array to hold accepted passengers
    },
    {
      id: 2,
      departurePoint: 'Los Angeles',
      destinationPoint: 'San Francisco',
      date: '2024-06-28',
      departureTime: '09:00',
      destinationTime: '13:30',
      vehicleModel: 'Honda Accord',
      seatCost: 2000,
      status: 'accepted',
      availableSeats: 2,
      driver: {
        name: 'Sarah Johnson',
        contact: '123-456-7890'
      },
      requests: [
        {
          id: 2,
          passengerName: 'Alice Johnson',
          passengerContact: '456-789-1230',
          seatsRequested: 1
        }
      ],
      acceptedPassengers: [] // Array to hold accepted passengers
    }
  ]);

  const [userRole] = useState('passenger'); // Can be 'driver' or 'passenger'
  const [showDriverDetails, setShowDriverDetails] = useState(null);
  const [showRequests, setShowRequests] = useState({});

  const handleCancelBooking = async (rideId) => {
    try {
      await axios.delete(`/api/rides/${rideId}`); // Replace with your actual API endpoint
      setRides(rides.filter(ride => ride.id !== rideId));
      console.log(`Booking for ride with ID ${rideId} canceled.`);
    } catch (error) {
      console.error("Error canceling booking:", error);
    }
  };

  const handleAcceptRequest = async (rideId, requestId) => {
    try {
      const ride = rides.find(r => r.id === rideId);
      const request = ride.requests.find(req => req.id === requestId);

      if (request.seatsRequested > ride.availableSeats) {
        console.log(`Cannot accept request with ID ${requestId}. Requested seats exceed available seats.`);
        alert(`Cannot accept request. Requested seats exceed available seats.`);
        return;
      }

      await axios.post(`/api/rides/${rideId}/accept-request`, { requestId }); // Replace with your actual API endpoint

      setRides(rides.map(ride =>
        ride.id === rideId
          ? {
              ...ride,
              availableSeats: ride.availableSeats - request.seatsRequested,
              status: ride.availableSeats - request.seatsRequested === 0 ? 'accepted' : ride.status,
              requests: ride.requests.filter(request => request.id !== requestId),
              acceptedPassengers: [
                ...ride.acceptedPassengers,
                {
                  name: request.passengerName,
                  contact: request.passengerContact,
                  seatsRequested: request.seatsRequested
                }
              ]
            }
          : ride
      ));
      console.log(`Request with ID ${requestId} accepted.`);
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleRejectRequest = async (rideId, requestId) => {
    try {
      await axios.post(`/api/rides/${rideId}/reject-request`, { requestId }); // Replace with your actual API endpoint
      setRides(rides.map(ride =>
        ride.id === rideId
          ? {
              ...ride,
              requests: ride.requests.filter(request => request.id !== requestId)
            }
          : ride
      ));
      console.log(`Request with ID ${requestId} rejected.`);
    } catch (error) {
      console.error("Error rejecting request:", error);
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

  return (
    <div className="current-ride-container">
      <h1>Current Rides</h1>
      {rides.length > 0 ? (
        rides.map((ride) => (
          <div key={ride.id} className="ride-details">
            <p><strong>Departure Point:</strong> {ride.departurePoint}</p>
            <p><strong>Destination Point:</strong> {ride.destinationPoint}</p>
            <p><strong>Date:</strong> {ride.date}</p>
            <p><strong>Time:</strong> {ride.departureTime} - {ride.destinationTime}</p>
            <p><strong>Vehicle:</strong> {ride.vehicleModel}</p>
            <p><strong>Cost per Seat:</strong> LKR {ride.seatCost}</p>

            {userRole === 'driver' && (
              <div>
                <p><strong>Available Seats:</strong> {ride.availableSeats}</p>
                <button onClick={() => toggleRequests(ride.id)}>
                  {showRequests[ride.id] ? 'Hide Requests' : 'Passenger Requests'}
                </button>
                {showRequests[ride.id] && (
                  <div className="request-details">
                    {ride.requests.length > 0 ? (
                      ride.requests.map((request) => (
                        <div key={request.id} className="request">
                          <p><strong>Name:</strong> {request.passengerName}</p>
                          <p><strong>Contact:</strong> {request.passengerContact}</p>
                          <p><strong>Seats Requested:</strong> {request.seatsRequested}</p>
                          <button onClick={() => handleAcceptRequest(ride.id, request.id)}>Accept</button>
                          <button onClick={() => handleRejectRequest(ride.id, request.id)}>Reject</button>
                        </div>
                      ))
                    ) : (
                      <p>No requests available.</p>
                    )}
                  </div>
                )}
              </div>
            )}

            {userRole === 'passenger' && (
              <div>
                <p><strong>Status:</strong> {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}</p>
                {ride.status === 'accepted' && (
                  <>
                    <button onClick={() => toggleDriverDetails(ride.id)}>
                      {showDriverDetails === ride.id ? 'Hide Driver Details' : 'Show Driver Details'}
                    </button>
                    <button className="cancel-booking-button" onClick={() => handleCancelBooking(ride.id)}>
                      Cancel Ride
                    </button>
                    {showDriverDetails === ride.id && (
                      <div className="driver-details">
                        <p><strong>Driver Name:</strong> {ride.driver.name}</p>
                        <p><strong>Contact:</strong> {ride.driver.contact}</p>
                      </div>
                    )}
                  </>
                )}
                {ride.status === 'waiting' && (
                  <button className="cancel-booking-button" onClick={() => handleCancelBooking(ride.id)}>
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
                    <p><strong>Name:</strong> {passenger.name}</p>
                    <p><strong>Contact:</strong> {passenger.contact}</p>
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
    </div>
  );
};

export default CurrentRide;
