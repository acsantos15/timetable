import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

// const MiniCalendar = () => {
//   const headerToolbar: {
//     left: 'title,prev,next',
//     center:'',
//     right:''
// };
//   return (
//     <FullCalendar
//       plugins={[ dayGridPlugin ]}
//       initialView="dayGridMonth"
//     />
//   );
// };

const MiniCalendar = () => {
  const headerToolbar = {
      left: 'title,prev,next,today',
      center: '',
      right: '',
  };
return (
  <FullCalendar
      plugins={[
          dayGridPlugin
      ]}
      initialView="dayGridMonth"
      headerToolbar={headerToolbar}
  />
);
};


export default MiniCalendar;
