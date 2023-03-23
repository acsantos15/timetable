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
        defaultDate: new Date(),
        editable: false,
        eventLimit: true,
        events: {
            url: '/events',
        },
        eventClick: function(info) {
            $.ajax({
                url: '/timetable/'+ info.event.id,
                type: 'GET',
                success: function(response) {
                    $('#viewEventModal').modal('show');
                    $('#eventTitle').text(response.title);
                    $('#eventDescription').text(response.description);
                    $('#eventStart').text(response.start);
                    $('#eventEnd').text(response.end);
                }
            });
        },
        height: 680,
        aspectRatio: 3,
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


    // AJAX POST NOT WORKING
    // $("#addEventForm").submit(function(event) {
    //     event.preventDefault();
    //     var formData = {
    //         title: $("#titleInput").val(),
    //         description: $("#descInput").val(),
    //         start: $("#startInput").val(),
    //         end: $("#endInput").val()
    //     };
    //     $.ajax({
    //         type: "POST",
    //         contentType: "application/json",
    //         url: "/timetable/save",
    //         data: JSON.stringify(formData),
    //         success: function(result) {
    //             alert(result);
    //         },
    //         error: function(e) {
    //             alert(e)
    //         }
    //     });
    // });
});
