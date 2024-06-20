import React, { useState } from "react";
import users from "../assets/users.png";
import userIcon from "../assets/usersIcon.png";
import rides from "../assets/rideIcon.png";
import revenue from "../assets/revenue.png";
import message from "../assets/message.png";
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const counts = {
  driverCount: 250,
  passengerCount: 450,
  messageCount: 500,
  revenue: 67000,
  availableRide: 30
};

const usersMessageData = [
  { name: 'Users', count: counts.driverCount+counts.passengerCount },
  { name: 'Messages', count: counts.messageCount },
];

const revenueData = [
  { month: 'Jan', revenue: 5000 },
  { month: 'Feb', revenue: 7000 },
  { month: 'Mar', revenue: 10000 },
  { month: 'Apr', revenue: 15000 },
  { month: 'May', revenue: 20000 },
  { month: 'Jun', revenue: 25000 },
  { month: 'Jul', revenue: 30000 },
  { month: 'Aug', revenue: 35000 },
  { month: 'Sep', revenue: 40000 },
  { month: 'Oct', revenue: 45000 },
  { month: 'Nov', revenue: 50000 },
  { month: 'Dec', revenue: counts.revenue },
];

const Interface = () => {
  const [showModal, setShowModal] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    email: "admin@example.com",
    username: "admin",
    password: "password123",
    phoneNumber: "0763915184",
  });
  const [formDetails, setFormDetails] = useState({ ...adminDetails });

  const handleEditClick = () => {
    setFormDetails({ ...adminDetails });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSaveChanges = () => {
    setAdminDetails({ ...formDetails });
    setShowModal(false);
  };

  const userData = [
    { role: "Passengers", value: counts.passengerCount },
    { role: "Drivers", value: counts.driverCount }
  ];

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
        <div className="dashboard-container">
          <div className="dashboard-left-con">
            <div className="dashboard-left-up">
              <div className="dashboard-left-count">
                <div>
                  <img src={users} alt="users" className="count-img" />
                  <h3 className="count-title">Current users</h3>
                </div>
                <span className="count-res">{counts.passengerCount + counts.driverCount}</span>
              </div>
              <div className="dashboard-left-count">
                <div>
                  <img src={rides} alt="rides" className="count-img" />
                  <h3 className="count-title">Available Rides</h3>
                </div>
                <span className="count-res">{counts.availableRide}</span>
              </div>
            </div>
            <div className="dashboard-left-down">
              <div className="dashboard-left-count">
                <div>
                  <img src={revenue} alt="revenue" className="count-img" />
                  <h3 className="count-title">Revenue</h3>
                </div>
                <span className="count-res">LKR {counts.revenue}</span>
              </div>
              <div className="dashboard-left-count">
                <div>
                  <img src={message} alt="message" className="count-img" />
                  <h3 className="count-title">Messages</h3>
                </div>
                <span className="count-res">{counts.messageCount}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-right-con">
            <div className="admin-user">
              <h3 className="admin-user-title">Admin information</h3>
              <img src={userIcon} alt="userIcon" className="admin-user-img" />
              <div className="admin-user-info">
                <p>Email: {adminDetails.email}</p>
                <p>Username: {adminDetails.username}</p>
                <p>Phone Number: {adminDetails.phoneNumber}</p>
              </div>

              <button className="admin-user-edit-but" onClick={handleEditClick}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-chart">
        <div className="chart">
          <h3>User Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie data={userData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
          </PieChart>
        </div>
        <div className="chart">
          <h3>Users and Messages</h3>
          <BarChart width={500} height={300} data={usersMessageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="chart">
          <h3>Revenue Over Time</h3>
          <LineChart width={600} height={300} data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Admin Details</h2>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <form className="admin-info">
              <label className="admin-info-label">Email:</label>
              <input
                className="admin-info-input"
                type="email"
                name="email"
                value={formDetails.email}
                onChange={handleChange}
              />
              <label className="admin-info-label">Username:</label>
              <input
                className="admin-info-input"
                type="text"
                name="username"
                value={formDetails.username}
                onChange={handleChange}
              />
              <label className="admin-info-label">Phone Number:</label>
              <input
                className="admin-info-input"
                type="text"
                name="phoneNumber"
                value={formDetails.phoneNumber}
                onChange={handleChange}
              />
              <label className="admin-info-label">Password:</label>
              <input
                className="admin-info-input"
                type="password"
                name="password"
                value={formDetails.password}
                onChange={handleChange}
              />
              <button
                className="admin-info-button"
                type="button"
                onClick={handleSaveChanges}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Interface;
