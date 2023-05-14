import axios from 'axios';

export function handleLogout() {
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

function LogoutButton() {
  return (
    <li><a class="dropdown-item" id="logoutBtn" style={{color:'red'}} onClick={handleLogout}><i class="fa-solid fa-power-off me-2"></i>Logout</a></li>
  );
}

export default LogoutButton;
