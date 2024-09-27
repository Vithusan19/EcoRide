import React, { useState, useEffect } from 'react';
import Searchbar from '../components/Searchbar';
import '../styles/Newsfeed.css';
import { Link } from 'react-router-dom'; 
import ReactStars from 'react-rating-stars-component'; 
import axios from 'axios';
import { FaClock, FaMapMarkerAlt, FaUsers, FaCar, FaCalendarAlt, FaDollarSign } from 'react-icons/fa'; 
import CarAvatar from '../assets/card-1.png';

const Newsfeed = () => {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getRides();
  }, []);

  const getRides = async () => {
    try {
      const response = await axios.get('http://localhost/ecoRide-Backend/Connection/Ride/DisplayRide.php');
      setCards(response.data);
    } catch (error) {
      setError("There was an error fetching the rides!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  // Filtering cards based on search criteria
  const filteredCards = cards.filter((card) => 
    (card.seats - card.BookingSeats > 0) && (
      card.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.departurePoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.destinationPoint.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.route.some(routePoint => routePoint.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  );

  return (
    <div>
      <Searchbar onSearch={setSearchQuery} />
      <section>
        <div className="cards-container">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="cards">
              {filteredCards.length === 0 ? (
                <p>No seats available for the current search criteria.</p>
              ) : (
                filteredCards.map((card, index) => (
                  <div key={index} className="card">
                    <h3 className="head-card"><FaCar /> {card.vehicleModel}</h3>
                    <img src={CarAvatar} alt="Car Avatar" className="car-avatar" />

                    <p><FaMapMarkerAlt /> <strong>From:</strong> {card.departurePoint}</p>
                    <p><FaMapMarkerAlt /> <strong>To:</strong> {card.destinationPoint}</p>
                    <p><FaCalendarAlt /> <strong>Date:</strong> {card.date}</p>
                    <p><FaDollarSign /> <strong>Seat Cost:</strong> Rs.{card.seatCost}</p>
                    <p><FaClock /> <strong>Ride Schedule:</strong> <span className="time-period">{formatTime(card.departureTime)} - {formatTime(card.destinationTime)}</span></p>
                    <p><FaUsers /> <strong>Available Seats:</strong> <span className="seats">{card.seats - card.BookingSeats}</span></p>
                    <p><strong>Route:</strong> {card.route}</p>
                    <div className="rating-stars">
                      <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        value={card.rating} // Random rating between 1 and 5
                        edit={false} // Make the rating non-changeable
                      />
                      <span className="rating-value">{card.rating}/5</span> {/* Fixed rating */}
                    </div>
                    <Link to={`/readmore/${index}`} className="read-more" state={{ card }}>Read More</Link>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Newsfeed;
