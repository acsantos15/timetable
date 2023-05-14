import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import LogoutButton from '../component/LogoutButton';
import SearchResult from '../page/Search';

const Header = (props) => {
  const navigate = useNavigate ();

  const [username, setUsername] = useState('');
  useEffect(() => {
    axios.get('/loggedUser')
      .then(response => setUsername(response.data))
      .catch(error => console.error(error));
  }, []);

  const [options, setOptions] = useState([]);
  const [searchword, setSelectedPeople] = useState('');

  useEffect(() => {
    axios.get('/users')
      .then(response => {
        const users = response.data.users.map(user => ({
          value: user.id,
          label: user.fname +" "+ user.lname,
        }));
        setOptions(users);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSelectChange = (selected) => {
    const userId = selected.value;
    setSelectedPeople(userId);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post('/search', 
    {searchWord: searchword}, 
    {withCredentials: true}, 
    { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        setSearchName(response.data.user.fname + " "+ response.data.user.lname);
        setIsOpenSearch(!isOpenSearch);
      })
      .catch(error => console.error(error));
  };

  // Passed Data to search component
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [searchName, setSearchName] = useState();

  return (
  <>
    <header style={{width: '100%'}}>
    <nav class="navbar navbar-expand-lg" style={{backgroundColor: '#537557'}}>
      <div class="container-fluid">
        {/* Label */}
        <a href="/Dashboard" class="navbar-brand" style={{color: 'white', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>
          <i class="fa-sharp fa-regular fa-calendar-days" ></i> TIMETABLE
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse float-end" id="navbarSupportedContent">
        
          {/* SEARCH BAR */}
          <div class="navbar-nav ms-auto me-auto">
            <form class="d-flex" role="search" onSubmit={handleSearchSubmit}> 
            <div class="row-5">
              <Select
                  isMulti
                  name="peoples[]"
                  options={options}
                  className="participant"
                  classNamePrefix="select"
                  onChange={handleSelectChange}
                  value={searchword}
                  maximumSelectionLength={1}
                  styles={{ 
                    container: (provided) => ({
                      ...provided,
                      zIndex: 9999
                    })
                  }}
                  style={{ width: '300px', marginRight: '100px', minWidth: '300px' }}
                />
            </div>   
              <button class="btn btn-outline-light ms-2" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
          </div>

          {/* Dropdown */}
          <div class="btn-group">
            <button type="button" class="btn dropdown-toggle" style={{backgroundColor: '#537557', color: 'white'}} data-bs-toggle="dropdown" aria-expanded="false">
              <span >{username.fname} {username.lname}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a href="/profile" class="dropdown-item"><i class="fa-solid fa-user me-2"></i>My Profile</a></li>
              <LogoutButton/>
            </ul>
          </div>        
        </div>
      </div>
    </nav>
  </header>
  <SearchResult isOpenSearch={isOpenSearch} toggleModal={handleSearchSubmit} searchName={searchName}/>
  </>
  )
}

export default Header