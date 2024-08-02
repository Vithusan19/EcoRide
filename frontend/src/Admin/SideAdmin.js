import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from '../assets/logo.png';
import logout from '../assets/logout.png';
import users from '../assets/users.png';
import rides from '../assets/rideIcon.png';
import notification from '../assets/notification.png';
import dashboard from '../assets/dashboard.png';
import LogoutConfirmation from '../components/LogoutConfirmation';

const SideAdmin = ({ setSelectedSection }) => {
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const navigate = useNavigate();

  const toggleLogoutConfirmation = () => {
    setShowLogoutConfirmation(!showLogoutConfirmation);
  };

  const handleLogoutConfirm = () => {
    // Perform any logout logic here, like clearing tokens, etc.
    navigate('/home');
  };

  return (
    <>
      <div className="sidebar">
        <img src={logo} alt='logo' className='side-logo' />
        <hr className='side-line' />
        <ul>
          <li onClick={() => setSelectedSection('dashboard')}>
            <img src={dashboard} alt='side-menu-img' className='side-menu-img'/>
            {/* <span className='side-menu-name'>Dashboard</span> */}
          </li>
          <li onClick={() => setSelectedSection('user-details')}>
            <img src={users} alt='side-menu-img' className='side-menu-img'/>
            {/* <span className='side-menu-name'>User Details</span> */}
          </li>
          <li onClick={() => setSelectedSection('ride-details')}>
            <img src={rides} alt='side-menu-img' className='side-menu-img'/>
            {/* <span className='side-menu-name'>Ride Details</span> */}
          </li>
          <li onClick={() => setSelectedSection('notification')}>
            <img src={notification} alt='side-menu-img' className='side-menu-img'/>
            {/* <span className='side-menu-name'>Messages</span> */}
          </li>
        </ul>
        <button className='side-button' onClick={toggleLogoutConfirmation}>
          <img src={logout} alt='logout' className='logout-img'/>
          <span className='side-menu-name'>Logout</span>
        </button>
      </div>
      {showLogoutConfirmation && (
        <LogoutConfirmation
          message="Are you sure you want to logout?"
          onConfirm={handleLogoutConfirm}
          onCancel={toggleLogoutConfirmation}
        />
      )}
    </>
  );
};

export default SideAdmin;
