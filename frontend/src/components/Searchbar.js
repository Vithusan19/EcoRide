

// import React, { useState } from 'react';
// import { BiBell } from 'react-icons/bi'; // Importing the bell icon
// import '../styles/Searchbar.css'; // Ensure you have this CSS file

// const Searchbar = () => {
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications] = useState([
//     { id: 1, text: 'Notification 1', time: '2 minutes ago' },
//     { id: 2, text: 'Notification 2', time: '5 minutes ago' },
//     { id: 3, text: 'Notification 3', time: '10 minutes ago' },
//     { id: 4, text: 'Notification 4', time: '15 minutes ago' },
//     { id: 5, text: 'Notification 5', time: '20 minutes ago' },
//   ]);

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };

//   return (
//     <div className="search-bar">
//       <input type="text" placeholder="Search..." />
//       <div className="bell-container" onClick={toggleNotifications}>
//         <BiBell className="bell-icon" />
//         {showNotifications && (
//           <div className="notification-popup">
//             <div className="notification-header">
//               Notifications
//             </div>
//             <div className="notification-list">
//               {notifications.map((notification) => (
//                 <div key={notification.id} className="notification-item">
//                   <div className="notification-icon">
//                     <BiBell />
//                   </div>
//                   <div className="notification-content">
//                     <div className="notification-text">{notification.text}</div>
//                     <div className="notification-time">{notification.time}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="notification-footer" onClick={toggleNotifications}>
//               Close
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Searchbar;

import React, { useState } from 'react';
import { BiBell } from 'react-icons/bi'; // Importing the bell icon
import '../styles/Searchbar.css'; // Ensure you have this CSS file

const Searchbar = ({ onSearch }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, text: 'Notification 1', time: '2 minutes ago' },
    { id: 2, text: 'Notification 2', time: '5 minutes ago' },
    { id: 3, text: 'Notification 3', time: '10 minutes ago' },
    { id: 4, text: 'Notification 4', time: '15 minutes ago' },
    { id: 5, text: 'Notification 5', time: '20 minutes ago' },
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleSearchChange}
      />
      <div className="bell-container" onClick={toggleNotifications}>
        <BiBell className="bell-icon" />
        {showNotifications && (
          <div className="notification-popup">
            <div className="notification-header">
              Notifications
            </div>
            <div className="notification-list">
              {notifications.map((notification) => (
                <div key={notification.id} className="notification-item">
                  <div className="notification-icon">
                    <BiBell />
                  </div>
                  <div className="notification-content">
                    <div className="notification-text">{notification.text}</div>
                    <div className="notification-time">{notification.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="notification-footer" onClick={toggleNotifications}>
              Close
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
