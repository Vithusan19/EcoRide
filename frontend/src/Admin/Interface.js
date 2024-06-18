import React, { useState } from 'react';
//import users from '../assets/users.png';
import userIcon from '../assets/usersIcon.png';

const Interface = () => {
  const [showModal, setShowModal] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    email: 'admin@example.com',
    username: 'admin',
    password: 'password123',
    Phonenumber:'0763915184'
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

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p>Welcome to the admin dashboard.</p>
        <div className='dashboard-container'>
          <div className='dashboard-left-con'>
            
            
          </div>
          <div className='dashboard-right-con'>
            <div className='admin-user'>
              <h3 className='admin-user-tittle'>Admin information</h3>
              <img src={userIcon} alt='userIcon' className='admin-user-img'/>
              <div className='admin-user-info'>
              <p>Email: {adminDetails.email}</p>
              <p>Username: {adminDetails.username}</p>
              <p>Phonenumber: {adminDetails.Phonenumber}</p>

              </div>
              
             
              <button  className='admin-user-edit-but' onClick={handleEditClick}>Edit</button>
            </div>
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2>Edit Admin Details</h2>
              <button className='close-button' onClick={handleCloseModal}>&times;</button>
            </div>
            <form className='admin-info'>
              <label className='admin-info-label'>Email:</label>
              <input className='admin-info-input' type="email" name="email" value={formDetails.email} onChange={handleChange} />
              <label className='admin-info-label' >Username:</label>
              <input className='admin-info-input'type="text" name="username" value={formDetails.username} onChange={handleChange} />
              <label className='admin-info-label'>Password:</label>
              <input className='admin-info-input'type="text" name="phonenumber" value={formDetails.Phonenumber} onChange={handleChange} />
              <label className='admin-info-label'>Password:</label>
              <input className='admin-info-input'type="password" name="password" value={formDetails.password} onChange={handleChange} />
              <button className='admin-info-button' type="button" onClick={handleSaveChanges}>Save</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Interface;
