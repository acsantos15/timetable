// FullCalendar
document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        headerToolbar: {
            left: 'today,prev,next',
            center:'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,list myCustomButton',
            
        },
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
                    $('#eventLocation').text(response.location);
                    $('#eventStart').text(response.start);
                    $('#eventEnd').text(response.end);
                }
            });
        },
        height: 650,
        aspectRatio: 3,
    });

    calendar.render();
});


//Jquery
$(document).ready(function(){	
    // Ajax call to populate edit event
    $('#editEventBtn').click(function(e){
        e.preventDefault();
        $('#viewEventModal').hide();   
        var eventId = $("#eventId").val();
        $.ajax({
            url: "/timetable/" + eventId,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                $('#editEventModal').show();
                $('#editId').val(data.id);
                $('#editTitle').val(data.title);
                $('#editDesc').val(data.description);
                $('#editLoc').val(data.location);
                $('#editStart').val(data.start);
                $('#editEnd').val(data.end); 
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        }); 
    });

    $('#saveeditEventBtn').click(function(e){
        e.preventDefault();
        var eventId = $("#editId").val();
        var title = $("#editTitle").val();
        var desc = $("#editDesc").val();
        var loc = $("#editLoc").val();
        var start = $("#editStart").val();
        var fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
        var end = $("#editId").val();
        var fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');
        var formData = {
            "title": title,
            "description": desc,
            "location": loc,
            "start": fStart,
            "end": fEnd,
        };
        $.ajax({
            url: "/edit/" + eventId,
            type: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(data) {
                Swal.fire({
                    title: 'Event Updated',
                    text: " ",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok'
                  }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(); 
                    }
                })
                
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    });


    // Ajax call for removing event
    $('#removeEventBtn').click(function(e){
        e.preventDefault();
        var eventId = $("#eventId").val();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
            $('#viewEventModal').hide();
            $.ajax({
                url: '/delete/' + eventId,
                type: 'DELETE',
                success: function(result) {

                  location.reload(); // Reload the page to update the event list
                  
                },
                error: function(xhr, status, error) {
                  console.error(error); // Handle error
                }
            });
        }
        })      
    });

    

        // var eventId = $("#eventId").val();
        // var formData = $('#editEventForm').serialize();
        // // Send AJAX request to retrieve event details
        // $.ajax({
        //     url: '/edit/' + eventId,
        //     type: 'POST',
        //     data: formData,
        //     contentType: "application/json",
        //     data: JSON.stringify(formData),
        //     success: function(response) {

        //     },
        //     error: function(xhr, status, error) {
        //         // handle the error response
        //     }
        // });
   
    

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
