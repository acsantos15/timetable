import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import "../css/style.css";

import ViewEventModal from './ViewEditEvent';

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
            props.handleAddShow();
        }
    };

    const handleSelect = (info) => {
        const selectStart = moment(info.startStr).format('YYYY-MM-DD HH:mm:ss');
        const selectEnd = moment(info.endStr).format('YYYY-MM-DD HH:mm:ss');
        props.handleAddShow(selectStart, selectEnd);
    };
    
    const selectionHandler = (selectInfo) => {
        var currentTime = moment()
        return currentTime.isBefore(selectInfo.start)
    } 

    const handleEventClick = (info) => {
        axios.get('/timetable/'+info.event.id)
            .then(response => {
                props.handleViewData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        props.handleViewShow();
    };
  return (
    <FullCalendar
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin
        ]}
        eventClick={handleEventClick} 
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
        selectAllow={selectionHandler}
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