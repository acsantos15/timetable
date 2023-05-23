import React, { useState } from 'react'
import Header from '../component/Header';
import Navigation from '../component/Navigation';
import MainCalendar from '../component/MainCalendar';
import AddEventModal from '../component/AddEvent';
import ViewEventModal from '../component/ViewEditEvent';
import "../css/style.css";

const Timetable = () => {

    // Add Event Modal Show
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const handleAddShow = (selectStart, selectEnd) => {
      setIsOpenAdd(!isOpenAdd);
      setSelectStart(selectStart);
      setSelectEnd(selectEnd);
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

    // Start and end variables from dragging
    const [selectStart, setSelectStart] = useState('');
    const [selectEnd, setSelectEnd] = useState('');

    return (
      <div className="row justify-content-center">
        <Header/>
        <Navigation/>
        <div className="card" style={{width: '90%', margin: '20px auto 50px auto', padding:'20px'}}>
                <div className="card-body">
                <MainCalendar handleAddShow={handleAddShow} handleViewShow={handleViewShow} handleViewData={handleViewData} />
                </div>
        </div> 
        <AddEventModal isOpenAdd={isOpenAdd} toggleModal={handleAddShow} selectStart={selectStart} selectEnd={selectEnd}/>
        <ViewEventModal isOpenView={isOpenView} toggleModal={handleViewShow} eventData={eventData}/>
      </div>
    )
}

export default Timetable;
