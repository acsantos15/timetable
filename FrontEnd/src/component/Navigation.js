import React from 'react'

const Navigation = () => {
  return (
    <div>
        <ul className="nav nav-tabs justify-content-center">
            <li className="nav-item">
                <a className="nav-link" href="/dashboard"><i class="fa-solid fa-grip mr-1"></i>Dashboard</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/timetable"><i class="fa-sharp fa-regular fa-calendar-days"></i>Timetable</a>
            </li>
        </ul>
    </div>
  )
}

export default Navigation