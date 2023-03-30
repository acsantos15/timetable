// Aries
// FullCalendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'title,prev,next',
            center:'',
            right: 'timeGridWeek,dayGridMonth,timeGridDay,list myCustomButton',
            
        },
        initialView: 'timeGridWeek',
        customButtons: {
            myCustomButton: {
                text: '+ Add Appointment',
                click: function() {
                    $('#addEventModal').modal({
                        backdrop: 'static'
                      }).modal('show');
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
                    $('#eventId').val(response.id);
                    $('#eventTitle').text(response.title);
                    $('#eventDescription').text(response.description);
                    $('#eventPeople').text(response.people);
                    $('#eventStart').text(response.start);
                    $('#eventEnd').text(response.end);
                    // alert(response.id)
                    // $.ajax({
                    //     url: "/events/"+response.id+"/users",
                    //     type: 'GET',
                    //     success: function(response) {
                    //         $("#user_list").html(html);
                    //     },
                    //     error: function(jqXHR, textStatus, errorThrown) {
                    //         console.log("Error: " + textStatus + ": " + errorThrown);
                    //     }
                    // });
                }
            });
        },
        eventTimeFormat: { // like '14:30:00'
            hour: '2-digit',
            minute: '2-digit',
            meridiem: 'short'
        },
        aspectRatio: 2,
    });

    calendar.render();
});
