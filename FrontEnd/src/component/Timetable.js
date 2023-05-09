import React from 'react'
import Header from '../component/Header';
import Navigation from '../component/Navigation';
import MainCalendar from '../component/MainCalendar';

const Timetable = () => {
const username = "user";
const capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
  
function changeBackground(color) {
    document.body.style.background = color;
  }

  window.addEventListener("load",function() { changeBackground('#DEDBD3') });


  return (
    <div className="row justify-content-center">
        <Header/>
        <Navigation/>
    <div class="card" style={{width: '85%', margin: '50px auto 50px auto', padding:'20px'}}>
        <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder', marginLeft: '5px'}}>{capitalizedUsername}'s Timetable</h3>
            <div class="card-body">
            <MainCalendar />
            </div>
     </div> 
    </div>
  )
}

export default Timetable