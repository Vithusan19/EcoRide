import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notification = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost/ecoRide-Backend/Connection/User/Displaymessage.php');
      setMessages(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const sortedNotifications = messages.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));

  return (
    <>
      <h1>Notifications</h1>
      <p>Here are your notifications.</p>
      <div className='message-container'>
        {sortedNotifications.map((messages, index) => (
          <div className='message-bar' key={index}>
            <h5 className='message-user'>{messages.name}</h5>
            <span className='message-email'>{messages.emailAdress}</span>
            <span className='message-details'>{messages.message}</span>
            <span className='message-date'>{messages.date}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notification;
