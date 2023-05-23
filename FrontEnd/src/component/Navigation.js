import React from 'react'
import "../css/style.css";
import { NavLink } from 'react-router-dom';

// Website Navigation Bar
const Navigation = () => {
    return (
      <div className="nav nav-tabs justify-content-center" style={{backgroundColor: '#dedbd3'}}>

            <NavLink className="nav-link" to="/dashboard" activeclassname="active">
              <span>
                <i className="fa-solid fa-table-cells-large"></i> Dashboard
              </span>
            </NavLink>

            <NavLink className="nav-link" to="/timetable" activeclassname="active">
              <span>
                <i className="fa-solid fa-calendar-days"></i> Timetable
              </span>
            </NavLink>

      </div>
    )
}

export default Navigation