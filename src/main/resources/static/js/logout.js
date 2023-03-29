$(document).ready(function(){
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
      Swal.fire(
        'Logout Success!',
        '',
        'success'
      )
    }
  })
});
});