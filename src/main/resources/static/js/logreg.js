$(document).ready(function(){
    // Register User
    $('#regForm').submit(function(e){
        e.preventDefault();

        // All Form Input Value
        var fname = $("#fname").val().trim();
        var lname = $("#lname").val().trim();
        var address = $("#address").val().trim();
        var contact = $("#contact").val();
        var username = $("#username").val().trim();
        var email = $("#email").val();
        var pass = $("#pass").val();
        var conpass = $("#conpass").val();

        // FormData
        var formData = {
            "fname": fname,
            "lname": lname,
            "address": address,
            "contact": contact,
            "username": username,
            "email": email,
            "pass": pass,
        };
        // Form Validation
        if(pass.length < 8){
            $("#errMsg").show().text("Password should have atleast 8 characters").delay(3000).fadeOut();
        }else if(fname ==="" || lname ==="" || address ==="" || username ===""){
            $("#errMsg").show().text("Blank input not allowed").delay(3000).fadeOut();
        }
        else if(pass == conpass){
            $.ajax({
                url: "/createUser",
                type: 'POST',
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function(response) {
                    Swal.fire({
                        title: 'Congratulations!',
                        text: "Your account has been successfully created!",
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#517C63',
                        confirmButtonText: 'OK'
                        }).then((result) => {
                        if (result.isConfirmed) {
                           location.href="/login" //change to login
                        }
                    })
                },
                error: function (xhr, status, error) {
                    $("#errMsg").show().text(xhr.responseText).delay(3000).fadeOut();
                }
            });
        }else{
            $("#errMsg").show().text("Password don't match").delay(3000).fadeOut();
        }
        
    });


    // Logout 
    $('#logoutBtn').click(function(e){
        Swal.fire({
          title: 'Are you sure you want to logout?',
          text: "You will be returned to login screen",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes!'
        }).then((result) => {
          if (result.isConfirmed) {
            location.href="/logout"
          }
        })
    });
});