import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import axios from 'axios';



function Login() {
  const navigate = useNavigate ();
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
    axios.post('http://localhost:8080/loginUser', { username: username, password: password }, {withCredentials: true}, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        if (response.data.status === 'success') {
          navigate('/dashboard');
          console.log("Success");
        } else {
          setError('Invalid username or password');
          console.log("Error");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  document.body.style.backgroundColor = "#537557";

  return (
      <section>
        <div className="container py-5 h-1000" style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto' }}>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: '1rem', backgroundColor: '#DEDBD3' }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://www.tsukiden.com.ph/wp-content/uploads/2018/10/Tsuki_Puzzle-e1580178754271.png"
                      alt="login form" className="img-fluid" style={{ borderRadius: '1rem 0 0 1rem', height: '100%' }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center" >
                    <div className="card-body p-4 p-lg-5 text-black" >

                      <form onSubmit={handleSubmit}>
                        <div className="d-flex mb-3 pb-1 justify-content-end">
                          <img src="/tgsilogo.png" alt="Tsukiden logo" style={{ height: '.9em', margin: '15px 0 15px 0'}} />
                        </div>
                        <div className="d-flex mb-3 pb-1 justify-content-center">
                          <label className="h1 fw-bold mb-0" style={{ color: 'rgb(88, 17, 17)', fontWeight: 'bold', fontSize: '60px', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>Welcome</label>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="text" id="form2Example17" className="form-control form-control-lg" value={username} onChange={handleUsernameChange}/>
                        </div>

                        <div className="form-outline mb-4">
                          <input type="password" id="form2Example27" className="form-control form-control-lg" value={password} onChange={handlePasswordChange} />
                        </div>

                        {/* Error Message  */}
                        {error && <span id="errMsg" style={{ color: 'red' }}>{error}</span>}
                        

                        {/* Button  */}
                        <div className="pt-1 mb-4" style={{ float: 'right' }}>
                          <button className="rounded" style={{ backgroundColor: '#7993A0', fontWeight: 'bold', color: 'white', padding: '10px' }} type="submit">Login</button>
                        </div>


                        {/*  Already Have an Account */}
                        <div style={{ float: 'right' }}>
                          <p style={{ textAlign: 'left', color: '#726F6C', margin: '60px 30px 0px 0px' }}>Don't have an account? Create an account <Link style={{ color: '#517341', fontWeight: 'bold' }} to="/signup">Signup</Link> </p>
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