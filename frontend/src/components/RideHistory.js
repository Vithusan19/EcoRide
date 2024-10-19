import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RideHistory.css';
const RideHistory = () => {
  const [rideHistory, setRideHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRideHistory = async () => {
      try {
        const url = "http://localhost/ecoRide-Backend/Connection/User/GetHistory.php"; // Update to the correct backend URL
        let fdata = new FormData();
        fdata.append("userID", sessionStorage.getItem("UserID")); // Assumes UserID is stored in sessionStorage
        console.log("UserID:", sessionStorage.getItem("UserID"));

        const response = await axios.post(url, fdata);
        console.log(response.data);

        if (response.data && response.data.res) {
          setRideHistory(response.data.res); // Set the history list
        } else {
          setError(response.data.message || "No ride history found.");
        }
      } catch (error) {
        console.error("Error fetching ride history:", error);
        setError("Error fetching ride history.");
      } finally {
        setLoading(false);
      }
    };

    fetchRideHistory();
  }, []);

  if (loading) {
    return <div>Loading ride history...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="ride-history-container">
      <h2>Your Ride History</h2>
      {rideHistory.length > 0 ? (
        <ul>
          {rideHistory.map((ride, index) => (
            // <li key={index}>
            <div className="profile-details" key={index}>
            <p><strong>Departure:</strong> {ride.departurePoint}</p>
            <p><strong>Destination:</strong> {ride.destinationPoint}</p>
            <p><strong>Date:</strong> {ride.date}</p>
            <p><strong>Vehicle Number:</strong> {ride.vehicleNo || "N/A"}</p>
            <hr />
          </div>
              
            // </li>
          ))}
        </ul>
      ) : (
        <p>No ride history found.</p>
      )}
    </div>
  );
};

export default RideHistory;
