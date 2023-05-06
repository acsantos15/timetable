import React from 'react'

const Header = () => {
  return (
    <header>
    <nav class="navbar navbar-expand-lg" style={{backgroundColor: '#537557'}}>
      <div class="container-fluid">
        {/* Label */}
        <a href="#" class="navbar-brand" style={{color: 'white', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>
          <i class="fa-sharp fa-regular fa-calendar-days" ></i> TIMETABLE
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse float-end" id="navbarSupportedContent">
        
          {/* SEARCH BAR */}
          <div class="navbar-nav ms-auto me-auto">
            <form class="d-flex" role="search" id="searchForm" method="GET">  
              <select class="form-control search me-2" id="searchWord" name="searchWord" style={{width: '300px', marginRight: '100px'}} required>
              </select>
              <button class="btn btn-outline-light ms-2" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
          </div>

          {/* Dropdown */}
          <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" style={{backgroundColor: '#537557', color: 'white'}} data-bs-toggle="dropdown" aria-expanded="false">
              <span ></span>&nbsp;<span ></span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item"><i class="fa-solid fa-user me-2"></i>My Profile</a></li>
              <li><a class="dropdown-item" id="logoutBtn" style={{color:'red'}}><i class="fa-solid fa-power-off me-2"></i>Logout</a></li>
            </ul>
          </div>        
        </div>
      </div>
    </nav>
  </header>
  )
}

export default Header