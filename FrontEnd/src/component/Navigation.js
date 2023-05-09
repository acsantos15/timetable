import React from 'react'


const Navigation = () => {
  return (
    <div>
        <ul className="nav nav-tabs justify-content-center" >
            <li className="nav-item" >
                <a style={{color:'#8e8380'}} className="nav-link" href="/dashboard" ><i class="fa-solid fa-grip me-2" ></i>Dashboard</a>
            </li>
            <li className="nav-item">
                <a style={{color:'#8e8380'}} className="nav-link" href="/timetable"><i class="fa-sharp fa-regular fa-calendar-days me-2"></i>Timetable</a>
            </li>
        </ul>
    </div>
  )
}

export default Navigation