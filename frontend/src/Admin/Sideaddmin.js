import React from 'react';
import './style.css';
import logo from '../assets/logo.png';

const Sideaddmin = ({ setSelectedSection }) => {
  return (
    <>
      <div className="sidebar">
        <img src={logo} alt='logo' className='side-logo' />
        <hr className='side-line' />
        <ul>
            <li onClick={() => setSelectedSection('dashboard')}>Dashboard</li>
          <li onClick={() => setSelectedSection('user-details')}>User Details</li>
          <li onClick={() => setSelectedSection('ride-details')}>Ride Details</li>
          <li onClick={() => setSelectedSection('notification')}>Notification</li>
        
        </ul>
        <button className='side-button'>Logout</button>
      </div>
    </>
  );
};

export default Sideaddmin;
