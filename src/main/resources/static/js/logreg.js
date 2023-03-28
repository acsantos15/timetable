$('#signupBtn').click(function(e){
    e.preventDefault();
    var formData = $("#createUser").serializeArray()
    console.log(formData)
    // $.ajax({
    //     url: "/edit/" + eventId,
    //     type: 'PUT',
    //     contentType: "application/json",
    //     data: JSON.stringify(formData),
    //     success: function(data) {
    //         Swal.fire({
    //             title: 'Event Updated',
    //             text: " ",
    //             icon: 'success',
    //             showCancelButton: false,
    //             confirmButtonText: 'Ok'
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //                 location.reload(); 
    //             }
    //         })
    n
    //     },
    //     error: function (xhr, status, error) {
    //         console.log(xhr.responseText);
    //     }
    // });
});