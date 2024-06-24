import React from 'react';

const Notification = () => {
  // const notifications = [
  //   { published_date: "June 17, 2024", name: 'Vithu', email: 'vithu@example.com', message: 'Hello there!' },
  //   { published_date: "June 20, 2024", name: ' Kani', email: 'kani@example.com', message: 'Good morning!' },
    
    
  // ];

  
  // const sortedNotifications = notifications.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));

  return (
    <>
      <h1>Notifications</h1>
      <p>Here are your notifications.</p>
      {/* <div className='message-container'>
        {sortedNotifications.map((notification, index) => (
          <div className='message-bar' key={index}>
            <h5 className='message-user'>{notification.name}</h5>
            <span className='message-email'>{notification.email}</span>
            <span className='message-details'>{notification.message}</span>
            <span className='message-date'>{notification.published_date}</span>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Notification;
