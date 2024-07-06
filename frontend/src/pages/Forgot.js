import React, { useState } from 'react';
import '../styles/Forgot.css';
import axios from 'axios';
//import { useNavigate } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

const Forgot = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [errors, setErrors] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({ newPassword: '', confirmPassword: '' });
   // const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleOtpChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const sendOtp = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const url = 'http://localhost/ecoRide-Backend/Connection/User/SendOtp.php';
        let fdata = new FormData();
        fdata.append('email', email);

        axios
            .post(url, fdata)
            .then((response) => {
                setIsLoading(false);
                if (response.data.status === 1) {
                    setOtpSent(true);
                    setMessage('');
                    setErrors(''); // Clear any previous messages
                } else if (response.data.status === 2) {
                    setErrors('Incorrect email. Please try again.');
                } else {
                    setErrors('Failed to send OTP. Please try again.');
                }
            })
            .catch(() => {
                setErrors('Failed to send OTP. Please try again.');
                setIsLoading(false);
            });
    };

    const handleClose = () => {
        setOtpSent(false);
        onClose();
    };

    const handleSubmitOtp = (e) => {
        const otpCode = otp.join('');
        e.preventDefault();
        const url = 'http://localhost/ecoRide-Backend/Connection/User/VerifyOTP.php';
        let fdata = new FormData();
        fdata.append('email', email);

        axios
            .post(url, fdata)
            .then((response) => {
                if (response.data.status === 1) {
                    setUserId(response.data.userID);
                    if (response.data.otp === otpCode) {
                        setShowPasswordForm(true);
                        setErrors('');
                    } else {
                        setErrors('Incorrect OTP. Please try again.');
                    }
                } else if (response.data.status === 2) {
                    setErrors('Incorrect email. Please try again.');
                } else {
                    setErrors('Failed to verify OTP. Please try again.');
                }
            })
            .catch(() => {
                setErrors('Failed to verify OTP. Please try again.');
            });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setErrors('Passwords do not match.');
            return;
        }

        const url = 'http://localhost/ecoRide-Backend/Connection/User/UpdatePassword.php';
        let fdata = new FormData();
        fdata.append('email', email);
        fdata.append('newPassword', passwordData.newPassword);
        fdata.append('userid', userId);

        axios.post(url, fdata)
            .then(response => {
                if (response.data.status === 1) {

                    // console.log(response.data.userrole)
                    // if (response.data.userrole === "admin") {
                    //     navigate('/admin');
                       
                    // } else if (response.data.userrole === "user") {
                    //     navigate('/newsfeed');
                        
                    // }
                    setShowPasswordForm(false);
                    handleClose();

                } else {
                    setErrors('Failed to update password. Please try again.');
                }
            })
            .catch(() => {
                setErrors('Failed to update password. Please try again.');
            });
    };

    return (
        <div className="popup">
            <div className="forgot-popup-inner">
                {!otpSent && !showPasswordForm ? (
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
                                value={email}
                                onChange={handleEmailChange}
                                required
                                name="email"
                            />
                            <button className="action-button green-bg" type="submit">
                                Send OTP
                            </button>
                            {errors && <div className="error">{errors}</div>}
                            {isLoading && (
                                <div className="loading-otp">
                                    <RotatingLines
                                        visible={true}
                                        height="20"
                                        width="20"
                                        color="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        ariaLabel="rotating-lines-loading"
                                    />
                                </div>
                            )}
                        </form>
                    </>
                ) : !showPasswordForm ? (
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
                        <button className="action-button green-bg" onClick={handleSubmitOtp}>
                            Submit OTP
                        </button>
                        {message && <div className="otp-message">{message}</div>}
                        {errors && <div className="error">{errors}</div>}
                    </>
                ) : (
                    <>
                        <h2>Reset Password</h2>
                        <form onSubmit={handleSubmitPassword}>
                            <div className="form-group">
                                <label>New Password</label>
                                <input
                                    type="password"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Confirm New Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button className="action-button green-bg" type="submit">
                                Update Password
                            </button>
                            {errors && <div className="error">{errors}</div>}
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Forgot;
