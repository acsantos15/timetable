import React, { useState } from 'react'
import Header from '../component/Header';
import Navigation from '../component/Navigation';
import MainCalendar from '../component/MainCalendar';
import AddEventModal from '../component/AddEvent';

const Timetable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
const username = "user";
const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  
document.body.style.backgroundColor = "#DEDBD3";

const handleCustomButtonClick = () => {
  setIsModalOpen(true);
};

  return (
    <div className="row justify-content-center">
        <Header/>
        <Navigation/>
    <div class="card" style={{width: '85%', margin: '50px auto 50px auto', padding:'20px'}}>
        <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder', marginLeft: '5px'}}>{capitalizedUsername}'s Timetable</h3>
            <div class="card-body">
            <MainCalendar handleCustomButtonClick={handleCustomButtonClick}/>
            </div>
     </div> 
     <AddEventModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}

export default Timetable