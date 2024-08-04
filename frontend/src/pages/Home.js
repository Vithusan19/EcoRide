import React, { useState } from 'react';
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
import Homeimg from '../assets/home.png';
import loginbg from '../assets/loginbg.png';
import signupBg from '../assets/signupBg.png';
import serve1 from '../assets/serve1.png';
import serve2 from '../assets/serve2.png';
import serve3 from '../assets/serve3.png';
import axios from 'axios';
import Forgot from './Forgot';
import { RotatingLines } from "react-loader-spinner";

const Home = () => {
    //const [UserID, setUserID] = useState("");
    const [MsgName, setMsgName] = useState("");
    const [MsgEmail, setMsgEmail] = useState("");
    const [Message, setMessage] = useState("");
    const [showmenu, setshowmenu] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(true); 
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [signupForm, setSignupForm] = useState({ name: '', username: '', email: '', phone: '', nic: '', gender: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
   
    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrors({});
    };
    const resetForm = () => {
        setMessage("");
        setMsgEmail("");
        setMsgName("");
    };
    const resetSignupForm = () => {
        
        
       // const value="";
       
            setSignupForm( "");
      
    };
    const resetLoginForm = () => {
        
        
        // const value="";
        
             setLoginForm( "");
       
     };

    const handleMessageSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setIsLoading(true)
        const url = "http://localhost/ecoRide-Backend/Connection/User/Addmessage.php";
        let fdata = new FormData();
        fdata.append("Msgname", MsgName);
        fdata.append("Msgemail", MsgEmail);
        fdata.append("Message", Message);
        axios
        .post(url, fdata)
        .then((response) => {
            console.log(response.data);
            if (response.data.message === "Message Added Successfully") {
                setIsLoading(false)
                setSuccessMessage("Message sent successfully!");
                resetForm();
                setTimeout(() => setSuccessMessage(""), 3000); 
                
                
            } else {
                setErrors({ message: "Message submission failed." });
            }
        })
            .catch((error) => {
                setErrors({ message: "Message not connected." });
            });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
       
    axios
    .post("http://localhost/ecoRide-Backend/Connection/User/Login.php", {
      username:  loginForm.username,
      password: loginForm.password,
    })

    .then((response) => {
        const UserID=response.data.userID;
        const userrole=response.data.userrole ;

         if (userrole) {
                sessionStorage.setItem("UserID", UserID);
                sessionStorage.setItem("UserRole", userrole);
                sessionStorage.setItem("username", loginForm.username);
                if (userrole === "admin") {
                    sessionStorage.setItem("admin", true);
                    navigate('/admin');
                } else if (userrole === "passenger") {
                    navigate('/newsfeed');
                }
             else if (userrole === "driver") {
                navigate('/newsfeed');
            }
                resetLoginForm();
            } else {
                setErrors({ login: 'Username or password incorrect' });
            }
        })
    .catch((error) => {
        setErrors({ message: " Not connected." });
      });

       
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
            const url = "http://localhost/ecoRide-Backend/Connection/User/Register.php";
            const formData = new FormData();
           
                formData.append("name", signupForm.name);
                formData.append("username", signupForm.username);
                formData.append("email", signupForm.email);
                formData.append("phone", signupForm.phone);
                formData.append("nic", signupForm.nic);
                formData.append("gender", signupForm.gender);
                formData.append("password", signupForm.password);
                console.log(signupForm.username)
                console.log(signupForm.password)
                console.log(signupForm.email)
                console.log(signupForm.phone)
                console.log(signupForm.name)
                console.log(signupForm.nic)
                console.log(signupForm.gender)
                
                axios
                .post(url, formData)
                .then((response) => {
                    if (response.data.message ==="User Added Successfully") {
                        resetSignupForm();
                        toggleForm();
                    } else {
                        setErrors({ signup: 'User already added' });
                    }

                })
                .catch((error) => {
                    setErrors({ message: " Not connected." });
                });
                
           
           

               
          
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


{/* services*/}
<section id='services'>
    <h2 className='services-title'>Our Services</h2>
   
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
                <p>Track your reduced carbon footprint. User profiles and ratings ensure safe carpooling. Verified profiles guarantee secure travel. EcoRide is committed to eco-friendly commuting.</p>
            </div>
        </div>
    </div>
</section>

            {/* Contact */}
            {/* <section id="contactpage">
                <div id="contact">
                    <h2 className="contact-tittle">ContactUs</h2>
                  
  
                    <form onSubmit={handleMessageSubmit} className="contact-form">
                       
                        <input type="text" id="name" name="MsgName" value={MsgName} placeholder="Your Name"   onChange={(e) => setMsgName(e.target.value)} className="name" required />
                       
                        <input type="email" id="email" name="MsgEmail" value={MsgEmail}  placeholder="Your Email"  onChange={(e) => setMsgEmail(e.target.value)} className="email" required />
                       
                        <textarea rows="5" id="message" name="Message" value={Message} placeholder=" Message"   onChange={(e) => setMessage(e.target.value)} className="message" required></textarea>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errors.message && <p className="error-message">{errors.message}</p>}
                        <button type="submit" className="sub-but">Send</button>
                        {isLoading &&(
                           <RotatingLines
                           visible={true}
                           height="30"
                           width="30"
                           color="grey"
                           strokeWidth="5"
                           animationDuration="0.75"
                           ariaLabel="rotating-lines-loading"
                           wrapperStyle={{}}
                           wrapperClass=""
                           />
                        )}
                        <div className="links">
                            <img className="link" src={fb} alt="Facebook" />
                            <img className="link" src={insta} alt="Instagram" />
                            <img className="link" src={twi} alt="Twitter" />
                        </div>

                    </form>
                </div>
            </section> */}

            {/* Contact */}
<section id="contactpage">
    <div id="contact">
        <h2 className="contact-tittle">Contact Us</h2>
        <div className="contact-container">
            <div className="contact-form">
                <form onSubmit={handleMessageSubmit}>
                    <input type="text" id="name" name="MsgName" value={MsgName} placeholder="Your Name" onChange={(e) => setMsgName(e.target.value)} className="name" required />
                    <input type="email" id="email" name="MsgEmail" value={MsgEmail} placeholder="Your Email" onChange={(e) => setMsgEmail(e.target.value)} className="email" required />
                    <textarea rows="5" id="message" name="Message" value={Message} placeholder="Message" onChange={(e) => setMessage(e.target.value)} className="message" required></textarea>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    {errors.message && <p className="error-message">{errors.message}</p>}
                    <button type="submit" className="sub-but">Send</button>
                    {isLoading && (
                        <RotatingLines
                            visible={true}
                            height="30"
                            width="30"
                            color="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        />
                    )}
                    <div className="links">
                        <img className="link" src={fb} alt="Facebook" />
                        <img className="link" src={insta} alt="Instagram" />
                        <img className="link" src={twi} alt="Twitter" />
                    </div>
                </form>
            </div>
            <div className="contact-image">
              
                <img src={signupBg} alt='scontact-image1' className='contact-image' />
            </div>
        </div>
    </div>
</section>

              {/* Footer */}
              <footer className="home-footer">
                Copyright &#169; {year.getFullYear()} <span>ecoRide</span>. All rights reserved.
            </footer>
            {/* Login Popup */}
            {showLogin && (
                <div className="popup">
                    <div className="Home-popup-inner">
                        <div className='pop-imgs'>
                            <img className='web-logo' src={logo} alt='logo' />
                            <button className="close-btn" onClick={() => setShowLogin(false)}>
                                <img src={Homeimg} alt='arrow' className='arrow' />
                            </button>
                        </div>
                        {isLogin ? (
                            <div className='login-con'>
                                <div className='leftside'>
                                    <img src={loginbg} alt='logBg' className='loginBg' />
                                   
                                    
                                </div>
                                <div className='Rightside'>
                                    <h1 className="log-title">Login here</h1>
                                    <form  method='post' onSubmit={handleLogin}>
                                        <div className="log-form">
                                        <input type="text" className="log-form-control" placeholder="Enter username" name="username" value={loginForm.username} onChange={handleInputChange} required/><br />
                                        <input type="password" className="log-form-control" placeholder="Enter password" name="password" value={loginForm.password} onChange={handleInputChange} required/><br />
                                        {errors.login && <div className="signup-error">{errors.login}</div>}
                                        <span className='forgot' onClick={() => setShowForgot(true)}>Forget Your Password?</span><br /><br />
                                        <button className='log-login-but'>SIGN IN</button><br />
                                         <div className='register-details-1'>     
                                                <span className='register-text'>Don't you have an account?</span><br />
                                                <button className='log-but'  onClick={toggleForm}>SIGN UP</button>
                                        </div>
                                        </div>
                                       
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className='signup-con'>
                                <div className='left-signup'>
                                    <h1 className="log-title">Signup here</h1>
                                    <form className="log-form" onSubmit={handleSignupSubmit} method='post'>
                                        <div className='signup-con-input'>
                                        <div className='col'>
                                            <input type="text" className="form-control" placeholder="Enter Name" name="name" value={signupForm.name} onChange={handleInputChange} />
                                            <input type="text" className="form-control" placeholder="Enter username" name="username" value={signupForm.username} onChange={handleInputChange} />
                                        </div>
                                        <div className='col'>
                                            <input type="email" className="form-control" placeholder="Enter Email" name="email" value={signupForm.email} onChange={handleInputChange} />
                                            <input type="text" className="form-control" placeholder="Enter Phone number" name="phone" value={signupForm.phone} onChange={handleInputChange} />
                                        </div>
                                        <div className='col'>
                                            <input type="text" className="form-control" placeholder="Enter Nic-Number" name="nic" value={signupForm.nic} onChange={handleInputChange} />
                                            <input type="file" className="form-control" name="file" onChange={handleInputChange} />
                                        </div>
                                        <div className='col'>
                                            <label className='genderLabel'>Gender</label>
                                            <label className='genderLabel'>
                                                <input type="radio" className="form-check-input" name="gender" value="Male" onChange={handleInputChange} /> Male
                                            </label>
                                            <label  className='genderLabel'>
                                                <input type="radio" className="form-check-input" name="gender" value="Female" onChange={handleInputChange} /> Female
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
                         {showForgot && <Forgot onClose={() => setShowForgot(false)} />}
                    </div>
                </div>
            )}
        </>
    );
}

export default Home;