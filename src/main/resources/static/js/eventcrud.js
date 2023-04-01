// Aries
//Jquery CRUD Events
$(document).ready(function(){

    $('#saveuser').click(function(e){
        e.preventDefault();
        
        
    })
    
    // Add Events
    $('#addEventForm').submit(function(e){
        e.preventDefault();
        var title = $("#addTitle").val();
        var desc = $("#addDesc").val();
        var loc = $("#addLoc").val();
        var people = $("#userSelect").val()
        var start = $("#addStart").val();
        var end = $("#addEnd").val();
        var fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
        var fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');

        var sTimeStamp = Date.parse(start);
        var eTimeStamp = Date.parse(end);

        var diffMs = Math.abs(sTimeStamp - eTimeStamp);
        var diffMins = Math.floor(diffMs / 1000 /60);

        var formData = {
            "title": title,
            "description": desc,
            "location": loc,
            "start": fStart,
            "end": fEnd,
        };
        if(start >= end){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Appointment start should be later than end',
            })
        }else if(diffMins < 30){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Appointment should be atleast 30 mins',
            })
        }
        else{
            $.ajax({
                url: "/save",
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function(eventId) {
                    
                    var formData = {
                        "eventId": eventId,
                        "participantIds": people,
                    };
                    $.ajax({
                        url: "/saveEventParticipants",
                        type: "POST",
                        contentType: "application/json",
                        data: JSON.stringify(formData),
                        success: function(result) {
                            Swal.fire({
                                title: 'Event Added',
                                text: " ",
                                icon: 'success',
                                showCancelButton: false,
                                confirmButtonText: 'Ok'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    location.reload(); 
                                    $("#addEventForm").trigger("reset");
                                }
                            })
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr.responseText);
                        }
                    });
                          
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });

        }
        
    });

    // Populate Edit Event Inputs
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

    // Update Events
    $('#editEventForm').submit(function(e){
        e.preventDefault();
        var eventId = $("#editId").val();
        var title = $("#editTitle").val();
        var desc = $("#editDesc").val();
        var loc = $("#editLoc").val();
        var start = $("#editStart").val();
        var end = $("#editEnd").val();
        var fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
        var fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');

        var sTimeStamp = Date.parse(start);
        var eTimeStamp = Date.parse(end);

        var diffMs = Math.abs(sTimeStamp - eTimeStamp);
        var diffMins = Math.floor(diffMs / 1000 /60);

        var formData = {
            "title": title,
            "description": desc,
            "location": loc,
            "start": fStart,
            "end": fEnd,
        };
        if(start >= end){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Appointment start should be later than end',
            })
        }else if(diffMins < 30){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Appointment should be atleast 30 mins',
            })
        }
        else{
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
                            $("#editEventForm").trigger("reset");
                        }
                    })
                    
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                }
            });

        }
        
    });


    // Remove Event
    $('#removeEventBtn').click(function(e){
        e.preventDefault();
        $('#viewEventModal').hide();
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
            $.ajax({
                url: '/delete/' + eventId,
                type: 'DELETE',
                success: function(result) {
                    location.reload() 
                },
                error: function(xhr, status, error) {
                  console.error(error);
                }
            });
        }
        })      
    });

    // Clear append
    $("#viewEventModal").on('hidden.bs.modal', function(){
        $('#participant').empty();
    })

    // Populate participants
    $('.participant').select2({
        multiple: true
    });
    $.ajax({
        url: '/users',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            // Get the underlying select element
            var select = $('#userSelect');
            // Loop through the response data and add new options to the dropdown
            $.each(response, function(index, item) {
            select.append($('<option>', {
                value: item.id,
                text: item.fname
            }));
            });

            // Trigger the change event to update the Select2 dropdown
            select.trigger('change');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " " + errorThrown);
        }
    });
});