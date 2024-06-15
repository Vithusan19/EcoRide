import React, { useState } from 'react'
import ViewRides from '../Admin/ViewRides'
import ViewUser from '../Admin/ViewUser'
import Interface from '../Admin/Interface'

import Notification from '../Admin/Notification'
import '../styles/Addmin.css'

import SideAdmin from '../Admin/SideAdmin'
const Admin = () => {
    const [selectedSection, setSelectedSection] = useState('dashboard');
    const renderSection = () => {
        switch (selectedSection) {
          case 'user-details':
            return <ViewUser />;
          case 'ride-details':
            return <ViewRides />;
          case 'notification':
            return <Notification />;
          case 'dashboard':
          default:
            return <Interface />;
        }
      };

  return (
    <div className="admin-container">
      <SideAdmin setSelectedSection={setSelectedSection} />
      <div className="admin-content">
        {renderSection()}
      </div>
    </div>
  )
}

export default Admin