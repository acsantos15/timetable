import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import { directLogout } from '../component/LogoutButton';
import axios from 'axios';
import Swal from 'sweetalert2';

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
                if(response.data.photo === "noimage"){
                    setPreviewImage("/ProfilePhotos/noimage.png")
                }else{
                    setPreviewImage("/ProfilePhotos/"+response.data.photo)
                }  
                setId(response.data.id)
            })
            .catch(error => console.error(error));
    }, []);

    // Toggle Visibility of Password
    const [isVisible, setIsVisible] = useState(true);
    const [isPassVisible, setIsPassVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setIsPassVisible(!isPassVisible);
    };

    // User details variables
    const [userId, setId] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState(null);
    
    // User detail inputs handler
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
    
    // Handle submission of update user
    const handleSubmit = (event) => {
        event.preventDefault();
        
        // User form data
        const formData = new FormData();
        formData.append('photo', photo);
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('address', address);
        formData.append('contact', contact);
        formData.append('username', username);
        formData.append('email', email);

        axios.defaults.withCredentials = true;
        axios.put('/edituser/'+userId, formData, 
        {withCredentials: true}, 
        { headers: { 'Content-Type': 'multipart/form-data' } })
        .then(response => {
        Swal.fire({
            title: 'Profile Updated',
            text: " ",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#537557',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(); 
            }
        }) 
        })   
        .catch(error => {
        console.log(error);
        setUsernameError("Username Already Exist")
        setTimeout(() => {
            setUsernameError(null);
        }, 3000);
        });  
    };
    
    // Password variables
    const [oldpass, setOldPass] = useState('');
    const [newpass, setNewPass] = useState('');
    const [conpass, setConPass] = useState('');

    // Password input handler
    const handleNewPassChange = (event) => {
        setNewPass(event.target.value);
    };
    const handleConPassChange = (event) => {
        setConPass(event.target.value);
    };
    const handleOldPassChange = (event) => {
        setOldPass(event.target.value);
    };

    // Handle submission of password
    const handlePassSubmit = (event) => {
        event.preventDefault();
        // Password validations
        if(newpass !== conpass){
            setConPassError("Password don't match")
            setTimeout(() => {
                setConPassError(null);
            }, 3000);
        }else{
            axios.defaults.withCredentials = true;
            axios.put('/editpass/'+userId,
            {oldpass: oldpass, newpass: newpass}, 
            {withCredentials: true}, 
            { headers: { 'Content-Type': 'application/json' } })
            .then(response => {
                Swal.fire({
                    title: 'Password Updated',
                    text: "You will be automatically logout",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonColor: '#537557',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        directLogout();
                    }
                }) 
                })   
            .catch(error => {
                setOldPassError("Wrong current password")
                setTimeout(() => {
                    setOldPassError(null);
                }, 3000);
            }); 
        }
           
    };

    // Preview of uploaded image
    const [previewImage, setPreviewImage] = useState('');
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
        setPhoto(file);
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    // Error variables
    const [usernameerr, setUsernameError] = useState(null);
    const [conpasserr, setConPassError] = useState(null);
    const [oldpasserr, setOldPassError] = useState(null);
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
                    <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder', marginBottom: '15px'}}><i class="fa-solid fa-pen-to-square me-2"></i>Edit Profile</h3>
                    <div class="card-headers" style={{marginBottom: '15px'}}>
                            <h5 style={{color: '#7993a0', fontWeight: 'bold'}}>PROFILE PICTURE</h5>
                        </div>
                        <div class="d-flex justify-content-center mb-4">
                            <img src={previewImage} class="rounded-circle" alt="example placeholder" style={{width: '200px', height: '200px'}}/>
                        </div>
                        <div class="d-flex justify-content-center">
                            <div class="btn btn-rounded" style={{backgroundColor: '#537557'}}>
                                <label class="form-label text-white m-1" for="customFile2"> <i class="fa-solid fa-image-portrait me-2"></i>Choose Image</label>
                                <input type="file" class="form-control d-none" id="customFile2" onChange={handleImageChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card" style={{padding: '75px 30px 30px 30px'}} id="picard">
                        <div class="card-headers" style={{marginBottom: '15px'}}>
                            <h5 style={{color: '#7993a0', fontWeight: 'bold'}}>PERSONAL INFORMATION</h5>
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
                                <input class="form-control" type="text" pattern="[0-9]{11}" placeholder="Contact No." id="contact" name="contact" maxLength="11" value={contact} onChange={handleContactChange} required/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Account Information : RIGHT --> */}
                <div class="col">
                    <div class="card" style={{padding: '75px 30px 30px 30px'}} id="aicard">
                        <div class="card-headers" style={{marginBottom: '15px'}}>
                            <h5 style={{color: '#7993a0', fontWeight: 'bold'}}>ACCOUNT INFORMATION</h5>
                        </div>
                        <div class="card-bodys">    
                            <div class="mb-4">
                                <label style={{fontWeight: 'bold'}}>Username:</label>
                                <input className={`form-control ${usernameerr ? 'is-invalid' : ''}`} id="editUsername" type="text" placeholder="Username" name="username" onChange={handleUsernameChange} value={username}/>
                                {usernameerr && <div style={{height: '10px'}} className="invalid-feedback">{usernameerr}</div>}
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
                        <input className={`form-control ${oldpasserr ? 'is-invalid' : ''}`} type="password" placeholder="Old Password" name="oldpass" id="oldpass" onChange={handleOldPassChange} value={oldpass}/>
                        {oldpasserr && <div style={{height: '10px'}} className="invalid-feedback">{oldpasserr}</div>}
                    </div>
                    <div class="mb-4">
                        <input className={`form-control ${conpasserr ? 'is-invalid' : ''}`} type="password" placeholder="New Password" name="password" id="newpass" onChange={handleNewPassChange} value={newpass}/>
                        {conpasserr && <div style={{height: '10px'}} className="invalid-feedback">{conpasserr}</div>}
                    </div>
                    <div class="mb-4">
                        <input className={`form-control ${conpasserr ? 'is-invalid' : ''}`} type="password" placeholder="Confirm Password" id="conpass" name="conpass" onChange={handleConPassChange} value={conpass}/>
                        {conpasserr && <div style={{height: '10px'}} className="invalid-feedback">{conpasserr}</div>}
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