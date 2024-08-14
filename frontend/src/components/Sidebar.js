import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import profile from "../assets/60111.jpg";
import { BiHome, BiAddToQueue, BiCurrentLocation, BiNews, BiMenu, BiUser } from "react-icons/bi";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userName = sessionStorage.getItem("username");
    if (userName) {
      setUsername(userName);
    }
  }, []);

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
        <Link to="/profile" className="item">
          <BiUser className="icon" />
        </Link>
      </div>

      <div className="profile">
        <Link to="/profile">
        <div className="image-con">
          <img src={profile} alt="profile" className="profile-img" />
          <h3 className="profile-heading">{username ? username.toUpperCase() : "Guest"}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;