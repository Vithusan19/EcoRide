import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Profile.css";
import userPhoto from '../assets/60111.jpg';
import LogoutConfirmation from '../components/LogoutConfirmation';
import DeleteConfirmation from '../components/DeleteConfirmation';
import EditProfileModal from '../components/EditProfileModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/step-7.jpg';
import bg2 from '../assets/step-8.avif';
import bg3 from '../assets/step-9.jpeg';
import Footer from '../components/Footer';

const UserProfile = ({ userID }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phoneno: "",
    nicno: "",
    gender: ""
  });
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const url = "http://localhost/ecoRide-Backend/Connection/User/Getprofile.php";
        let fdata = new FormData();
        fdata.append("userID", sessionStorage.getItem("UserID"));

        const response = await axios.post(url, fdata);
        console.log(response.data);

        if (response.data) {
          setProfile(response.data);
          setFormData({
            username: response.data.UserName,
            name: response.data.Name,
            email: response.data.Email,
            phoneno: response.data.PhoneNo,
            nicno: response.data.NicNo,
            gender: response.data.Gender
          });
        } else {
          setError("No profile details found.");
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
        setError("Error fetching profile details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const url = "http://localhost/ecoRide-Backend/Connection/User/Editprofile.php";
      const response = await axios.post(url, {
        userId: sessionStorage.getItem("UserID"),
        ...formData
      });

      if (response.data.success) {
        // Directly update the profile state with the new data
        setProfile({
          ...profile,
          UserName: formData.username,
          Name: formData.name,
          Email: formData.email,
          PhoneNo: formData.phoneno,
          NicNo: formData.nicno,
          Gender: formData.gender
        });
        setError("");
        setEditMode(false);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Error updating profile.");
    }
  };

  const handleLogout = () => {
    navigate('/home');
    sessionStorage.clear();
  };

  const handleLogoutConfirm = () => {
    navigate('/home');
    sessionStorage.clear();
  };

  const toggleLogoutConfirmation = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteAccountConfirm = async () => {
    try {
      const url = "http://localhost/ecoRide-Backend/Connection/User/Deleteprofile.php";
      let fdata = new FormData();
      fdata.append("userID", sessionStorage.getItem("UserID"));
  
      const response = await axios.post(url, fdata);
      console.log("Server response:", response.data);
  
      if (response.data.success) {
        navigate('/home');
        sessionStorage.clear();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      setError("Error deleting account.");
    }
  };

  const toggleDeleteConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const toggleChangePasswordModal = () => {
    setShowChangePasswordModal(!showChangePasswordModal);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!profile) {
    return <p>No profile details found.</p>;
  }

  return (
    <>
    <div class="image-slider">
          <img src={bg} alt="Image 1" class="slider-image"/>
          <img src={bg2} alt="Image 2" class="slider-image"/>
          <img src={bg3} alt="Image 3" class="slider-image"/>
   </div>
    <div className="profile-container">
    <div className="profile-card">
    <div className="profile-left">
      <img src={userPhoto} alt="User Profile" className="profile-photo" />
    </div>
    <div className="profile-content">
      <h1>User Profile</h1>
      {editMode ? (
        <EditProfileModal
          formData={formData}
          onChange={handleInputChange}
          onSave={handleSave}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <div className="profile-details">
          <p><strong>Username:</strong> {profile.UserName}</p>
          <p><strong>Name:</strong> {profile.Name}</p>
          <p><strong>Email:</strong> {profile.Email}</p>
          <p><strong>Phone number:</strong> {profile.PhoneNo}</p>
          <p><strong>NIC Number:</strong> {profile.NicNo}</p>
          <p><strong>Gender:</strong> {profile.Gender}</p>
        </div>
      )}
      <div className="button-container">
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
        <button onClick={toggleChangePasswordModal}>Change Password</button>
        <button onClick={handleDeleteAccount}>Delete Account</button>
        <button onClick={toggleLogoutConfirmation}>Logout</button>
      </div>
    </div>
  </div>
  
      

      {showDeleteConfirmation && (
        <DeleteConfirmation
          message="Are you sure you want to delete your account? This action cannot be undone."
          onConfirm={handleDeleteAccountConfirm}
          onCancel={toggleDeleteConfirmation}
        />
      )}

      {showLogoutConfirmation && (
        <LogoutConfirmation
          message="Are you sure you want to logout?"
          onConfirm={handleLogoutConfirm}
          onCancel={toggleLogoutConfirmation}
        />
      )}

      {showChangePasswordModal && (
        <ChangePasswordModal
          onSave={toggleChangePasswordModal}
          onClose={toggleChangePasswordModal}
        />
      )}
    </div>
    <Footer/>
    </>
    
  );
};

export default UserProfile;
