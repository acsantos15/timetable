import axios from 'axios';
import Swal from 'sweetalert2';

export function handleLogout() {
  Swal.fire({
      title: 'Logout?',
      text: " ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#537557',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok'
  }).then((result) => {
      if (result.isConfirmed) {
        axios.get('/logout')
        .then(response => {
          if (response.data.status === 'success') {
            console.log('Logged out successfully!');
            window.location.href = "/login";
          } else {
            console.log('Logout error');
          }
        })
        .catch(error => {
          console.log('Error logging out', error);
        });
      }
  }) 
}

function LogoutButton() {
  return (
    <li><a class="dropdown-item" id="logoutBtn" style={{color:'red'}} onClick={handleLogout}><i class="fa-solid fa-power-off me-2"></i>Logout</a></li>
  );
}

export default LogoutButton;
