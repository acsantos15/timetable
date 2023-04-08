$(document).ready(function(){
    // Change to pass btn
    $('#passcard').hide();
    $('#changePassBtn').click(function(e){
        e.preventDefault();
        $('#picard').hide();
        $('#aicard').hide();
        $('#passcard').show();
    });

    $('#cancelPassBtn').click(function(e){
        e.preventDefault();
        $('#picard').show();
        $('#aicard').show();
        $('#passcard').hide();
    });

    // Edit User Details
    $('#userForm').submit(function(e){
        e.preventDefault();
        var userId = $("#userId").val();
        var fname = $("#editFname").val();
        var lname = $("#editLname").val();
        var address = $("#editAddress").val();
        var contact = $("#editContact").val();
        var username = $("#editUsername").val()
        var email = $("#editEmail").val();

        var formData = {
            "fname": fname,
            "lname": lname,
            "address": address,
            "contact": contact,
            "username": username,
            "email": email,
        };
        
        $.ajax({
            url: "/edituser/" + userId,
            type: 'PUT',
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function(data) {
                Swal.fire({
                    title: 'Details Updated',
                    text: "",
                    icon: 'success',
                    showCancelButton: false,
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.href="/profile" 
                    }
                })
            
            },error: function (xhr, status, error) {
                $("#errMsg").show().text(xhr.responseText).delay(3000).fadeOut();
            }
        });  
             
    });

    // Change Password
    $('#userpassForm').submit(function(event) {
        event.preventDefault();
        var userId = $("#passId").val();
        var oldpass = $("#oldpass").val();
        var newpass = $("#newpass").val();
        var conpass = $("#conpass").val();
        var formData = {
          "oldpass": oldpass,
          "newpass": newpass
        };
        
        if(newpass.length < 8){
            $("#passerrMsg").show().text("Password should have atleast 8 characters").delay(3000).fadeOut();
        }else if (newpass == conpass){
            $.ajax({
                type: 'PUT',
                url: '/editpass/' + userId,
                data: JSON.stringify(formData),
                contentType: 'application/json',
                success: function(result) {
                    Swal.fire({
                        title: 'Password Changed',
                        text: "You will be automtically logout",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Ok'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.href="/logout" 
                        }
                    })
                },
                error: function(xhr, status, error) {
                    $("#passerrMsg").show().text(xhr.responseText).delay(3000).fadeOut();
                }
            });    
        }
        else {
            $("#passerrMsg").show().text("Password don't match").delay(3000).fadeOut();
        }
      });

});