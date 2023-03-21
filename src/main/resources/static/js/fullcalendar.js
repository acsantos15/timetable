document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,list myCustomButton',
        
    },
    customButtons: {
        myCustomButton: {
            text: 'Add Event',
            click: function() {
            $('#addEventModal').show();
            }
        },
    },
    editable: false,
    events: {
        url: '/events',
    },
    height: 680,
    aspectRatio: 3,
    });

    calendar.render();
});

$(document).ready(function(){	
    $('.btn-close').click(function(e){
        $('#addEventModal').hide();                 
    });
});
