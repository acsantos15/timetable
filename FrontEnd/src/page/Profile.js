import React from 'react'

const EditProfile = () => {
  return (
    <div className="container py-5 h-1000" style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, margin: 'auto'}}>
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card" style={{borderRadius: '1rem', backgroundColor: '#DEDBD3'}}>

            {/* Header */}
            <div className="card-header">
              <div style={{margin: '20px 0 20px 30px'}}>
                <span className="h1 fw-bold mb-0" style={{color: 'rgb(88, 17, 17)', fontWeight: 'bold', fontSize: '40px'}}>My Profile</span>
              </div>  
            </div>

            {/* Body */}
            <div className="card-bodys">
              <div className="mb-4">
                {/* <form onSubmit={handleSubmit}> */}
                  <h6 style={{fontWeight: 'bold',}}>Name</h6>
                  <span id="pname" th:text="${user.fname} + ' ' +${user.lname}"></span>
{/*                   
                  <div className="mb-4" style={{width: '48%', float: 'left'}}>
                    <input className="form-control" type="text" placeholder="First Name" id="fname" name="fname" maxLength="50" value={fname} onChange={handleFnameChange} required/>
                  </div>
                  <div className="mb-4" style={{width: '48%', float: 'right'}}>
                    <input className="form-control" type="text" placeholder="Last Name" id="lname" name="lname" maxLength="50" value={lname} onChange={handleLnameChange} required/>
                  </div>
                  <div className="mb-4" style={{width: '48%', float: 'left'}}>
                    <input className="form-control" type="text" placeholder="Home Address" id="address" name="address" maxLength="100" value={address} onChange={handleAddressChange} required/> 
                  </div>
                  <div className="mb-4" style={{width: '48%', float: 'right'}}>
                    <input className="form-control" type="text" pattern="[0-9]{11}" placeholder="Contact No." id="contact" name="contact" maxLength="11" value={contact} onChange={handleContactChange} required/>
                  </div>

                  <h5 style={{float:'left', width: '100%', color: '#7993a0', fontWeight: 'bold'}}>Account Information</h5>

                  <div className="mb-4" style={{width: '48%', float: 'left'}}>
                    <input className="form-control" type="text" placeholder="Username" id="username" name="username" maxLength="50" value={username} onChange={handleUsernameChange} required/>
                  </div>
                  <div className="mb-4" style={{width: '48%', float: 'right'}}>
                    <input className="form-control" type="email" placeholder="Email" id="email" name="email" maxLength="50" value={email} onChange={handleEmailChange} required/>
                  </div>
                  <div className="mb-4" style={{width: '48%', float: 'left'}}>
                    <input className="form-control" type="password" placeholder="Password" id="pass" name="pass" maxLength="50" value={pass} onChange={handlePasswordChange} required/>
                  </div>
                  <div className="mb-4" style={{width: '48%', float: 'right'}}>
                    <input className="form-control" type="password" id="conpass" placeholder="Confirm Password" maxLength="50" value={conpass} onChange={handleConPassChange} required/>
                  </div> */}

                  {/* Error Message  */}
                  {error && <span id="errMsg" style={{ color: 'red' }}>{error}</span>}<br></br>

                  {/* Button */}
                  <div style={{float: 'right'}}>
                    <button type="submit" className="btn" style={{backgroundColor: '#7393a0', color: 'white'}}>Sign Up</button>
                  </div>

                  {/* Already Have an Account? */}
                  <label>
                    <p style={{textAlign: 'left', color: '#726F6C',  margin: '35px 100px 0px 0px'}}>Already have an account? <Link style={{ color: '#517341', fontWeight: 'bold' }} to="/login">Login</Link>
                    </p>
                  </label>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>    
  )
}

export default EditProfile