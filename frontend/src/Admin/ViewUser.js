import React, { useEffect, useState } from "react";
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
      const response = await axios.get('http://localhost/ecoride/api/');
      setUsers(response.data);
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

 
  const filteredUsers = users.filter(user =>
    
    (user.username?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.id.toString().includes(searchTerm)
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
          <div key={user.id} className="users-bar">
            <img className="users-img" src={userIcon} alt="" />
            <div className="users-bar-text">
              <h2>User-ID: {user.id}</h2>
              <p>Name: {user.username}</p>
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
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Name:</strong> {selectedUser.username}</p>
            <p><strong>Phonenumber:</strong> {selectedUser.phone_no}</p>
            <p><strong>NIC_Number:</strong> {selectedUser.nic_num}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Gender:</strong> {selectedUser.Gender}</p>
            <button className="delete-button" onClick={showDeleteDialog}>
              Delete User
            </button>
          </div>
        </div>
      )}

      {isDeleteDialogVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            {/* <button className="confirm-delete-button" onClick={handleDelete}> */}
             <button className="confirm-delete-button">
              Yes
            </button>
            <button className="user-button" onClick={hideDeleteDialog}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUser;
