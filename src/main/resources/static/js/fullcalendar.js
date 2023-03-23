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
