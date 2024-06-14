import React, { useState } from 'react';
//import Searchbar from '../Components/Searchbar'; // Import the Searchbar component
import Searchbar from '../components/Searchbar';
import '../styles/Newsfeed.css';
// import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom'; // Import Link component

const Newsfeed = () => {
  const [cards] = useState([
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'], // Updated data structure to represent the route
      timePeriod: '6 AM - 12 PM',
      seats: 4,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      seats: 3,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'galle',
      route: ['jaffna', 'Colombo', 'galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'], // Updated data structure to represent the route
      timePeriod: '6 AM - 12 PM',
      seats: 4,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      seats: 3,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'galle',
      route: ['jaffna', 'Colombo', 'galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'galle',
      route: ['jaffna', 'Colombo', 'galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'], // Updated data structure to represent the route
      timePeriod: '6 AM - 12 PM',
      seats: 4,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      seats: 3,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'galle',
      route: ['jaffna', 'Colombo', 'galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'galle',
      route: ['jaffna', 'Colombo', 'galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'], // Updated data structure to represent the route
      timePeriod: '6 AM - 12 PM',
      seats: 4,
    },
   
    // Add more cards as needed
  ]);

  return (
    <div>
      <Searchbar /> {/* Include the Searchbar component */}
      <section>
        <div className="cards-container">
          <div className="cards">
            {cards.map((card, index) => (
              <div key={index} className="card">
                <h3>{card.car}</h3>
                <p><strong>From:</strong> {card.from}</p>
                <p><strong>To:</strong> {card.to}</p>
                <p><strong>Route:</strong> {card.route.join(' ➜ ')}</p> {/* Display the route */}
                <p><strong>Time Period:</strong> <span className="time-period">{card.timePeriod}</span></p>
                <p><strong>Available Seats:</strong> <span className="seats">{card.seats}</span></p>
                <Link to={`/readmore/${index}`} className="read-more">Read More</Link> {/* Link to Readmore */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsfeed;
