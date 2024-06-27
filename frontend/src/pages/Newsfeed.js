import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import '../styles/Newsfeed.css';
import { Link } from 'react-router-dom'; // Import Link component
import ReactStars from 'react-rating-stars-component'; // Import ReactStars component
import { FaClock, FaMapMarkerAlt, FaUsers, FaCar,FaCalendarAlt } from 'react-icons/fa'; // Import icons from react-icons/fa

const Newsfeed = () => {
  const [cards, setCards] = useState([
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'],
      timePeriod: '6 AM - 12 PM',
      date: 'Today',
      seats: 4,
      rating: 3.5,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      date: 'Tomorrow',
      seats: 3,
      rating: 4.2,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      date: 'Today',
      seats: 5,
      rating: 3.8,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'],
      timePeriod: '6 AM - 12 PM',
      date: 'Tomorrow',
      seats: 4,
      rating: 3.0,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      date: 'Today',
      seats: 3,
      rating: 4.5,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      date: 'Tomorrow',
      seats: 5,
      rating: 3.2,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      date: 'Today',
      seats: 5,
      rating: 4.0,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'],
      timePeriod: '6 AM - 12 PM',
      date: 'Tomorrow',
      seats: 4,
      rating: 3.7,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      date: 'Today',
      seats: 3,
      rating: 4.1,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      date: 'Tomorrow',
      seats: 5,
      rating: 3.9,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      date: 'Today',
      seats: 5,
      rating: 4.2,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'],
      timePeriod: '6 AM - 12 PM',
      date: 'Tomorrow',
      seats: 4,
      rating: 3.8,
    },
    // Add more cards as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = cards.filter((card) =>
    card.car.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.route.some(routePoint => routePoint.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRatingChange = (newRating, index) => {
    // Update the rating for the specific card
    const updatedCards = [...cards];
    updatedCards[index].rating = newRating;
    setCards(updatedCards);
  };

  return (
    <div>
      <Searchbar onSearch={setSearchQuery} /> {/* Include the Searchbar component and pass the setSearchQuery function */}
      <section>
        <div className="cards-container">
          <div className="cards">
            {filteredCards.map((card, index) => (
              <div key={index} className="card">
                <h3 className="head-card"><FaCar /> {card.car}</h3>
                <p><FaMapMarkerAlt /> <strong>From: <span> <i className="fas fa-arrow-left"></i> 
                <i className="fas fa-arrow-right"></i></span></strong> {card.from}</p>
                <p><FaMapMarkerAlt /> <strong>To:</strong> {card.to}</p>
                <p><FaCalendarAlt /> <strong>Date:</strong> {card.date}</p>
                <p><FaClock /> <strong>Ride Schedule:</strong> <span className="time-period">{card.timePeriod}</span></p>
                <p><FaUsers /> <strong>Available Seats:</strong> <span className="seats">{card.seats}</span></p>
                <p><strong>Route:</strong> {card.route.map((point, i) => (
                  <React.Fragment key={i}>{i > 0 && ' ➜ '}{point}</React.Fragment>
                ))}</p>
                <div className="rating-stars">
                  <ReactStars
                    count={5}
                    size={24}
                    activeColor="#ffd700"
                    value={card.rating} // Pass rating value from card data
                    onChange={(newRating) => handleRatingChange(newRating, index)}
                  />
                  <span className="rating-value">{card.rating.toFixed(1)}/5</span>
                </div>
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
