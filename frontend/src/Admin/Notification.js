import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userIcon from '../assets/usersIcon.png';
import dateIcon from '../assets/date.png';
import emailIcon from '../assets/email_Icon.png';
import messageIcon from '../assets/messageIcon.png';

const Notification = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost/ecoRide-Backend/Connection/User/Displaymessage.php');
      const sortedMessages = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setMessages(sortedMessages);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  return (
    <>
      <h1>Messages</h1>
      <p>Here are your messages.</p>
      
      <div className='message-container'>
        {messages.map((message, index) => (
          <div className='message-bar' key={index}>
            <div className='message-infor-bar'>
              <img src={userIcon} alt='user icon' className='message-img' />
              <span className='message-name'>{message.name}</span>
            </div>
            <div className='message-infor-bar'>
              <img src={emailIcon} alt='email icon' className='message-img' />
              <span className='message-email'>{message.emailAdress}</span>
            </div>
            <div className='message-infor-bar'>
              <img src={messageIcon} alt='message icon' className='message-img' />
              <span className='message-tittle'>{message.message}</span>
            </div>
            <div className='message-infor-bar'>
              <img src={dateIcon} alt='date icon' className='message-img' />
              <span className='message-date'>{message.date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Notification;
