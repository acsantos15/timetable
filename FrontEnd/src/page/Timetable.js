import React, { useState } from 'react'
import Header from '../component/Header';
import Navigation from '../component/Navigation';
import MainCalendar from '../component/MainCalendar';
import AddEventModal from '../component/AddEvent';
import { Auth } from '../component/Auth';
import "../css/style.css";

const Timetable = () => {
  const username = "user";
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

  document.body.style.backgroundColor = "#DEDBD3";

  // Add Event Modal Show
  const [isOpen, setIsOpen] = useState(false);
  const handleCustomButtonClick = () => {
    setIsOpen(!isOpen);
  };


  Auth();
  return (
    <div className="row justify-content-center">
      <Header/>
      <Navigation/>
      <div className="card" style={{width: '90%', margin: '20px auto 50px auto', padding:'20px'}}>
          <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder', marginLeft: '15px'}}>{capitalizedUsername}'s Timetable</h3>
              <div className="card-body">
              <MainCalendar handleCustomButtonClick={handleCustomButtonClick}/>
              </div>
      </div> 
      <AddEventModal isOpen={isOpen} toggleModal={handleCustomButtonClick}/>
    </div>
  )
}

export default Timetable;
