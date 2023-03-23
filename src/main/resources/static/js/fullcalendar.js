document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'title,prev,next',
            center:'',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,list myCustomButton',
            
        },
        views: {
            
        },
        customButtons: {
            myCustomButton: {
                text: '+ Add Appointment',
                click: function() {
                    $('#addEventModal').show();
                }
            },
            dayGridMonth: { 
                text: 'Month' 
            },
            timeGridWeek: { 
                text: 'Week' 
            },
            timeGridDay: { 
                text: 'Day' 
            },
            list: { 
                text: 'List' 
            }
        },
        editable: true,
        events: {
            url: '/events',
        },
        height: 680,
        aspectRatio: 3,
        eventClick: function(info) {
            $('#viewEventModal').show();
            alert('Title: ' + info.event.title);
        }

    });

    calendar.render();
});

$(document).ready(function(){	
    $('.btn-close').click(function(e){
        $('#addEventModal').hide();
        $('#viewEventModal').hide();           
    });

    $('#saveEventBtn').click(function(e){
        $('#addEventModal').hide();    
        Swal.fire(
            'Appointment Saved',
            ' ',
            'success'
        )       
    });
});
