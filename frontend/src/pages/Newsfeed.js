

// import React, { useState } from 'react';
// import Searchbar from '../components/Searchbar';
// import '../styles/Newsfeed.css';
// import { Link } from 'react-router-dom'; // Import Link component

// const Newsfeed = () => {
//   const [cards] = useState([
//     {
//       car: 'Toyota KDH',
//       from: 'Jaffna',
//       to: 'Colombo',
//       route: ['Jaffna', 'Vavuniya', 'Colombo'], // Updated data structure to represent the route
//       timePeriod: '6 AM - 12 PM',
//       seats: 4,
//     },
//     {
//       car: 'Mercedes Benz',
//       from: 'Anuradhapura',
//       to: 'Kandy',
//       route: ['Anuradhapura', 'Kandy'],
//       timePeriod: '7 AM - 1 PM',
//       seats: 3,
//     },
//     {
//       car: 'Toyota Axio',
//       from: 'Jaffna',
//       to: 'galle',
//       route: ['jaffna', 'Colombo', 'galle'],
//       timePeriod: '8 AM - 2 PM',
//       seats: 5,
//     },
//     {
//       car: 'Toyota KDH',
//       from: 'Jaffna',
//       to: 'Colombo',
//       route: ['Jaffna', 'Vavuniya', 'Colombo'], // Updated data structure to represent the route
//       timePeriod: '6 AM - 12 PM',
//       seats: 4,
//     },
//     {
//       car: 'Mercedes Benz',
//       from: 'Anuradhapura',
//       to: 'Kandy',
//       route: ['Anuradhapura', 'Kandy'],
//       timePeriod: '7 AM - 1 PM',
//       seats: 3,
//     },
//     {
//       car: 'Toyota Axio',
//       from: 'Jaffna',
//       to: 'galle',
//       route: ['jaffna', 'Colombo', 'galle'],
//       timePeriod: '8 AM - 2 PM',
//       seats: 5,
//     },
//     {
//       car: 'Toyota Axio',
//       from: 'Jaffna',
//       to: 'galle',
//       route: ['jaffna', 'Colombo', 'galle'],
//       timePeriod: '8 AM - 2 PM',
//       seats: 5,
//     },
//     {
//       car: 'Toyota KDH',
//       from: 'Jaffna',
//       to: 'Colombo',
//       route: ['Jaffna', 'Vavuniya', 'Colombo'], // Updated data structure to represent the route
//       timePeriod: '6 AM - 12 PM',
//       seats: 4,
//     },
//     {
//       car: 'Mercedes Benz',
//       from: 'Anuradhapura',
//       to: 'Kandy',
//       route: ['Anuradhapura', 'Kandy'],
//       timePeriod: '7 AM - 1 PM',
//       seats: 3,
//     },
//     {
//       car: 'Toyota Axio',
//       from: 'Jaffna',
//       to: 'galle',
//       route: ['jaffna', 'Colombo', 'galle'],
//       timePeriod: '8 AM - 2 PM',
//       seats: 5,
//     },
//     {
//       car: 'Toyota Axio',
//       from: 'Jaffna',
//       to: 'galle',
//       route: ['jaffna', 'Colombo', 'galle'],
//       timePeriod: '8 AM - 2 PM',
//       seats: 5,
//     },
//     {
//       car: 'Toyota KDH',
//       from: 'Jaffna',
//       to: 'Colombo',
//       route: ['Jaffna', 'Vavuniya', 'Colombo'], // Updated data structure to represent the route
//       timePeriod: '6 AM - 12 PM',
//       seats: 4,
//     },
   
//     // Add more cards as needed
//   ]);

//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredCards = cards.filter((card) =>
//     card.car.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     card.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     card.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     card.route.some(routePoint => routePoint.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   return (
//     <div>
//       <Searchbar onSearch={setSearchQuery} /> {/* Include the Searchbar component and pass the setSearchQuery function */}
//       <section>
//         <div className="cards-container">
//           <div className="cards">
//             {filteredCards.map((card, index) => (
//               <div key={index} className="card">
//                 <h3>{card.car}</h3>
//                 <p><strong>From:</strong> {card.from}</p>
//                 <p><strong>To:</strong> {card.to}</p>
//                 <p><strong>Route:</strong> {card.route.join(' ➜ ')}</p> {/* Display the route */}
//                 <p><strong>Time Period:</strong> <span className="time-period">{card.timePeriod}</span></p>
//                 <p><strong>Available Seats:</strong> <span className="seats">{card.seats}</span></p>
//                 <Link to={`/readmore/${index}`} className="read-more">Read More</Link> {/* Link to Readmore */}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Newsfeed;

import React, { useState } from 'react';
import Searchbar from '../components/Searchbar';
import '../styles/Newsfeed.css';
import { Link } from 'react-router-dom'; // Import Link component
import ReactStars from 'react-rating-stars-component'; // Import ReactStars component

const Newsfeed = () => {
  const [cards, setCards] = useState([
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'],
      timePeriod: '6 AM - 12 PM',
      seats: 4,
      rating: 3.5,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      seats: 3,
      rating: 4.2,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
      rating: 3.8,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'],
      timePeriod: '6 AM - 12 PM',
      seats: 4,
      rating: 3.0,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      seats: 3,
      rating: 4.5,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
      rating: 3.2,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
      rating: 4.0,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'],
      timePeriod: '6 AM - 12 PM',
      seats: 4,
      rating: 3.7,
    },
    {
      car: 'Mercedes Benz',
      from: 'Anuradhapura',
      to: 'Kandy',
      route: ['Anuradhapura', 'Kandy'],
      timePeriod: '7 AM - 1 PM',
      seats: 3,
      rating: 4.1,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
      rating: 3.9,
    },
    {
      car: 'Toyota Axio',
      from: 'Jaffna',
      to: 'Galle',
      route: ['Jaffna', 'Colombo', 'Galle'],
      timePeriod: '8 AM - 2 PM',
      seats: 5,
      rating: 4.2,
    },
    {
      car: 'Toyota KDH',
      from: 'Jaffna',
      to: 'Colombo',
      route: ['Jaffna', 'Vavuniya', 'Colombo'],
      timePeriod: '6 AM - 12 PM',
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
                <h3>{card.car}</h3>
                <p><strong>From:</strong> {card.from}</p>
                <p><strong>To:</strong> {card.to}</p>
                <p><strong>Route:</strong> {card.route.join(' ➜ ')}</p> {/* Display the route */}
                <p><strong>Time Period:</strong> <span className="time-period">{card.timePeriod}</span></p>
                <p><strong>Available Seats:</strong> <span className="seats">{card.seats}</span></p>
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

