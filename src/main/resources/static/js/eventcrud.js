// Aries
//Jquery CRUD Events
$(document).ready(function(){

    // Add Events
    $('#addEventForm').submit(function(e){
        e.preventDefault();

        // All Input Value
        var title = $("#addTitle").val().trim();
        var desc = $("#addDesc").val().trim();
        var loc = $("#addLoc").val().trim();
        var color = $("#addColor").val();
        var people = $("#userSelect").val()
        var start = $("#addStart").val();
        var end = $("#addEnd").val();
        var fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
        var fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');
        var sTime = moment(start).format('HH');
        var eTime = moment(end).format('HH');

        var sTimeStamp = Date.parse(start);
        var eTimeStamp = Date.parse(end);

        var diffMs = Math.abs(sTimeStamp - eTimeStamp);
        var diffMins = Math.floor(diffMs / 1000 /60);

        // FormData
        var formData = {
            "title": title,
            "description": desc,
            "location": loc,
            "color": color,
            "start": fStart,
            "end": fEnd,
        };

        

        // Form Validation
        if (sTime > 19 || sTime <6 || eTime > 19 || eTime <6){
            $("#errMsg").show().text("6am to 7pm only").delay(3000).fadeOut();
        }else if(title ==="" || desc ==="" || loc ===""){
            $("#errMsg").show().text("Blank input not allowed").delay(3000).fadeOut();
        }
        else if(start >= end){
            $("#errMsg").show().text("Appointment start should be later than end").delay(3000).fadeOut();
        }else if(diffMins < 30){
            $("#errMsg").show().text("Appointment should be atleast 30 mins").delay(3000).fadeOut();
        }
        else{

            // Disable submit button after click once
            $('#addEventBtn').prop('disabled',true);

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
                    var json = JSON.stringify(formData);
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
                        }
                    });
                        
                }
            });

        }
        
    });
    // Add Events Ends

    // Populate Edit Event Inputs
    $('#editEventBtn').click(function(e){
        e.preventDefault();
        $('#viewEventModal').hide();   
        var eventId = $("#eventId").val();

        // Populate participants input
        $.ajax({
            url: "/events/"+eventId+"/users",
            type: 'GET',
            dataType: 'json',
            success: function(response) {
                var select = $('#edituserSelect');
                $.each(response, function(index, name) {
                    select.find('option[value="' + name.id + '"]').attr('selected', 'selected');
                });
                select.trigger('change');
            }
        });
        $.ajax({
            url: "/timetable/" + eventId,
            type: "GET",
            contentType: "application/json",
            success: function (data) {
                $('.editparticipant').select2({
                    multiple: true
                });
                $('#editEventModal').show();
                $('#editId').val(data.id);
                $('#editTitle').val(data.title);
                $('#editDesc').val(data.description);
                $('#editLoc').val(data.location);
                $('#editColor').val(data.color);
                $('#editStart').val(data.start);
                $('#editEnd').val(data.end); 
            }
        }); 
    });

    
    // Update Events
    $('#editEventForm').submit(function(e){
        e.preventDefault();

        // All Input Value
        var eventId = $("#editId").val();
        var title = $("#editTitle").val().trim();
        var desc = $("#editDesc").val().trim();
        var loc = $("#editLoc").val().trim();
        var color = $("#editColor").val();
        var people = $("#edituserSelect").val()
        var start = $("#editStart").val();
        var end = $("#editEnd").val();
        var fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
        var fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');
        var sTime = moment(start).format('HH');
        var eTime = moment(end).format('HH');


        var sTimeStamp = Date.parse(start);
        var eTimeStamp = Date.parse(end);

        var diffMs = Math.abs(sTimeStamp - eTimeStamp);
        var diffMins = Math.floor(diffMs / 1000 /60);
        
        // FormData
        var formData = {
            "title": title,
            "description": desc,
            "location": loc,
            "color": color,
            "start": fStart,
            "end": fEnd,
        };
        
        // Form Validation
        if (sTime > 19 || sTime <6 || eTime > 19 || eTime <6){
            $("#erreditMsg").show().text("6am to 7pm only").delay(3000).fadeOut();
        }else if(title ==="" || desc ==="" || loc ===""){
            $("#errMsg").show().text("Blank input not allowed").delay(3000).fadeOut();
        }
        else if(start >= end){
            $("#erreditMsg").show().text("Appointment start should be later than end").delay(3000).fadeOut();
        }else if(diffMins < 30){
            $("#erreditMsg").show().text("Appointment should be atleast 30 mins").delay(3000).fadeOut();
        }
        else{

            // Disable submit button after click once
            $('#saveUpEventBtn').prop('disabled',true);
            
            $.ajax({
                url: "/edit/" + eventId,
                type: 'PUT',
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function(data) {

                    $.ajax({
                        url: "/delete/" + eventId +"/edit",
                        type: "DELETE",
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
                                }
                            });  

                        }
                    });
                }
            });    

        }
        
    });
    // Update Events End


    // Remove Event
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
            $.ajax({
                url: '/delete/' + eventId,
                type: 'DELETE',
                contentType: "application/json",
                success: function(result) {
                    location.reload() 
                }
            });
        }
        })      
    });

    // Prevent user to input past datetime
    var now = new Date();
    var offset = now.getTimezoneOffset() * 60000; // Convert to milliseconds
    var localDate = new Date(now.getTime() - offset).toISOString().slice(0, 16);
    $('input[type="datetime-local"]').attr('min', localDate);

    // Clear append of participant
    $("#viewEventModal").on('hidden.bs.modal', function(){
        $('#participant').empty();
    })

    // Resert form when close
    $(".btn-close").click(function(){
        $('#edituserSelect').find('option').removeAttr('selected');
        $('#editEventForm').trigger("reset");
        $('#addEventForm').trigger("reset");
    })

    // Populate all participants
    $('.search').select2();
    $('.participant').select2({
        multiple: true
    });

    $('.editparticipant').select2({
        multiple: true
    });
    
    // Populate Edit Event Modal
    $.ajax({
        url: '/users',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var select = $('#edituserSelect');
            $.each(response.users, function(index, item) {
                var option = $('<option>', {
                    value: item.id,
                    text: item.fname + ' ' + item.lname
                });
                select.append(option);
                });

            select.trigger('change');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " " + errorThrown);
        }
    });

    // Populate Add Event Modal
    $.ajax({
        url: '/users',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            var select = $('#userSelect');
            var loggedId = response.loggedId;

            $.each(response.users, function(index, item) {
            var option = $('<option>', {
                value: item.id,
                text: item.fname + ' ' + item.lname
            });

            if (item.id === loggedId) {
                option.attr('selected', 'selected');
            }
            
            select.append(option);
            });

            select.trigger('change');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error: " + textStatus + " " + errorThrown);
        }
    });
    // Populate all participants end
});