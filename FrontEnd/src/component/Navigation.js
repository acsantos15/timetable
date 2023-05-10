import React from 'react'
import "../css/style.css";
import { NavLink } from 'react-router-dom';

const classNameFunc = ({ isActive }) => (isActive ? "active" : "inactive");

const Navigation = () => {
  return (
    <div className="nav nav-tabs justify-content-center">
        {/* <ul className="nav nav-tabs justify-content-center" >
            <li className="nav-item" >
                <a style={{color:'#8e8380'}} className="nav-link" href="/dashboard" ><i class="fa-solid fa-grip me-2" ></i>Dashboard</a>
            </li>
            <li className="nav-item">
                <a style={{color:'#a4a1a1'}} className="nav-link" href="/timetable"><i class="fa-sharp fa-regular fa-calendar-days me-2"></i>Timetable</a>
            </li>
        </ul> */}

        <NavLink to="/dashboard" activeClassName={classNameFunc}>
          <a className="nav-link active" href="/dashboard" ><i class="fa-solid fa-grip me-2" ></i>Dashboard</a>
        </NavLink>

        <NavLink to="/timetable" activeClassName={classNameFunc}>
          <a className="nav-link" href="/timetable"><i class="fa-sharp fa-regular fa-calendar-days me-2"></i>Timetable</a>
        </NavLink>
    </div>
  )
}

export default Navigation