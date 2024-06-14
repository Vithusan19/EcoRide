import React from "react";
import logo from "../assets/logo.png";
import profile from "../assets/profile.JPG";
import { Link } from "react-router-dom";
import {
  BiHome,
  BiAddToQueue,
  BiCurrentLocation,
  BiNews,
} from "react-icons/bi";
import ReactStars from "react-rating-stars-component";
import "../styles/Sidebar.css";

const Sidebar = () => {
  return (
    <div className="menu">
      <div className="logo">
        <img src={logo} alt="EcoRide logo" className="logo" />
      </div>

      <div className="menu-list">
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

      <div className="profile">
        <img src={profile} alt="profile" className="profileImg" />
        <h3 className="profile-heading">J.Abiraj</h3>
      </div>

      <div className="rating">
        <ReactStars count={5} size={24} activeColor="#ffd700" />
      </div>
    </div>
  );
};
export default Sidebar;
