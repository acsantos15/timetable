import React from 'react'
import "../css/style.css";
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div className="nav nav-tabs justify-content-center" style={{backgroundColor: '#dedbd3'}}>

          <NavLink className="nav-link" to="/timetable" activeClassName="active">
            <span>
              <i class="fa-sharp fa-regular fa-calendar-days me-2"></i>Timetable
            </span>
          </NavLink>

    </div>
  )
}

export default Navigation