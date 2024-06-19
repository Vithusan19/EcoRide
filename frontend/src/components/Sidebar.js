

// import React, { useState } from "react";
// import logo from "../assets/logo.png";
// import profile from "../assets/profile.JPG";
// import { Link } from "react-router-dom";
// import { BiHome, BiAddToQueue, BiCurrentLocation, BiNews, BiMenu } from "react-icons/bi";
// import ReactStars from "react-rating-stars-component";
// import "../styles/Sidebar.css";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [driverRating, setDriverRating] = useState(4); // Initial rating value

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleRatingChange = (newRating) => {
//     setDriverRating(newRating);
//     // Here you can add an API call to save the new rating if needed
//   };

//   return (
//     <div className={`menu ${isOpen ? "open" : ""}`}>
//       <div className="menu-toggle" onClick={toggleMenu}>
//         <BiMenu className="mobmenu-icon" />
//       </div>

//       <div className="logo">
//         <img src={logo} alt="EcoRide logo" className="logo-img" />
//       </div>

//       <div className={`menu-list ${isOpen ? "open" : ""}`}>
//         <Link to="/home" className="item">
//           <BiHome className="icon" />
//           Home
//         </Link>
//         <Link to="/newsfeed" className="item">
//           <BiNews className="icon" />
//           NewsFeed
//         </Link>
//         <Link to="/addride" className="item">
//           <BiAddToQueue className="icon" />
//           AddRide
//         </Link>
//         <Link to="/currentride" className="item">
//           <BiCurrentLocation className="icon" />
//           CurrentRide
//         </Link>
//       </div>

//       <div className="menu-icons">
//         <Link to="/home" className="item">
//           <BiHome className="icon" />
//         </Link>
//         <Link to="/newsfeed" className="item">
//           <BiNews className="icon" />
//         </Link>
//         <Link to="/addride" className="item">
//           <BiAddToQueue className="icon" />
//         </Link>
//         <Link to="/currentride" className="item">
//           <BiCurrentLocation className="icon" />
//         </Link>
//       </div>

//       <div className="profile">
//         <img src={profile} alt="profile" className="profile-img" />
//         <h3 className="profile-heading">J.Abiraj</h3>
//       </div>

//       <div className="rating">
//         <ReactStars
//           count={5}
//           size={24}
//           activeColor="#ffd700"
//           value={driverRating}
//           onChange={handleRatingChange}
//         />
//         <span className="rating-value">{driverRating} / 5</span>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;


import React, { useState } from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.JPG";
import { Link } from "react-router-dom";
import { BiHome, BiAddToQueue, BiCurrentLocation, BiNews, BiMenu, BiUser } from "react-icons/bi";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
      <div className="menu-toggle" onClick={toggleMenu}>
        <BiMenu className="mobmenu-icon" />
      </div>

      <div className="logo">
        <img src={logo} alt="EcoRide logo" className="logo-img" />
      </div>

      <div className={`menu-list ${isOpen ? "open" : ""}`}>
        <Link to="/home" className="item">
          <BiHome className="icon" />
          Home
        </Link>
        <Link to="/newsfeed" className="item">
          <BiNews className="icon" />
          NewsFeed
        </Link>
        <Link to="/addride" className="item">
          <BiAddToQueue className="icon" />
          AddRide
        </Link>
        <Link to="/currentride" className="item">
          <BiCurrentLocation className="icon" />
          CurrentRide
        </Link>
      </div>

      <div className="menu-icons">
        <Link to="/home" className="item">
          <BiHome className="icon" />
        </Link>
        <Link to="/newsfeed" className="item">
          <BiNews className="icon" />
        </Link>
        <Link to="/addride" className="item">
          <BiAddToQueue className="icon" />
        </Link>
        <Link to="/currentride" className="item">
          <BiCurrentLocation className="icon" />
        </Link>
        <Link to="/profile" className="item"> {/* Add the profile link */}
          <BiUser className="icon" />
        </Link>
      </div>

      <div className="profile">
        <img src={profile} alt="profile" className="profile-img" />
        <h3 className="profile-heading">J.Abiraj</h3>
      </div>
    </div>
  );
};

export default Sidebar;
