import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import axios from 'axios';
import Swal from 'sweetalert2';


document.body.style.backgroundColor = "#DEDBD3";

const EditProfile = () => {
    

    // Populate User Details
    useEffect(() => {
        axios.get('/loggedUser')
            .then(response => {
                setFname(response.data.fname)
                setLname(response.data.lname)
                setAddress(response.data.address)
                setContact(response.data.contact)
                setUsername(response.data.username)
                setEmail(response.data.email)
                setId(response.data.id)
            })
            .catch(error => console.error(error));
    }, []);

    // Toggle Visibility of PAssword Card
    const [isVisible, setIsVisible] = useState(true);
    const [isPassVisible, setIsPassVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setIsPassVisible(!isPassVisible);
    };

    // Handle User Details
    const [userId, setId] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    
    const handleFnameChange = (event) => {
        setFname(event.target.value);
    };
    const handleLnameChange = (event) => {
        setLname(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleContactChange = (event) => {
        setContact(event.target.value);
    };
    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
          axios.defaults.withCredentials = true;
          axios.put('/edituser/'+userId,
          {fname: fname, lname: lname, address: address, contact: contact, username: username, email: email}, 
          {withCredentials: true}, 
          { headers: { 'Content-Type': 'application/json' } })
          .then(response => {
            Swal.fire({
                title: 'Profile Updated',
                text: " ",
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload(); 
                }
            }) 
            })   
          .catch(error => {
            console.log(error);
          });  
    };
    
    const [oldpass, setOldPass] = useState('');
    const [newpass, setNewPass] = useState('');
    const [conpass, setConPass] = useState('');

    const handleNewPassChange = (event) => {
        setNewPass(event.target.value);
    };
    const handleConPassChange = (event) => {
        setConPass(event.target.value);
    };
    const handleOldPassChange = (event) => {
        setOldPass(event.target.value);
    };

    const handlePassSubmit = (event) => {
        event.preventDefault();
          axios.defaults.withCredentials = true;
          axios.put('/editpass/'+14,
          {oldpass: oldpass, newpass: newpass}, 
          {withCredentials: true}, 
          { headers: { 'Content-Type': 'application/json' } })
          .then(response => {
            alert(response);
            })   
          .catch(error => {
            alert(error.response.data);
          });  
    };
    return (
    // <!--EDIT USER HERE-->
    <div class="container1">
        <Header />
        <form onSubmit={handleSubmit}>
        {isVisible ? (
            <div class="row" style={{margin: '70px 82px 0 82px'}}>

                {/* <!-- Personal Information : LEFT --> */}
                <div class="col">
                    <div class="card" style={{padding: '30px'}} id="picard">
                        <div class="card-headers" style={{marginBottom: '15px'}}>
                            <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder', marginBottom: '15px'}}><i class="fa-solid fa-pen-to-square me-2"></i>Edit Profile</h3>
                            <h5 style={{color: '#7993a', fontWeight: 'bold'}}>PERSONAL INFORMATION</h5>
                        </div>
                        <div class="card-bodys">
                            <input type="hidden" id="userId" />
                            <div class="mb-4">
                                <label style={{fontWeight: 'bold'}}>First Name:</label>
                                <input class="form-control" id="editFname" type="text" placeholder="First Name" name="firstname" onChange={handleFnameChange} value={fname}/>
                            </div>
                            <div class="mb-4">
                                <label style={{fontWeight: 'bold'}}>Last Name:</label>
                                <input class="form-control" id="editLname" type="text" placeholder="Last Name" name="lastname" onChange={handleLnameChange} value={lname}/>
                            </div>
                            <div class="mb-4">
                                <label style={{fontWeight: 'bold'}}>Address:</label>
                                <input class="form-control" id="editAddress" type="text" placeholder="Home Address" name="address" onChange={handleAddressChange} value={address}/>
                            </div>
                            <div class="mb-4">
                                <label style={{fontWeight: 'bold'}}>Contact No.:</label>
                                <input class="form-control" id="editContact" type="text" placeholder="Contact No." name="contactNo" onChange={handleContactChange} value={contact}/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Account Information : RIGHT --> */}
                <div class="col">
                    <div class="card" style={{padding: '30px'}} id="aicard">
                        <div class="card-headers" style={{marginBottom: '15px'}}>
                            <h5 style={{color: '#7993a0', fontWeight: 'bold'}}>ACCOUNT INFORMATION</h5>
                        </div>
                        <div class="card-bodys">    
                            <div class="mb-4">
                                <label style={{fontWeight: 'bold'}}>Username:</label>
                                <input class="form-control" id="editUsername" type="text" placeholder="Username" name="username" onChange={handleUsernameChange} value={username}/>
                            </div>
                            <div class="mb-4">
                                <label style={{fontWeight: 'bold'}}>Email Address:</label>
                                <input class="form-control" id="editEmail" type="email" placeholder="Email" name="email" onChange={handleEmailChange} value={email}/>
                            </div>

                            {/* <!-- Error Message --> */}
                            <span id="errMsg" style={{color: 'red'}}></span><br/>

                            {/* <!-- Buttons --> */}
                            <div style={{float: 'right'}}>
                                <a href="/profile" type="button" class="btn btn-outline-danger">Cancel</a>&nbsp;
                                <button type="button" class="btn btn-secondary" id="changePassBtn" onClick={toggleVisibility}>Change Password</button>&nbsp;
                                <button type="submit" class="btn" style={{backgroundColor: '#537557', color: 'white'}}><i class="fa-solid fa-floppy-disk me-2"></i>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : null}
        </form>

        {/* <!-- CHANGE PASSWORD --> */}
        {isPassVisible ? (
            <div class="card" style={{width:'45%', height: '350px', float: 'left', padding: '30px', margin: '70px auto auto 82px'}} id="passcard">
                <div class="card-headers" style={{marginBottom: '15px'}}>
                    <h5 style={{color: '#7993a0', fontWeight: 'bold'}}>CHANGE PASSWORD</h5>
                </div>
                <div class="card-bodys">
                <form onSubmit={handlePassSubmit}>
                    <div class="mb-4">
                        <input class="form-control" type="password" placeholder="Old Password" name="oldpass" id="oldpass" onChange={handleOldPassChange} value={oldpass}/>
                    </div>
                    <div class="mb-4">
                        <input class="form-control" type="password" placeholder="New Password" name="password" id="newpass" onChange={handleNewPassChange} value={newpass}/>
                    </div>
                    <div class="mb-4">
                        <input class="form-control" type="password" placeholder="Confirm Password" id="conpass" name="conpass" onChange={handleConPassChange} value={conpass}/>
                    </div>   
                     
                    {/* <!-- Error Message --> */}
                    <span id="passerrMsg" style={{color: 'red'}}></span>

                    {/* <!-- Buttons --> */}
                    <div style={{float: 'right'}}>
                        <button type="button" class="btn btn-outline-danger" id="cancelPassBtn" onClick={toggleVisibility}>Cancel</button>&nbsp;
                        <button type="submit" class="btn" style={{backgroundColor: '#537557', color: 'white'}} id="savePassBtn"><i class="fa-solid fa-floppy-disk me-2"></i>Save Password</button>
                    </div>
                </form>
                </div>
            </div>
        ) : null}       
    </div>
    )
}
export default EditProfile