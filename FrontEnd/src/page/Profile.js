import React, {useEffect, useState} from 'react'
import Header from '../component/Header';
import axios from 'axios';


document.body.style.backgroundColor = "#DEDBD3";

const Profile = () => {
    const [userdata, setUserData] = useState('');
    useEffect(() => {
        axios.get('/loggedUser')
            .then(response => setUserData(response.data))
            .catch(error => console.error(error));
    }, []);
  return (
    // Label 
    <div class="container1">
      <Header />

      <div class="card" style={{margin: '70px 82px auto 82px', padding: '30px'}}>
        <div class="card-headers" style={{marginBottom: '15px'}}>
            <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder'}}>My Profile</h3>
        </div>

        {/*  Display Profile  */}
        <div class="card-bodys">
            <div class="mb-4">
                <h6 style={{fontWeight: 'bold'}}>Name</h6>
                <span id="pname">{userdata.fname} {userdata.lname}</span>
            </div>
            <div class="mb-4">
                <h6 style={{fontWeight: 'bold'}}>Address</h6>
                <span id="paddress">{userdata.address}</span>
            </div>
            <div class="mb-4">
                <h6 style={{fontWeight: 'bold'}}>Contact No.</h6>
                <span id="pcontact">{userdata.contact}</span>
            </div>
            <div class="mb-4">
                <h6 style={{fontWeight: 'bold'}}>Username</h6>
                <span id="pusername">{userdata.username}</span>
            </div>
            <div class="mb-4">
                <h6 style={{fontWeight: 'bold'}}>Email</h6>
                <span id="pemail">{userdata.email}</span>
            </div>

            {/*  Buttons  */}
            <div style={{float: 'right'}}>
                <a href="/timetable" class="btn btn-secondary"><i class="fa-regular fa-circle-left me-2"></i>Back to Timetable</a>&nbsp;
                <a href="/editprofile" class="btn" style={{backgroundColor: '#537557', color: 'white'}}><i class="fa-solid fa-pen-to-square me-2"></i>Edit Profile</a>
            </div>
        </div>
      </div>
  </div>    
  )
}

export default Profile