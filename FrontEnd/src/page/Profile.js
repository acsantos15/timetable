import React, {useEffect, useState} from 'react'
import Header from '../component/Header';
import axios from 'axios';

const Profile = () => {
    // Fetch logged user data
    const [userdata, setUserData] = useState('');
    useEffect(() => {
        axios.get('/loggedUser')
            .then(response => setUserData(response.data))
            .catch(error => console.error(error));
    }, []);

    // Set logged user profile photo
    const [previewImage, setPreviewImage] = useState('');
    useEffect(() => {
      if (userdata && userdata.photo) {
        if (userdata.photo === 'noimage') {
          setPreviewImage('/ProfilePhotos/noimage.png');
        } else {
          setPreviewImage('/ProfilePhotos/' + userdata.photo);
        }
      }
    }, [userdata?.photo]);
    
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
            <div class="row">
                <div class="col-sm-4">
                    <div class="d-flex justify-content-center mb-4">
                        <img src={previewImage} class="rounded-circle" alt="example placeholder" style={{width: '200px', height: '200px'}}/>
                    </div>
                    <h6 class="text-center" style={{ fontWeight: 'bold' ,fontSize:'20px'}}>
                        <i class="fa-solid fa-image-portrait"></i> Profile Picture</h6>
                </div>
                <div class="col">
                    <div class="mb-4">
                        <h6 style={{ fontWeight: 'bold' ,fontSize:'20px'}}>
                            <i class="fa-solid fa-address-card" style={{color: 'black' }}></i> Name</h6>
                        <span id="pname">{userdata.fname} {userdata.lname}</span>
                    </div>

                    <div class="mb-4">
                        <h6 style={{fontWeight: 'bold', fontSize:'20px'}}> 
                            <i class= "fa-solid fa-house" style={{color:'black'}} ></i> Address</h6>
                        <span id="paddress">{userdata.address}</span>
                    </div>
                    <div class="mb-4">
                        <h6 style={{fontWeight: 'bold' , fontSize:'20px'}}>
                            <i class= "fa-solid fa-phone" style={{color: 'black'}}></i> Contact No.</h6>
                        <span id="pcontact">{userdata.contact}</span>
                    </div>
                    <div class="mb-4">
                        <h6 style={{fontWeight: 'bold', fontSize:'20px'}}>
                            <i class="fa-solid fa-user" style ={{color:'black'}}></i> Username</h6>
                        <span id="pusername">{userdata.username}</span>
                    </div>
                    <div class="mb-4">
                        <h6 style={{fontWeight: 'bold', fontSize:"20px"}}>
                            <i class= "fa-solid fa-at" style = {{color:'black'}}></i> Email</h6>
                        <span id="pemail">{userdata.email}</span>
                    </div>
                </div>
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