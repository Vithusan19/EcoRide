import React, { useState } from 'react';
import '../styles/Forgot.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { json } from 'react-router-dom';
import { RotatingLines } from "react-loader-spinner";
//import { Navigate } from 'react-router-dom';

const Forgot = ({ onClose }) => {
    const [Email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();


    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const sendOtp = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const url = "http://localhost/ecoRide-Backend/Connection/User/SendOtp.php";
        let fdata = new FormData();
        fdata.append("email", Email);
        console.log(Email)

        axios
            .post(url, fdata)
            .then((response) => {
                if (response.data.status === 1) {
                    setIsLoading(false)
                    setOtpSent(true);
                    setMessage('');
                    setErrors('') // Clear any previous messages
                } else if (response.data.status === 2) {
                    setErrors('Incorrect email. Please try again.');
                    setIsLoading(false)
                } else {
                    setErrors('Failed to send OTP. Please try again.');
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                setErrors('Failed to send OTP. Please try again.');
                setIsLoading(false)
            });
    };

    const handleClose = () => {
        setOtpSent(false);
        onClose();
    };

    const handleSubmitOtp = (e) => {
        const otpCode = otp.join('');
        e.preventDefault();
        const url = "http://localhost/ecoRide-Backend/Connection/User/VerifyOTP.php";
        let fdata = new FormData();
        fdata.append("email", Email);
        // fdata.append("otpcode",otpCode);
        //console.log(Email)

        axios
            .post(url, fdata)
            .then((response) => {
                if (response.data.status === 1) {
                    // setOtpSent(true);
                    // setMessage('');
                    // // setErrors('') 
                    // console.log(response.data.message);
                    // console.log(response.data.otp);
                    // console.log(otpCode);
                    if(response.data.otp===otpCode)
                        {
                            //navigate('/newsfeed');

                        }
                        else
                        {
                            setErrors('Incorrect OTP. Please try again.');
                        }
                } else if (response.data.status === 2) {
                    setErrors('Incorrect email. Please try again.');
                } else {
                    setErrors('Failed to verify OTP. Please try again.');
                }
            })
            .catch((error) => {
                setErrors('Failed to verify OTP. Please try again.');
            });
      

    };

    return (
        <div className="popup">
            <div className="forgot-popup-inner">
               

                {!otpSent ? (
                    <>
                     <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                        <h2>Forgot Password</h2>
                        <form onSubmit={sendOtp}>
                            <input
                                type="email"
                                className="email-input"
                                placeholder="Enter Email"
                                value={Email}
                                onChange={handleEmailChange}
                                required
                                name='email'
                            />

                            <button className="action-button green-bg" type="submit">Send OTP</button>
                            {errors && <div className="error">{errors}</div>}
                            {isLoading &&(<div className='loading-otp'>
                           <RotatingLines
                           visible={true}
                           height="20"
                           width="20"
                           color="grey"
                           strokeWidth="5"
                           animationDuration="0.75"
                           ariaLabel="rotating-lines-loading"
                           wrapperStyle={{}}
                           wrapperClass=""
                           />
                           </div>
                        )}
                        </form>
                    </>
                ) : (
                    <>
                        <h2>Enter OTP</h2>
                        <button className="close-button-otp" onClick={handleClose}>
                            &times;
                        </button>
                        <div className="otp-inputs">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                        <button className="action-button green-bg" onClick={handleSubmitOtp}>Submit OTP</button>
                        {message && <div className="otp-message">{message}</div>}
                        {errors && <div className="error">{errors}</div>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Forgot;
