import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



function Login() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post('/loginUser', { username: username, password: password }, { withCredentials: true, headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        if (response.data.status === 'success') {
          window.location.href = '/dashboard';
          console.log("Success");
        } else {
          setError('Invalid username or password');
          setTimeout(() => {
            setError(null);
          }, 3000);
          console.log("Error");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  document.body.style.backgroundImage = "url(/bg.png)";
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "auto";

  function showPass() {
    var x = document.getElementById("form2Example27");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  
  return (
      <section>
        <div className="container py-5 h-1000" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto' }}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem', backgroundColor: 'rgb(255 255 255 / 51%)', border: '3px solid white'}}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://www.tsukiden.com.ph/wp-content/uploads/2018/10/Tsuki_Puzzle-e1580178754271.png"
                      alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem', height: '100%' }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black" >

                      <form onSubmit={handleSubmit}>
                        <div className="d-flex mb-3 pb-1 justify-content-end">
                          <img src="/tgsilogo.png" alt="Tsukiden logo" style={{ height: '.9em', margin: '15px 0 15px 0'}} />
                        </div>
                        <div className="d-flex mb-3 pb-1 justify-content-center">
                          <span class="h1 fw-bold mb-0" style={{color: 'rgb(88, 17, 17)', fontWeight: 'bold', fontSize: '60px'}}>Login</span>
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text" style={{ backgroundColor: 'white' }}>
                              <i class="fa-solid fa-user" style={{color: '#babdb6'}}></i>  
                            </span>
                              <input type="text" id="form2Example17" className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`} placeholder="Username" value={username} onChange={handleUsernameChange}/>
                          </div>
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <span className="input-group-text" style={{ backgroundColor: 'white' }}>
                            <i class="fa-solid fa-lock" style={{color: '#babdb6'}}></i>
                            </span>
                            <input type="password" id="form2Example27" className={`form-control form-control-lg ${error ? 'is-invalid' : ''}`} placeholder="Password"value={password}onChange={handlePasswordChange}/>
                          </div>
                          <div class="form-check mt-3">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={showPass}/>
                            <label class="form-check-label" for="flexCheckDefault" style={{color: '#6C757D'}}>Show Password</label>
                          </div>
                        </div> 

                        {/* Error Message  */}
                        <div className="text-center" style={{ height: '20px', overflow: 'hidden' }}>
                          {error && <p id="errMsg" style={{ color: 'red' }}>{error}</p>}
                        </div>

                        {/* Button  */}
                        <div className="mb-4">
                          <button className="rounded login-button" style={{width: '100%'}} type="submit">Login</button>
                        </div>

                        {/*  Already Have an Account */}
                        <div style={{ float: 'center' }}>
                          <p style={{ textAlign: 'left', color: '#726F6C', margin: '60px 30px 0px 0px' }}>Don't have an account? Register <Link style={{ color: '#517341', fontWeight: 'bold', textDecoration: 'none' }} to="/signup">here</Link> </p>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default Login