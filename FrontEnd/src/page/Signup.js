import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2'

const Signup = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPassword] = useState('');
  const [conpass, setConPass] = useState('');
  const navigate = useNavigate ();

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
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConPassChange = (event) => {
    setConPass(event.target.value);
  };
  


  const handleSubmit = (event) => {
    event.preventDefault();
    if (pass !== conpass) {
      setConPassError('Password dont match');
      setTimeout(() => {
        setConPassError(null);
      }, 3000);
    }else{
      axios.defaults.withCredentials = true;
      axios.post('/createUser', 
      {fname: fname, lname: lname, address: address, contact: contact, username: username, email: email, pass: pass}, 
      {withCredentials: true}, 
      { headers: { 'Content-Type': 'application/json' } })

      .then(response => {
        console.log(response.data.status)
        if (response.data.status === 'taken'){
          setUsernameError('Username already taken');
          setTimeout(() => {
            setUsernameError(null);
          }, 3000);
        }else{
          Swal.fire({
              title: 'Account Created',
              text: " ",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#537557',
              confirmButtonText: 'OK'
          }).then((result) => {
              if (result.isConfirmed) {
                navigate("/login")
              }
          }) 
          
        }
      })
      .catch(error => {
        console.log(error);
      });
    }   
  };

  // Errors
  const [conpasserr, setConPassError] = useState(null);
  const [usernameerr, setUsernameError] = useState(null);

  document.body.style.backgroundColor = "#537557";


  return (
    <div class="container py-5 h-1000" style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'}}>
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style={{borderRadius: '1rem', backgroundColor: 'rgb(255 255 255 / 61%)', border: '3px solid white'}}>

              {/* Header */}
              <div class="card-header">
                <div style={{margin: '20px 0 20px 30px'}}>
                  <span class="h1 fw-bold mb-0" style={{color: 'rgb(88, 17, 17)', fontWeight: 'bold', fontSize: '40px'}}>Create Account</span>
                </div>  
              </div>

              {/* Body */}
              <div class="d-flex align-items-center">
                <div class="card-body" style={{margin: '0 30px 30px 30px'}}>
                  <form onSubmit={handleSubmit}>
                    <h5 style={{color: '#7993a0', fontWeight: 'bold',}}>Personal Information</h5>

                  <div class="row align-items-center">
                                    
                    <div class="col">
                      <div class="mb-4">
                        <div class="input-group">
                          <span class="input-group-text" style={{backgroundColor:'white'}}>
                            <i class="fa-solid fa-address-card" style={{color: '#babdb6'}}></i>                          
                          </span>
                          <input class="form-control" type="text" placeholder="First Name" id="fname" name="fname" maxLength="50" value={fname} onChange={handleFnameChange} required/>
                        </div>
                      </div>
                    </div>

                    <div class="col">
                      <div class="mb-4">
                        <div class="input-group">
                          <span class="input-group-text" style={{backgroundColor:'white'}}>
                            <i class="fa-solid fa-address-card" style={{color: '#babdb6'}}></i>                          </span>
                          <input class="form-control" type="text" placeholder="Last Name" id="lname" name="lname" maxLength="50" value={lname} onChange={handleLnameChange} required/>
                        </div>
                      </div>
                    </div>
                  </div>
                    
                  <div class="row align-items-center">
                    <div class="col">
                      <div class="mb-4">
                        <div class="input-group">
                          <span class="input-group-text" style={{backgroundColor:'white'}}>
                            <i class="fa-solid fa-house" style={{color: '#babdb6'}}></i>
                          </span>
                          <input class="form-control" type="text" placeholder="Home Address" id="address" name="address" maxLength="100" value={address} onChange={handleAddressChange} required/> 
                        </div>
                      </div>
                    </div>
                    
                    <div class="col">
                      <div class="mb-4">
                        <div class="input-group">
                          <span class="input-group-text" style={{backgroundColor:'white'}}>
                            <i class="fa-solid fa-phone" style={{color: '#babdb6'}}></i>
                          </span>
                          <input class="form-control" type="text" pattern="[0-9]{11}" placeholder="Contact No." id="contact" name="contact" maxLength="11" value={contact} onChange={handleContactChange} required/>
                        </div>
                      </div>
                    </div>
                  </div>


                    <h5 style={{float:'left', width: '100%', color: '#7993a0', fontWeight: 'bold'}}>Account Information</h5>

                    <div class="row align-items-center">

                      <div class="col">
                        <div class="mb-4">
                          <div class="input-group">
                            <span class="input-group-text" style={{backgroundColor:'white'}}>
                              <i class="fa-solid fa-user" style={{color: '#babdb6'}}></i>  
                            </span>
                            <input className={`form-control ${usernameerr ? 'is-invalid' : ''}`} type="text" placeholder="Username" id="username" name="username" maxLength="50" value={username} onChange={handleUsernameChange} required/>
                          {usernameerr && <div style={{height: '10px'}} className="invalid-feedback">{usernameerr}</div>}
                          </div>
                        </div>
                      </div>

                      <div class="col">
                        <div class="mb-4">
                          <div class="input-group">
                            <span class="input-group-text" style={{backgroundColor:'white'}}>
                              <i class="fa-solid fa-at" style={{color: '#babdb6'}}></i>                           </span>
                            <input class="form-control" type="email" placeholder="Email" id="email" name="email" maxLength="50" value={email} onChange={handleEmailChange} required/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row align-items-center">


                      <div class="col">
                        <div class="mb-4">
                          <div class="input-group">
                            <span class="input-group-text" style={{backgroundColor:'white'}}>
                              <i class="fa-solid fa-lock" style={{color: '#babdb6'}}></i>
                            </span>
                            <input class="form-control" type="password" placeholder="Password" id="pass" name="pass" maxLength="50" minLength="8" value={pass} onChange={handlePasswordChange} required/>
                          </div>
                        </div>
                      </div>

                      <div class="col">
                        <div class="mb-4">
                          <div class="input-group">
                            <span class="input-group-text" style={{backgroundColor:'white'}}>
                              <i class="fa-solid fa-lock" style={{color: '#babdb6'}}></i>
                            </span>
                            <input className={`form-control ${conpasserr ? 'is-invalid' : ''}`} type="password" id="conpass" placeholder="Confirm Password" maxLength="50" value={conpass} onChange={handleConPassChange} required/>
                          {conpasserr && <div style={{height: '10px'}} className="invalid-feedback">{conpasserr}</div>}
                          </div>
                        </div>
                      </div>   
                    </div>
                   
                    {/* Button */}
                    <div style={{float: 'right'}}>
                      <button class="rounded signup-btn"><b>Sign up</b></button>
                    </div>

                    {/* Already Have an Account? */}
                    <label>
                      <p style={{textAlign: 'left', color: '#726F6C',  margin: '35px 100px 0px 0px'}}>Already have an account? <Link style={{ color: '#517341', fontWeight: 'bold' }} to="/login">Login</Link>
                      </p>
                    </label>
                  </form>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup