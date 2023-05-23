import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import "../css/style.css";

import axios from 'axios';

const MainCalendar = (props) => {
    // Events variable
    const [events, setEvents] = useState([]);

    // Populate calendar with events
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

    // Fullcalendar toolbar
    const headerToolbar = {
        left: 'today,prev,next,title',
        center: '',
        right: 'timeGridWeek,dayGridMonth,timeGridDay,list customButton',
    };
    // Fullcalendar custom button (Add Appointment)
    const customButton = {
        text: '+ Add Appointment',
        click: function() {
            props.handleAddShow();
        }
    };

    // Get start and end datetime from dragging
    const handleSelect = (info) => {
        const selectStart = moment(info.startStr).format('YYYY-MM-DD HH:mm:ss');
        const selectEnd = moment(info.endStr).format('YYYY-MM-DD HH:mm:ss');
        props.handleAddShow(selectStart, selectEnd);
    };

    // Prevent selecting of past datetime
    const selectionHandler = (selectInfo) => {
        var currentTime = moment()
        return currentTime.isBefore(selectInfo.start)
    } 

    // Fetching event when clicked
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
            slotMaxTime="19:00:00"
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