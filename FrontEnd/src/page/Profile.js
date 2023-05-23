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
    }, [userdata, setPreviewImage]);
    
    return (
        // Label 
        <div className="container1">
        <Header />

        <div className="card" style={{margin: '70px 82px auto 82px', padding: '30px'}}>
            <div className="card-headers" style={{marginBottom: '15px'}}>
                <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder'}}>My Profile</h3>
            </div>

            {/*  Display Profile  */}
            <div className="card-bodys">
            <div className="row">
                <div className="col-sm-4">
                    <div className="d-flex justify-content-center mb-4">
                        <img src={previewImage} className="rounded-circle" alt="example placeholder" style={{width: '200px', height: '200px'}}/>
                    </div>
                    <h6 className="text-center" style={{ fontWeight: 'bold' ,fontSize:'20px'}}>
                        <i className="fa-solid fa-image-portrait"></i> Profile Picture</h6>
                </div>
                <div className="col">
                    <div className="mb-4">
                        <h6 style={{ fontWeight: 'bold' ,fontSize:'20px'}}>
                            <i className="fa-solid fa-address-card" style={{color: 'black' }}></i> Name</h6>
                        <span id="pname">{userdata.fname} {userdata.lname}</span>
                    </div>

                    <div className="mb-4">
                        <h6 style={{fontWeight: 'bold', fontSize:'20px'}}> 
                            <i className= "fa-solid fa-house" style={{color:'black'}} ></i> Address</h6>
                        <span id="paddress">{userdata.address}</span>
                    </div>
                    <div className="mb-4">
                        <h6 style={{fontWeight: 'bold' , fontSize:'20px'}}>
                            <i className= "fa-solid fa-phone" style={{color: 'black'}}></i> Contact No.</h6>
                        <span id="pcontact">{userdata.contact}</span>
                    </div>
                    <div className="mb-4">
                        <h6 style={{fontWeight: 'bold', fontSize:'20px'}}>
                            <i className="fa-solid fa-user" style ={{color:'black'}}></i> Username</h6>
                        <span id="pusername">{userdata.username}</span>
                    </div>
                    <div className="mb-4">
                        <h6 style={{fontWeight: 'bold', fontSize:"20px"}}>
                            <i className= "fa-solid fa-at" style = {{color:'black'}}></i> Email</h6>
                        <span id="pemail">{userdata.email}</span>
                    </div>
                </div>
            </div>
                {/*  Buttons  */}
                <div style={{float: 'right'}}>
                    <a href="/timetable" className="btn btn-secondary"><i className="fa-regular fa-circle-left me-2"></i>Back to Timetable</a>&nbsp;
                    <a href="/editprofile" className="btn" style={{backgroundColor: '#537557', color: 'white'}}><i className="fa-solid fa-pen-to-square me-2"></i>Edit Profile</a>
                </div>
            </div>
        </div>
    </div>    
    )
}

export default Profile