import React, { useState, useEffect } from "react";
import users from "../assets/users.png";
import userIcon from "../assets/usersIcon.png";
import rides from "../assets/rideIcon.png";
import revenue from "../assets/revenue.png";
import message from "../assets/message.png";
import axios from 'axios';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Interface = () => {
  const [usercount, setusercount] = useState("");
  const [drivercount, setdrivercount] = useState("");
  const [messagecount, setmessagecount] = useState("");
  const [ridecount, setridecount] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);// State for total deduction amount
  const [monthlyDeductions, setMonthlyDeductions] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    email: "admin@example.com",
    username: "admin",
    password: "password123",
    phoneNumber: "0763915184",
  });
  const [userinfo, setuserinfo] = useState([]);
  const [formDetails, setFormDetails] = useState({ ...adminDetails });

  useEffect(() => {
    const UserCount = sessionStorage.getItem("UserCount");
    const DriverCount = sessionStorage.getItem("DriverCount");
    const MCount = sessionStorage.getItem("messageCount");
    const RideCount = sessionStorage.getItem("RideCount");
    const total_deduction = sessionStorage.getItem("total_deduction");
    


    setusercount(UserCount || "");
    setdrivercount(DriverCount || "");
    setmessagecount(MCount || "");
    setridecount(RideCount || "");
  }, []);
  useEffect(() => {
    // axios
    // .post("http://localhost/ecoRide-Backend/Connection/User/SelectUser.php", {
    //   userID:sessionStorage.getItem("UserID")
     
    // })
    const url = "http://localhost/ecoRide-Backend/Connection/User/SelectUser.php";
        let fdata = new FormData();
        fdata.append("userID",sessionStorage.getItem("UserID") );
        
        axios
        .post(url, fdata)
        .then((response) => {
            console.log(response.data.res);
            setuserinfo(response.data.res);
          
        })
            .catch((error) => {
                //setErrors({ message: "Message not connected." });
            });

  }, []);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      const url = "http://localhost/ecoRide-Backend/Connection/User/TotalDeduction.php";
  
      try {
        const response = await axios.post(url);
  
        if (response.data && response.data.total_deduction !== undefined) {
          const total_deduction = response.data.total_deduction;
          setTotalRevenue(total_deduction);
        } else {
          console.error("No deduction data found.");
        }
      } catch (error) {
        console.error("Error fetching total deduction amount:", error);
      }
    };
  
    fetchTotalRevenue(); // Fetch total revenue on component mount
  }, []);
  

  useEffect(() => {
    const fetchMonthlyDeductions = async () => {
        const url = "http://localhost/ecoRide-Backend/Connection/User/MonthlyDeduction.php"; // Update with correct endpoint
        try {
            const response = await axios.post(url);
            if (response.data && Array.isArray(response.data.monthly_deductions)) {
                const formattedData = response.data.monthly_deductions.map(deduction => ({
                    month: `${deduction.deduction_year}-${deduction.deduction_month < 10 ? '0' : ''}${deduction.deduction_month}`, // Format month
                    revenue: deduction.total_deduction
                }));
                setMonthlyDeductions(formattedData);
            } else {
                console.error("No monthly deduction data found.");
            }
        } catch (error) {
            console.error("Error fetching monthly deductions:", error);
        }
    };

    fetchMonthlyDeductions(); // Fetch monthly deductions on component mount
}, []);



  const counts = {
    driverCount: parseInt(drivercount) || 0,
    passengerCount: parseInt(usercount) || 0,
    messageCount: parseInt(messagecount) || 0,
    availableRide: parseInt(ridecount) || 0,
    revenue: totalRevenue,
    
  };

  const usersMessageData = [
    { name: 'Users', count: counts.driverCount + counts.passengerCount },
    { name: 'Messages', count: counts.messageCount },
  ];

  const revenueData = [
    { month: 'Jan', revenue: monthlyDeductions },
    { month: 'Feb', revenue: monthlyDeductions },
    { month: 'Mar', revenue: monthlyDeductions },
    { month: 'Apr', revenue: monthlyDeductions },
    { month: 'May', revenue: monthlyDeductions },
    { month: 'Jun', revenue: monthlyDeductions },
    { month: 'Jul', revenue: monthlyDeductions },
    { month: 'Aug', revenue: monthlyDeductions },
    { month: 'Sep', revenue: monthlyDeductions },
    { month: 'Oct', revenue: monthlyDeductions },
    { month: 'Nov', revenue: monthlyDeductions },
    { month: 'Dec', revenue: monthlyDeductions},
    { revenue: totalRevenue }, // Use the fetched revenue
  ];


  const handleEditClick = () => {
    setFormDetails({ ...adminDetails });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  const handleSaveChanges = () => {
    setAdminDetails({ ...formDetails });
    setShowModal(false);
  };

  const userData = [
    { role: "Passengers", value: counts.passengerCount },
    { role: "Drivers", value: counts.driverCount }
  ];

  return (
    <>
      <div>
        <h1>Dashboard</h1>
        <p  className='head-para'>Welcome to the admin dashboard.</p>
        <div className="dashboard-container">
          <div className="dashboard-left-con">
            <div className="dashboard-left-up">
              <div className="dashboard-left-count">
                <div>
                  <img src={users} alt="users" className="count-img" />
                  <h3 className="count-title">Current users</h3>
                </div>
                <span className="count-res">{counts.passengerCount + counts.driverCount}</span>
              </div>
              <div className="dashboard-left-count">
                <div>
                  <img src={rides} alt="rides" className="count-img" />
                  <h3 className="count-title">Available Rides</h3>
                </div>
                <span className="count-res">{counts.availableRide}</span>
              </div>
            </div>
            <div className="dashboard-left-down">
              <div className="dashboard-left-count">
                <div>
                  <img src={revenue} alt="revenue" className="count-img" />
                  <h3 className="count-title">Revenue</h3>
                </div>
                <span className="count-res">LKR {totalRevenue}</span>
              </div>
              <div className="dashboard-left-count">
                <div>
                  <img src={message} alt="message" className="count-img" />
                  <h3 className="count-title">Messages</h3>
                </div>
                <span className="count-res">{counts.messageCount}</span>
              </div>
            </div>
          </div>
          <div className="dashboard-right-con">
            <div className="admin-user">
              <h3 className="admin-user-title">Admin information</h3>
              <img src={userIcon} alt="userIcon" className="admin-user-img" />
              <div className="admin-user-info">
                <p>Email: {userinfo.Email}</p>
                <p>Username: {userinfo.UserName}</p>
                <p>Phone Number: {userinfo.PhoneNo}</p>
              </div>

              <button className="admin-user-edit-but" onClick={handleEditClick}>
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-chart">
        <div className="chart">
          <h3>User Distribution</h3>
          <PieChart width={400} height={400}>
            <Pie data={userData} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
          </PieChart>
        </div>
        {/* <div className="chart">
          <h3>Users and Messages</h3>
          <BarChart width={500} height={300} data={usersMessageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div> */}
        <div className="chart">
          <h3>Revenue Over Time</h3>
          <LineChart width={600} height={300} data={monthlyDeductions}>
            <CartesianGrid strokeDasharray="3 3" />
            {/* <XAxis dataKey="deduction_month" label={{ value: 'Month', position: 'bottom' }} />
            <YAxis label={{ value: 'Total Deductions (LKR)', angle: -90, position: 'insideLeft' }} />
             */}
             <XAxis dataKey="month" />
             <YAxis />

            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Admin Details</h2>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <form className="admin-info">
              <label className="admin-info-label">Email:</label>
              <input
                className="admin-info-input"
                type="email"
                name="email"
                value={userinfo.Email}
                onChange={handleChange}
              />
              <label className="admin-info-label">Username:</label>
              <input
                className="admin-info-input"
                type="text"
                name="username"
                value={userinfo.UserName}
                onChange={handleChange}
              />
              <label className="admin-info-label">Phone Number:</label>
              <input
                className="admin-info-input"
                type="text"
                name="phoneNumber"
                value={userinfo.PhoneNo}
                onChange={handleChange}
              />
             
              <button
                className="admin-info-button"
                type="button"
                onClick={handleSaveChanges}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Interface;