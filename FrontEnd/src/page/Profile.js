import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate ();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:8080/profile', {withCredentials: true})
    .then(response => {
      console.log(response.data)
      setUser(response.data)
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const handleEditProfile = () => {
    navigate("/editProfile");
  };

  const handleEditPassword = () => {
    navigate("/editPassword");
  };

  document.body.style.backgroundColor = "#537557";

  return (
    <div class="container py-5 h-1000" style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'}}>
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style={{borderRadius: '1rem', backgroundColor: '#DEDBD3'}}>

            {/* Header */}
            <div class="card-header">
              <div style={{margin: '20px 0 20px 30px'}}>
                <span class="h1 fw-bold mb-0" style={{color: 'rgb(88, 17, 17)', fontWeight: 'bold', fontSize: '40px'}}>Profile</span>
              </div>
              <div style={{margin: '20px 30px 20px auto'}}>
                <button type="button" class="btn btn-primary me-2" onClick={handleEditProfile}>Edit Profile</button>
                <button type="button" class="btn btn-primary" onClick={handleEditPassword}>Edit Password</button>
              </div>
            </div>

            {/* Body */}
            <div class="d-flex align-items-center">
              <div class="card-body" style={{margin: '0 30px 30px 30px'}}>
                <h5 style={{color: '#7993a0', fontWeight: 'bold',}}>Personal Information</h5>

                <div class="mb-4">
                  <span style={{fontWeight: 'bold'}}>Name:</span> {user.fname} {user.lname}
                </div>
                <div class="mb-4">
                  <span style={{fontWeight: 'bold'}}>Address:</span> {user.address}
                </div>
                <div class="mb-4">
                  <span style={{fontWeight: 'bold'}}>Contact No.:</span> {user.contact}
                </div>

                <h5 style={{color: '#7993a0', fontWeight: 'bold',}}>Account Information</h5>

                <div class="mb-4">
                  <span style={{fontWeight: 'bold'}}>Username:</span> {user.username}
                </div>
                <div class="mb-4">
                  <span style={{fontWeight: 'bold'}}>Email:</span> {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
