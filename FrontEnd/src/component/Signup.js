import React from 'react'
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div class="container py-5 h-1000" style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'}}>
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style={{borderRadius: '1rem', backgroundColor: '#DEDBD3'}}>

              {/* Header */}
              <div class="card-header">
                <div style={{margin: '20px 0 20px 30px'}}>
                  <span class="h1 fw-bold mb-0" style={{color: 'rgb(88, 17, 17)', fontWeight: 'bold', fontSize: '40px'}}>Create Account</span>
                </div>  
              </div>

              {/* Body */}
              <div class="d-flex align-items-center">
                <div class="card-body" style={{margin: '0 30px 30px 30px'}}>
                  <form id="regForm">
                    <h5 style={{color: '#7993a0', fontWeight: 'bold',}}>Personal Information</h5>

                    <div class="mb-4" style={{width: '48%', float: 'left'}}>
                      <input class="form-control" type="text" placeholder="First Name" id="fname" name="fname" maxlength="50" required/>
                    </div>
                    <div class="mb-4" style={{width: '48%', float: 'right'}}>
                      <input class="form-control" type="text" placeholder="Last Name" id="lname" name="lname" maxlength="50" required/>
                    </div>
                    <div class="mb-4" style={{width: '48%', float: 'left'}}>
                      <input class="form-control" type="text" placeholder="Home Address" id="address" name="address" maxlength="100" required/> 
                    </div>
                    <div class="mb-4" style={{width: '48%', float: 'right'}}>
                      <input class="form-control" type="text" pattern="[0-9]{11}" placeholder="Contact No." id="contact" name="contact" maxlength="11" required/>
                    </div>

                    <h5 style={{float:'left', width: '100%', color: '#7993a0', fontWeight: 'bold'}}>Account Information</h5>

                    <div class="mb-4" style={{width: '48%', float: 'left'}}>
                      <input class="form-control" type="text" placeholder="Username" id="username" name="username" maxlength="50"  required/>
                    </div>
                    <div class="mb-4" style={{width: '48%', float: 'right'}}>
                      <input class="form-control" type="email" placeholder="Email" id="email" name="email" maxlength="50" required/>
                    </div>
                    <div class="mb-4" style={{width: '48%', float: 'left'}}>
                      <input class="form-control" type="password" placeholder="Password" id="pass" name="pass" maxlength="50" required/>
                    </div>
                    <div class="mb-4" style={{width: '48%', float: 'right'}}>
                      <input class="form-control" type="password" id="conpass" placeholder="Confirm Password" required/>
                    </div>

                    {/* Error Message */}
                    <div style={{float: 'left', width: '100%'}}>
                      <span id="errMsg" style={{color: 'red'}}></span>
                    </div>

                    {/* Button */}
                    <div style={{float: 'right'}}>
                      <button type="submit" class="btn" style={{backgroundColor: '#7393a0', color: 'white'}}>Sign Up</button>
                    </div>

                    {/* Already Have an Account? */}
                    <label>
                      <p style={{textAlign: 'left', color: '#726F6C',  margin: '35px 100px 0px 0px'}}>Already have an account? <Link to="/login">Signup</Link>
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