import React, { useState, useEffect } from "react";
import "./style.css";
import axios from 'axios';
import userIcon from '../assets/usersIcon.png';

const ViewUser = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost/ecoRide-Backend/Connection/User/Displayuser.php');
      setUsers(response.data.users);
      sessionStorage.setItem("total", response.data.users.length);
      sessionStorage.setItem("UserCount", response.data.user_count);
      sessionStorage.setItem("DriverCount", response.data.driver_count);
      
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewMore = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const showDeleteDialog = () => {
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  const handleDeleteUser = async () => {
    const url = "http://localhost/ecoRide-Backend/Connection/User/DeleteUser.php";
    let fdata = new FormData();
    fdata.append("userid", selectedUser.User_ID);

    try {
      const response = await axios.post(url, fdata);
      console.log(response.data);
      if (response.data.message === "User Delele Successfully") {
        //console.log(response.data.message);
       
        hideDeleteDialog();
        closeModal();
        getUsers();

       
        
      } else {
        console.log(response.data.message);
        
      }
    } catch (error) {
      console.error("There was an error deleting the user!", error);
    }
  };

  const filteredUsers = users
    .filter(user => user.userrole !== "admin")
    .filter(user =>
      (user.UserName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.User_ID.toString().includes(searchTerm)
    );

  return (
    <>
      <h1 className="userdetails-tittle">User Details</h1>
      <p>Here are the user details.</p>
      <div className="search-con">
        <input
          type="text"
          placeholder="Search users"
          className="search-users"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="users-bars">
        {filteredUsers.map((user) => (
          <div key={user.User_ID} className="users-bar">
            <img className="users-img" src={userIcon} alt="" />
            <div className="users-bar-text">
              <h2>User-ID: {user.User_ID}</h2>
              <p>Name: {user.UserName}</p>
              <button className="user-button" onClick={() => handleViewMore(user)}>
                View more
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <p><strong>ID:</strong> {selectedUser.User_ID}</p>
            <p><strong>Username:</strong> {selectedUser.UserName}</p>
            <p><strong>Name:</strong> {selectedUser.Name}</p>
            <p><strong>Email:</strong> {selectedUser.Email}</p>
            <p><strong>Phone number:</strong> {selectedUser.PhoneNo}</p>
            <p><strong>NIC Number:</strong> {selectedUser.NicNo}</p>
            <p><strong>Gender:</strong> {selectedUser.Gender}</p>
            <button className="delete-button" onClick={showDeleteDialog}>
              Delete User
            </button>
          </div>
        </div>
      )}

      {isDeleteDialogVisible && (
        <div className="modal">
          <div className="modal-content-delete">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-content-delete-button">
              <button className="confirm-delete-button" onClick={handleDeleteUser}>
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

export default ViewUser;