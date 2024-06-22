import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import userPhoto from '../assets/user.png';
import webLogo from '../assets/weblogo.png';
import LogoutConfirmation from '../components/LogoutConfirmation';

const EditProfilePopup = ({ profileData, onSave, onClose }) => {
  const [formData, setFormData] = useState(profileData);

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
    <div className="popup">
      <div className="popup-inner">
        <div className="popup-header">
          <img src={webLogo} alt="Website Logo" className="web-logo" />
          <button className="close-btn" onClick={onClose}>X</button>
        </div>
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>NIC No.</label>
          <input
            type="text"
            name="nicNo"
            value={formData.nicNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Save Changes</button>
      </div>
    </div>
  );
};

const Profile = () => {
  const initialProfileData = {
    username: 'nithushan21',
    fullName: 'Mahendran Nithushan',
    email: 'nithuofficial2000@gmail.com',
    nicNo: '200011200463',
    gender: 'Male',
    phoneNumber: '+94775596313',
  };

  const initialRideHistory = [
    { id: 1, date: '2023-05-01', route: 'Jaffna to Mannar', status: 'Completed' },
    { id: 2, date: '2023-05-15', route: 'Jaffna to Colombo', status: 'Completed' },
    { id: 3, date: '2023-06-10', route: 'Colombo to Jaffna', status: 'Cancelled' },
  ];

  const [profileData, setProfileData] = useState(initialProfileData);
  const [rideHistory] = useState(initialRideHistory);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showChangePasswordPopup, setShowChangePasswordPopup] = useState(false);

  const navigate = useNavigate();

  const handleSaveProfile = (formData) => {
    setProfileData(formData);
  };

  const toggleEditPopup = () => {
    setShowEditPopup(!showEditPopup);
  };

  const toggleLogoutConfirmation = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation);
  };

  const toggleChangePasswordPopup = () => {
    setShowChangePasswordPopup(!showChangePasswordPopup);
  };

  const handleLogoutConfirm = () => {
    // Perform any logout logic here, like clearing tokens, etc.
    navigate('/home');
  };

  const ChangePasswordPopup = ({ onSave, onClose }) => {
    const [formData, setFormData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSubmit = () => {
      // Add your password validation logic here
      if (formData.newPassword === formData.confirmPassword) {
        onSave(formData);
        onClose();
      } else {
        alert("New passwords don't match!");
      }
    };

    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="popup-header">
            <img src={webLogo} alt="Website Logo" className="web-logo" />
            <button className="close-btn" onClick={onClose}>X</button>
          </div>
          <h2>Change Password</h2>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className="submit-btn" onClick={handleSubmit}>Save Changes</button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="profile-container">
        {showEditPopup && (
          <EditProfilePopup
            profileData={profileData}
            onSave={handleSaveProfile}
            onClose={toggleEditPopup}
          />
        )}
        {showChangePasswordPopup && (
          <ChangePasswordPopup
            onSave={(data) => console.log(data)}
            onClose={toggleChangePasswordPopup}
          />
        )}
        {showLogoutConfirmation && (
          <LogoutConfirmation
            message="Are you sure you want to logout?"
            onConfirm={handleLogoutConfirm}
            onCancel={toggleLogoutConfirmation}
          />
        )}
        <div className="profile-left">
          <img src={userPhoto} alt="User Profile" className="profile-photo" />
        </div>
        <div className="profile-right">
          <h1>Profile</h1>
          <p><strong>Username:</strong> {profileData.username}</p>
          <p><strong>Full Name:</strong> {profileData.fullName}</p>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>NIC No.:</strong> {profileData.nicNo}</p>
          <p><strong>Gender:</strong> {profileData.gender}</p>
          <p><strong>Phone Number:</strong> {profileData.phoneNumber}</p>
          <div className="profile-actions">
            <button onClick={toggleEditPopup}>Edit Profile</button>
            <button onClick={toggleChangePasswordPopup}>Change Password</button>
            <button>Delete Account</button>
            <button onClick={toggleLogoutConfirmation}>Logout</button>
          </div>
          <div className="ride-history">
            <h2>Ride History</h2>
            {rideHistory.map((ride) => (
              <div key={ride.id} className="ride-history-item">
                <p><strong>Date:</strong> {ride.date}</p>
                <p><strong>Route:</strong> {ride.route}</p>
                <p><strong>Status:</strong> {ride.status}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
