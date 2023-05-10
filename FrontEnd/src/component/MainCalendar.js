import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import "../css/style.css";

import axios from 'axios';

const MainCalendar = (props) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get('/events')
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const headerToolbar = {
        left: 'today,prev,next,title',
        center: '',
        right: 'timeGridWeek,dayGridMonth,timeGridDay,list customButton',
    };

    const customButton = {
        text: '+ Add Appointment',
        click: function() {
            props.handleCustomButtonClick();
        }
    };

    const handleSelect = () => {
        props.handleCustomButtonClick();
    };
    

  return (
    <FullCalendar
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin
        ]}
        initialView="timeGridWeek"
        aspectRatio="2"
        height={'67vh'}
        handleWindowResize={true}
        stickyHeaderDates={true}
        nowIndicator={true}
        allDaySlot={false}
        allDayDefault={false}
        selectable={true}
        select={handleSelect}
        // select={{
        //   function(){ 
        //     alert('Date');
        //   }
        // }}
        slotMinTime="06:00:00"
        slotMaxTime="20:00:00"
        eventTimeFormat={{ 
            hour: "2-digit", 
            minute: "2-digit", 
            meridiem: "short"}} 
        headerToolbar={headerToolbar}
        customButtons={{customButton}}
        events={events}
    />
  );
};

export default MainCalendar;