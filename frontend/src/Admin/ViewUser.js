import React, { useState } from "react";
import "./style.css";
import userIcon from '../assets/usersIcon.png';

const users = [
  { id: 1, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male"},
  { id: 2, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 3, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 4, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 1, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male"},
  { id: 2, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 3, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 4, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
 
  { id: 1, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male"},
  { id: 2, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 3, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 4, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
 
  { id: 1, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male"},
  { id: 2, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 3, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
  { id: 4, name: "CST21012",nic:"200026303685",email:"vithu1909@gmail.com" ,phno:"0763456789",gender:"male" },
 
 
];

const ViewUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);

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

  const handleDelete = () => {
    // Perform delete action here
    console.log(`User ${selectedUser.id} deleted`);
    hideDeleteDialog();
    closeModal();
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.toString().includes(searchTerm)
  );

  return (
    <>
      <h1>User Details</h1>
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
              <p>Name: {user.name}</p>
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
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Phonenumber:</strong> {selectedUser.phno}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <button className="delete-button" onClick={showDeleteDialog}>
              Delete User
            </button>
          </div>
        </div>
      )}

      {isDeleteDialogVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2 >Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            <button className="confirm-delete-button" onClick={handleDelete}>
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
