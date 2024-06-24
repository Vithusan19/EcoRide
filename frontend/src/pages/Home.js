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
import signupBg from '../assets/signupBg.png';
import serve1 from '../assets/serve1.png';
import serve2 from '../assets/serve2.png';
import serve3 from '../assets/serve3.png';
import axios from 'axios';

const Home = () => {
    const [showmenu, setshowmenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Default to true for login view
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [signupForm, setSignupForm] = useState({ name: '', username: '', email: '', phone: '', nic: '', gender: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const movePage = (e) => {
        navigate('/newsfeed'); // Navigate to Newsfeed page
    };
    const movePage1 = (e) => {
        navigate('/admin'); // Navigate to Newsfeed page
    };

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
        setErrors({});
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost/ecoRide/PHP/login.php', loginForm);
            if (response.data.userrole === 'admin') {
                navigate('/admin');
            } else if (response.data.userrole === 'user') {
                navigate('/newsfeed');
            } else {
                setErrors({ login: 'Username or password incorrect' });
            }
        } catch (error) {
            setErrors({ login: 'Username or password incorrect' });
        }
    };

    const validateSignupForm = () => {
        let formErrors = {};
        const { name, username, email, phone, nic, gender, password, confirmPassword } = signupForm;
        if (!name || !username || !email || !phone || !nic || !gender || !password || !confirmPassword) {
            formErrors.message = 'All fields are required';
        }
        if (password !== confirmPassword) {
            formErrors.password = 'Passwords do not match';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        if (validateSignupForm()) {
            try {
                const response = await axios.post('http://localhost/ecoRide/PHP/signup.php', signupForm);
                
                setIsLogin(true); 
                setErrors({}); 
                setShowLogin(true); 
            } catch (error) {
                setErrors({ signup: 'Signup failed' }); 
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (isLogin) {
            setLoginForm({ ...loginForm, [name]: value });
        } else {
            setSignupForm({ ...signupForm, [name]: value });
        }
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
                <button className="nav-button" onClick={() => setShowLogin(true)}>
                    Login | Register
                </button>
                <img src={menu} alt="menu" className="nav-menu-img" onClick={() => setshowmenu(!showmenu)} />
                <div className='navmenu' style={{ display: showmenu ? 'flex' : 'none' }}>
                    <Link activeClass="active" to="navbar-container" spy={true} smooth={true} offset={-100} duration={100} className="list-item" onClick={() => setshowmenu(false)}>Home</Link>
                    <Link activeClass="active" to="about" spy={true} smooth={true} offset={-100} duration={100} className="list-item" onClick={() => setshowmenu(false)}>About Us</Link>
                    <Link activeClass="active" to="services" spy={true} smooth={true} offset={-100} duration={100} className="list-item" onClick={() => setshowmenu(false)}>Our Services</Link>
                    <Link activeClass="active" to="contact" spy={true} smooth={true} offset={-100} duration={100} className="list-item" onClick={() => setshowmenu(false)}>Contact Us</Link>
                    <Link className="list-item" onClick={() => { setShowLogin(true); setshowmenu(false); }}>Login</Link>
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
            <section id='services'>
                <h2 className='services-tittle'>Our Services</h2>
                <span className='services-para'>At EcoRide, we strive to make commuting more efficient, affordable, and environmentally friendly. Our platform offers a range of services designed to enhance your travel experience by connecting you with fellow commuters, providing real-time updates, and ensuring your safety. Explore how EcoRide can simplify your daily journeys and contribute to a greener planet.</span>
                <div className='services-bars'>
                    <div className='services-bar'>
                        <img className='services-img' src={serve1} alt='' />
                        <div className='services-bar-text'>
                            <h2>Convenience and Cost-Efficiency</h2>
                            <p>EcoRide connects you with commuters sharing similar routes, ensuring convenient and eco-friendly travel. Effortlessly share travel costs with secure payment options. Flexible scheduling accommodates both daily and occasional trips.</p>
                        </div>
                    </div>
                    <div className='services-bar'>
                        <img className='services-img' src={serve2} alt='' />
                        <div className='services-bar-text'>
                            <h2>Real-Time Updates and Communication</h2>
                            <p>Stay updated with real-time ride status and driver locations. Communicate via in-app messaging for coordination. Our 24/7 customer support ensures a smooth experience.</p>
                        </div>
                    </div>
                    <div className='services-bar'>
                        <img className='services-img' src={serve3} alt='' />
                        <div className='services-bar-text'>
                            <h2>Safety and Environmental Impact</h2>
                            <p>Track your reduced carbon footprint. User profiles and ratings ensure safe carpooling. Verified profiles, guarantee secure travel. EcoRide is committed to eco-friendly commuting.</p>
                        </div>
                    </div>
                </div>
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
                    <div className="Home-popup-inner">
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
                                        <input type="text" className="form-control" placeholder="Enter username" name="username" value={loginForm.username} onChange={handleInputChange} required/>
                                        <input type="password" className="form-control" placeholder="Enter password" name="password" value={loginForm.password} onChange={handleInputChange} required/>
                                        {errors.login && <div className="signup-error">{errors.login}</div>}
                                        <span className='forgot'>Forget Your Password?</span><br />
                                        <button className='login-but' onClick={handleLogin}>SIGN IN</button><br /><br />
                                        <button className='login-but1' onClick={movePage}>SIGN IN</button><br /><br/>
                                        <button className='login-but1' onClick={movePage1}>Admin</button><br />

                                        <span className='register-text'>Don't you have an account?</span><br />
                                        <button className='log-but' onClick={toggleForm}>SIGN UP</button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className='signup-con'>
                                <div className='left-signup'>
                                    <h1 className="log-title">Signup here</h1>
                                    <form className="log-form" onSubmit={handleSignupSubmit}>
                                        <div className='col'>
                                            <input type="text" className="form-control" placeholder="Enter Name" name="name" value={signupForm.name} onChange={handleInputChange} />
                                            <input type="text" className="form-control" placeholder="Enter username" name="username" value={signupForm.username} onChange={handleInputChange} />
                                        </div>
                                        <div className='col'>
                                            <input type="text" className="form-control" placeholder="Enter Email" name="email" value={signupForm.email} onChange={handleInputChange} />
                                            <input type="text" className="form-control" placeholder="Enter Phone number" name="phone" value={signupForm.phone} onChange={handleInputChange} />
                                        </div>
                                        <div className='col'>
                                            <input type="text" className="form-control" placeholder="Enter Nic-Number" name="nic" value={signupForm.nic} onChange={handleInputChange} />
                                            <input type="file" className="form-control" name="file" onChange={handleInputChange} />
                                        </div>
                                        <div className='col'>
                                            <label>Gender</label>
                                            <label>
                                                <input type="radio" className="form-check-input" name="gender" value="male" onChange={handleInputChange} /> Male
                                            </label>
                                            <label>
                                                <input type="radio" className="form-check-input" name="gender" value="female" onChange={handleInputChange} /> Female
                                            </label>
                                        </div>
                                        <div className='col'>
                                            <input type="password" className="form-control" placeholder="Enter Password" name="password" value={signupForm.password} onChange={handleInputChange} />
                                            <input type="password" className="form-control" placeholder="Confirm password" name="confirmPassword" value={signupForm.confirmPassword} onChange={handleInputChange} />
                                        </div>
                                        {errors.message && <div className="signup-error">{errors.message}</div>}
                                        {errors.password && <div className="signup-error">{errors.password}</div>}
                                        {errors.signup && <div className="signup-error">{errors.signup}</div>}
                                        <div className='col'>
                                            <button className='login-but' type="submit">SIGN UP</button><br />
                                        </div>
                                    </form>
                                </div>
                                <div className='right-signup'>
                                    <img src={signupBg} alt='signupBg' className='signupBg' />
                                    <span className='login-text'>Enter your personal details to use all of site features.<p>if you have an account?</p></span><br />
                                    <button className='log-but' onClick={toggleForm}>Login</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;
