import React, { useState } from 'react'
import Header from '../component/Header';
import Navigation from '../component/Navigation';
import MainCalendar from '../component/MainCalendar';
import AddEventModal from '../component/AddEvent';
import ViewEventModal from '../component/ViewEvent';
import { Auth } from '../component/Auth';
import "../css/style.css";

const Timetable = () => {
  const username = "user";
  const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);

  document.body.style.backgroundColor = "#DEDBD3";

  // Add Event Modal Show
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const handleAddShow = () => {
    setIsOpenAdd(!isOpenAdd);
  };

  // Add View Modal Show
  const [isOpenView, setIsOpenView] = useState(false);
  const handleViewShow = () => {
    setIsOpenView(!isOpenView);
  };

  // Add View Modal Show
  const [eventData, setEventData] = useState('');
  const handleViewData = (data) => {
    setEventData(data);
  };


  Auth();
  return (
    <div className="row justify-content-center">
      <Header/>
      <Navigation/>
      <div className="card" style={{width: '90%', margin: '20px auto 50px auto', padding:'20px'}}>
          <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder', marginLeft: '15px'}}>{capitalizedUsername}'s Timetable</h3>
              <div className="card-body">
              <MainCalendar handleAddShow={handleAddShow} handleViewShow={handleViewShow} handleViewData={handleViewData} />
              </div>
      </div> 
      <AddEventModal isOpenAdd={isOpenAdd} toggleModal={handleAddShow}/>
      <ViewEventModal isOpenView={isOpenView} toggleModal={handleViewShow} eventData={eventData}/>
    </div>
  )
}

export default Timetable;
