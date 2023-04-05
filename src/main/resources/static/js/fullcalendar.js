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
                    const date = new Date();
                    var fEnd = moment(end).add(30,'minutes').format('YYYY-MM-DD HH:mm');
                    var end = $("#addEnd").val(fEnd);

                    var now = new Date();
                    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
                    document.getElementById('addStart').value = now.toISOString().slice(0,16);
                    // document.getElementById('addEnd').value = now.toISOString().slice(0,16);
                }
            },
        },
        allDaySlot: false,
        allDayDefault: false,
        selectable: true,
        select: function(info) {
            $("#addEventModal").modal("show")
            var fStart = moment(info.startStr).format('YYYY-MM-DD HH:mm:ss');
            var fEnd = moment(info.endStr).format('YYYY-MM-DD HH:mm:ss');
            $("#addStart").val(fStart);
            $("#addEnd").val(fEnd);
        },
        defaultDate: new Date(),
        editable: false,
        eventLimit: true,
        slotMinTime: "06:00:00",
        slotMaxTime: "20:00:00",
        events: {
            url: '/events',
        },
        eventRender: function(info){
            info.el.style.backgroundColor = info.event.extendedProps.info.color;
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
                    $('#eventLocation').text(response.location);
                    $('#eventStart').text(response.start);
                    $('#eventEnd').text(response.end);
                    $.ajax({
                        url: "/events/"+response.id+"/users",
                        type: 'GET',
                        success: function(response) {
                            var people = response;
                            $.each(people, function(index, people){
                                $("#participant").append("<li class='list-group-item'>"+people.fname+"</li>");
                            })
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            console.log("Error: " + textStatus + ": " + errorThrown);
                        }
                    });
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
