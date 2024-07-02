import React, { useState } from 'react';
import '../styles/Forgot.css';
import axios from 'axios';

const Forgot = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const sendOtp = async () => {
        try {
            const response = await axios.post('http://localhost/ecoRide-Backend/Connection/User/SendOtp.php', { username });
            if (response.data.success) {
                setOtpSent(false);
                setMessage('OTP sent successfully');
            } else {
                setErrors('Failed to send OTP');
            }
        } catch (error) {
            setErrors('Error sending OTP');
        }
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
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <button onClick={sendOtp}>Send OTP</button> 
                         {errors && <div className="error">{errors}</div>}
                    </>
                ) : (
                    <>
                        <h2>Enter OTP</h2>
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
                        {message && <div className="message">{message}</div>}
                    </>
                )}
            </div>
        </div>
    );
};

export default Forgot;
