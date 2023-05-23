import axios from 'axios';
import Swal from 'sweetalert2';

// Logout user
export function handleLogout() {
    Swal.fire({
        title: 'Logout?',
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#537557',
        cancelButtonColor: '#d33',
        confirmButtonText: 'OK'
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

// direct logout without sweet alert confirmation
export function directLogout() {
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

// logout button
function LogoutButton() {
  return (
    <li><p className="dropdown-item"  id="logoutBtn" style={{color:'red'}} onClick={handleLogout}><i className="fa-solid fa-power-off me-2"></i>Logout</p></li>
  );
}

export default LogoutButton;
