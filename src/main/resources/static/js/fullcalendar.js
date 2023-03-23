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
