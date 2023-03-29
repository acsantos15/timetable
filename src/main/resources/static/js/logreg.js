$(document).ready(function(){
    // Register
    $('#regForm').submit(function(e){
        e.preventDefault();
        var fname = $("#fname").val();
        var lname = $("#lname").val();
        var address = $("#address").val();
        var contact = $("#contact").val();
        var username = $("#username").val();
        var email = $("#email").val();
        var pass = $("#pass").val();
        var conpass = $("#conpass").val();

        var formData = {
            "fname": fname,
            "lname": lname,
            "address": address,
            "contact": contact,
            "username": username,
            "email": email,
            "pass": pass,
        };
        if(pass == conpass){
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
                           window.location.href="/login" //change to login
                        }
                    })
                },
                error: function (xhr, status, error) {
                    console.log(xhr.responseText);
                    console.log(formData)
                }
            });
        }else{
            Swal.fire(
                'Password dont match!',
                'You clicked the button!',
                'warning'
            )
        }
        
    });

    /* Display success message */
    var success = /*[[${success}]]*/ null;
    if (success) {
        alert(success);
    }
    /* Display error message */
    var error = /*[[${error}]]*/ null;
    if (error) {
        alert(error);
    }
});