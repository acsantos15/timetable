document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,timeGridDay,list myCustomButton',
        
    },
    customButtons: {
        myCustomButton: {
            text: 'Add Event',
            click: function() {
            $('#addEvent').show();
            }
        },
    },
    height: 680,
    aspectRatio: 3,
    });

    calendar.render();
});