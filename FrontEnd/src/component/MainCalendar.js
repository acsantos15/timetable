import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';


const MainCalendar = () => {
    const headerToolbar = {
        left: 'title,prev,next,today',
        center: '',
        right: 'timeGridWeek,dayGridMonth,timeGridDay,list',
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
    />
  );
};

export default MainCalendar;