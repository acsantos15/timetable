import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

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
        left: 'title,prev,next,today',
        center: '',
        right: 'timeGridWeek,dayGridMonth,timeGridDay,list customButton',
    };

    const customButton = {
        text: 'Add Appointment',
        click: function() {
            props.handleCustomButtonClick();
        }
    };

  return (
    <FullCalendar
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin
        ]}
        initialView="timeGridWeek"
        headerToolbar={headerToolbar}
        customButtons={{ customButton }}
        events={events.map(event => ({
          title: event.title,
          start: event.start,
          end: event.end
        })
        
      )}
    />
  );
};

export default MainCalendar;