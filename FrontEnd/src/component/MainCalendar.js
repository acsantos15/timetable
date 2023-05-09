import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';


const MainCalendar = () => {
    const headerToolbar = {
        left: 'title,prev,next,today',
        center: '',
        right: 'timeGridWeek,dayGridMonth,timeGridDay,list myCustomButton',
    };
  return (
    <FullCalendar
        plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin
        ]}
        customButtons={{
          myCustomButton: {
            text: '+ Add Appointment',
            click: function() {
                alert('Add appointment'); 
            },
          },
        }}
        initialView="timeGridWeek"
        aspectRatio="2"
        height={'67vh'}
        handleWindowResize={true}
        stickyHeaderDates={true}
        nowIndicator={true}
        allDaySlot={false}
        allDayDefault={false}
        selectable={true}
        // select={{
        //   function(){ 
        //     alert('Date');
        //   }
        // }}
        slotMinTime="06:00:00"
        slotMaxTime="20:00:00"
        headerToolbar={headerToolbar}
    />
  );
};

export default MainCalendar;