import React, {  useState } from "react";
import "./style.css";
//import axios from 'axios';
import userIcon from '../assets/usersIcon.png';

const ViewUser = () => {
  //const [users, setUsers] = useState([]);
  const users = [
    
      { "id": 1, "username": "CST21012", "nic_num": "200026303685", "email": "vithu1909@gmail.com", "phone_no": "0763456789", "Gender": "male" },
      { "id": 2, "username": "CST21013", "nic_num": "200126303686", "email": "user02@example.com", "phone_no": "0763456790", "Gender": "female" },
      { "id": 3, "username": "CST21014", "nic_num": "200226303687", "email": "user03@example.com", "phone_no": "0763456791", "Gender": "male" },
      { "id": 4, "username": "CST21015", "nic_num": "200326303688", "email": "user04@example.com", "phone_no": "0763456792", "Gender": "female" },
      { "id": 5, "username": "CST21016", "nic_num": "200426303689", "email": "user05@example.com", "phone_no": "0763456793", "Gender": "male" },
      { "id": 6, "username": "CST21017", "nic_num": "200526303690", "email": "user06@example.com", "phone_no": "0763456794", "Gender": "female" },
      { "id": 7, "username": "CST21018", "nic_num": "200626303691", "email": "user07@example.com", "phone_no": "0763456795", "Gender": "male" },
      { "id": 8, "username": "CST21019", "nic_num": "200726303692", "email": "user08@example.com", "phone_no": "0763456796", "Gender": "female" },
      { "id": 9, "username": "CST21020", "nic_num": "200826303693", "email": "user09@example.com", "phone_no": "0763456797", "Gender": "male" },
      { "id": 10, "username": "CST21021", "nic_num": "200926303694", "email": "user10@example.com", "phone_no": "0763456798", "Gender": "female" },
      { "id": 11, "username": "CST21022", "nic_num": "201026303695", "email": "user11@example.com", "phone_no": "0763456799", "Gender": "male" },
      { "id": 12, "username": "CST21023", "nic_num": "201126303696", "email": "user12@example.com", "phone_no": "0763456800", "Gender": "female" },
      { "id": 13, "username": "CST21024", "nic_num": "201226303697", "email": "user13@example.com", "phone_no": "0763456801", "Gender": "male" },
      { "id": 14, "username": "CST21025", "nic_num": "201326303698", "email": "user14@example.com", "phone_no": "0763456802", "Gender": "female" },
      { "id": 15, "username": "CST21026", "nic_num": "201426303699", "email": "user15@example.com", "phone_no": "0763456803", "Gender": "male" },
      { "id": 16, "username": "CST21027", "nic_num": "201526303700", "email": "user16@example.com", "phone_no": "0763456804", "Gender": "female" },
      { "id": 17, "username": "CST21028", "nic_num": "201626303701", "email": "user17@example.com", "phone_no": "0763456805", "Gender": "male" },
      { "id": 18, "username": "CST21029", "nic_num": "201726303702", "email": "user18@example.com", "phone_no": "0763456806", "Gender": "female" },
      { "id": 19, "username": "CST21030", "nic_num": "201826303703", "email": "user19@example.com", "phone_no": "0763456807", "Gender": "male" },
      { "id": 20, "username": "CST21031", "nic_num": "201926303704", "email": "user20@example.com", "phone_no": "0763456808", "Gender": "female" }
  ];
  
 
  

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogVisible, setDeleteDialogVisible] = useState(false);

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // const getUsers = async () => {
  //   try {
  //     const response = await axios.get('http://localhost/ecoride/api/');
  //     setUsers(response.data);
  //   } catch (error) {
  //     console.error("There was an error fetching the users!", error);
  //   }
  // };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewMore = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const showDeleteDialog = () => {
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

 
  const filteredUsers = users.filter(user =>
    
    (user.username?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    user.id.toString().includes(searchTerm)
  );

  return (
    <>
      <h1 className="userdetails-tittle">User Details</h1>
      <p>Here are the user details.</p>
      <div className="search-con">
        <input
          type="text"
          placeholder="Search users"
          className="search-users"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="users-bars">
        {filteredUsers.map((user) => (
          <div key={user.id} className="users-bar">
            <img className="users-img" src={userIcon} alt="" />
            <div className="users-bar-text">
              <h2>User-ID: {user.id}</h2>
              <p>Name: {user.username}</p>
              <button className="user-button" onClick={() => handleViewMore(user)}>
                View more
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-button" onClick={closeModal}>
                &times;
              </button>
            </div>
            <p><strong>ID:</strong> {selectedUser.id}</p>
            <p><strong>Name:</strong> {selectedUser.username}</p>
            <p><strong>Phonenumber:</strong> {selectedUser.phone_no}</p>
            <p><strong>NIC_Number:</strong> {selectedUser.nic_num}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Gender:</strong> {selectedUser.Gender}</p>
            <button className="delete-button" onClick={showDeleteDialog}>
              Delete User
            </button>
          </div>
        </div>
      )}

      {isDeleteDialogVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this user?</p>
            {/* <button className="confirm-delete-button" onClick={handleDelete}> */}
             <button className="confirm-delete-button">
              Yes
            </button>
            <button className="user-button" onClick={hideDeleteDialog}>
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewUser;
