

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/weblogo.png';
import menu from '../assets/navMenu.png';
import aboutImg from '../assets/about.png';
import { Link } from 'react-scroll';
import insta from '../assets/insta.png';
import twi from '../assets/twitter.png';
import fb from '../assets/facebook.png';
import header from '../assets/header.png';
import arrow from '../assets/arrow.png';
import loginbg from '../assets/loginbg.png';
// import easy from '../assets/easy.png';
// import execution from '../assets/execution.png';
// import Secure from '../assets/Secure.png';

const Home = () => {
    const [showmenu, setshowmenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Default to true for login view
    const navigate = useNavigate();

    useEffect(() => {
        // Dynamically load Bootstrap CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
        link.integrity = 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);

        // Clean up the link when the component is unmounted
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = () => {
        setShowLogin(true);
    };

    const movePage = (e) => {
        navigate('/newsfeed'); // Navigate to Newsfeed page
    };
    const movePage1 = (e) => {
        navigate('/admin'); // Navigate to Newsfeed page
    };

    const year = new Date();

    return (
        <>
            {/* Navbar */}
            <div id="navbar-container">
                <img src={logo} alt="logo" className="nav-img" />
                <div className="nav-menu">
                    <Link activeClass="active" to="navbar-container" spy={true} smooth={true} offset={0} duration={100} className="nav-menu-item">Home</Link>
                    <Link activeClass="active" to="about" spy={true} smooth={true} offset={0} duration={100} className="nav-menu-item">About Us</Link>
                    <Link activeClass="active" to="services" spy={true} smooth={true} offset={0} duration={100} className="nav-menu-item">Our Services</Link>
                    <Link activeClass="active" to="contact" spy={true} smooth={true} offset={0} duration={100} className="nav-menu-item">Contact Us</Link>
                </div>
                <button className="nav-button" onClick={handleLogin}>
                    Login | Register
                </button>
                <img src={menu} alt="menu" className="nav-menu-img" onClick={() => setshowmenu(!showmenu)} />
                <div className='navmenu' style={{ display: showmenu ? 'flex' : 'none' }}>
                    <Link activeClass="active" to="navbar-container" spy={true} smooth={true} offset={-100} duration={100} className="list-item" onClick={() => setshowmenu(false)}>Home</Link>
                    <Link activeClass="active" to="about" spy={true} smooth={true} offset={-100} duration={100} className="list-item" onClick={() => setshowmenu(false)}>About Us</Link>
                    <Link activeClass="active" to="services" spy={true} smooth={true} offset={-100} duration={100} className="list-item" onClick={() => setshowmenu(false)}>Our Services</Link>
                    <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-100} duration={100} className="list-item" onClick={() => setshowmenu(false)}>Contact Us</Link>
                    <Link className="list-item" onClick={() => { handleLogin(); setshowmenu(false); }}>Login</Link>
                </div>
            </div>
            <div className="header-image">
                <img src={header} alt='headerimage' className='header-image' />
            </div>
            {/* about */}
            <section id="about">
                <h2 className="about-tit">About Us</h2>
                <div className="about-container">
                    <p className="about-text">
                        Welcome to EcoRide, your go-to platform for simplifying commuting and making it more enjoyable. At EcoRide, we believe that transportation should be convenient, cost-effective, and eco-friendly. That's why we've created a user-friendly web application that connects commuters who share similar routes and schedules, making carpooling easier than ever before.<br />
                        Our mission is simple: to provide a convenient solution for daily travels or occasional trips, while also reducing transportation costs and environmental impact. By connecting users with compatible carpooling partners, we help you save money, reduce your carbon footprint, and enjoy a more social and eco-friendly commuting experience.<br />
                        With EcoRide, finding a carpooling partner is effortless. Simply sign up, input your commute details, and let our platform match you with fellow commuters who share your route and schedule. Whether you're looking for a daily ride to work or an occasional trip across town, EcoRide has you covered.<br />
                        Join us in our mission to create a greener, more sustainable future one ride at a time. Together, we can make commuting smarter, more efficient, and better for the planet.
                    </p>
                </div>
                <img src={aboutImg} alt="aboutImage" className="about-img" />
            </section>
            {/* services */}
            {/* Effortless Ride Publishing and Booking
            Drivers can easily publish their ride details and passengers can view the available ride.

            Secure Communication and Payment Processing
            System facilitates with getting inquires and secure payment process

            Comprehensive User and Ride Management
            offers robust user and ride management features that empower users to efficiently manage their profiles and travel plans */}
            <section id='services'>
          
            {/* <div className='services-con'>

                <img src={easy} alt='easy' className='services-con-img'/>
                <span className='services-con-tittle'>Effortless Ride Publishing and Booking</span>
                <span className='services-con-text'> Drivers can easily publish their ride details and passengers can view the available ride.</span>
            </div>
            <div className='services-con'>

                <img src={Secure} alt='Secure' className='services-con-img'/>
                <span className='services-con-tittle'> Secure Communication and Payment Processing</span>
                <span className='services-con-text'>System facilitates with getting inquires and secure payment process
                .</span>
            </div>
            <div className='services-con'>

                <img src={execution} alt='easy' className='services-con-img'/>
                <span className='services-con-tittle'>Comprehensive User and Ride Management</span>
                <span className='services-con-text'>offers robust user and ride management features that empower users to efficiently manage their profiles and travel plans</span>
            </div> */}
            <section id='services'>
                <h2 className='services-tittle'>Our Services</h2>
                <span className='services-para'>Welcome to our Carpooling Platform, your trusted solution for convenient and efficient ride-sharing. Our platform is designed to bring drivers and passengers together, <br />ensuring safe and affordable travel options</span>
                <div className='services-bars'>
                    <div className='services-bar'>
                        <img className='services-img' src={twi} alt='' />
                        <div className='services-bar-text'>
                            <h2>AAAA</h2>
                            <p>aaaaaaaaaaaaaaaa</p>
                        </div>
                    </div>
                    <div className='services-bar'>
                        <img className='services-img' src={insta} alt='' />
                        <div className='services-bar-text'>
                            <h2>BBBB</h2>
                            <p>bbbbbbbbbbbb</p>
                        </div>
                    </div>
                    <div className='services-bar'>
                        <img className='services-img' src={fb} alt='' />
                        <div className='services-bar-text'>
                            <h2>CCCC</h2>
                            <p>ccccccccccc</p>
                        </div>
                    </div>
                </div>
            </section>
        
        
            </section>
            {/* contactus */}
            <section id="contactpage">
                <div id="contact">
                    <h2 className="contact-tittle">ContactUs</h2>
                    <form className="contact-form">
                        <input type="text" className="name" placeholder="Your Name" name="user_name" />
                        <input type="email" className="email" placeholder="Your Email" name="user_email" />
                        <textarea className="message" name="message" rows="5" placeholder="Your Message" />
                        <button className="sub-but" type="submit" value="sent">Submit</button>
                        <div className="links">
                            <img className="link" src={fb} alt="Facebook" />
                            <img className="link" src={insta} alt="Instagram" />
                            <img className="link" src={twi} alt="Twitter" />
                        </div>
                    </form>
                </div>
            </section>
            {/* Footer */}
            <footer className="footer">
                Copyright &#169; {year.getFullYear()} <span>ecoRide</span>. All rights reserved.
            </footer>
            {/* Login Popup */}
            {showLogin && (
                <div className="popup">
                    <div className="popup-inner">
                        <div className='pop-imgs'>
                            <img className='web-logo' src={logo} alt='logo' />
                            <button className="close-btn" onClick={() => setShowLogin(false)}>
                                <img src={arrow} alt='arrow' className='arrow' />Home
                            </button>
                        </div>
                        {isLogin ? (
                            <div className='login-con'>
                                <div className='leftside'>
                                    <img src={loginbg} alt='logBg' className='loginBg' />
                                </div>
                                <div className='Rightside'>
                                    <h1 className="log-title">Login here</h1>
                                    <form className="log-form">
                                        <input type="text" className="form-control" placeholder="Enter username" />
                                        <input type="password" className="form-control" placeholder="Enter password" />
                                        <span className='forgot'>Forget Your Password?</span><br />
                                        <button className='login-but' onClick={movePage}>SIGN IN</button><br />
                                        <button className='login-but' onClick={movePage1}>Admin</button><br />
                                        <span className='register-text'>Enter your personal details to use all of site features.<p>Don't you have an account?</p></span><br />
                                        <button className='log-but' onClick={toggleForm}>SIGN UP</button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2>Login Form</h2>
                                <button className='log-but' onClick={toggleForm}>Login</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;

