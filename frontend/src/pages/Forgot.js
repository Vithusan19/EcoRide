import React, { useState } from 'react';
import '../styles/Forgot.css';
import axios from 'axios';

const Forgot = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const sendOtp = () => {
        setOtpSent(true);
    };

    const handleClose = () => {
        setOtpSent(false);
        onClose();
    };

    const handleSubmitOtp = async () => {
        const otpCode = otp.join('');
        // Verify the OTP code logic here
        // Example: axios.post('http://localhost/ecoRide-Backend/Connection/User/VerifyOtp.php', { email, otpCode });

        // Handle response and errors
    };

    return (
        <div className="popup">
            <div className="forgot-popup-inner">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>

                {!otpSent ? (
                    <>
                        <h2>Forgot Password</h2>
                        <input
                            type="email"
                            className="email-input"
                            placeholder="Enter Email"
                            value={email}
                            onChange={handleEmailChange}
                        />

                        <button className="action-button green-bg" onClick={sendOtp}>Send OTP</button>
                        {errors && <div className="error">{errors}</div>}
                    </>
                ) : (
                    <>
                        <h2>Enter OTP</h2>
                        <button className="close-button" onClick={handleClose}>
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
                        {message && <div className="message">{message}</div>}
                        {errors && <div className="error">{errors}</div>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Forgot;
