import { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import LogoutButton from '../component/LogoutButton';
import SearchResult from '../page/Search';

const Header = (props) => {

    // Logged user usernamevariables
    const [username, setUsername] = useState('');
    useEffect(() => {
      axios.get('/loggedUser')
        .then(response => setUsername(response.data))
        .catch(error => console.error(error));
    }, []);
    
    // Search user selector variables
    const [options, setOptions] = useState([]);
    const [searchword, setSelectedPeople] = useState('');

    // Populate search user search bar
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
      setSelectedPeople(selected);
    };

    // Handle submission of search user
    const handleSearchSubmit = (event) => {
      event.preventDefault();
      axios.defaults.withCredentials = true;
      axios.post('/search', 
      {searchWord: searchword.value}, 
      {withCredentials: true}, 
      { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          setSearchData(response.data);
          setIsOpenSearch(!isOpenSearch);
          setSelectedPeople('')
        })
        .catch(error => console.error(error));
    };

    // Submit search user when press enter
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleSearchSubmit(event);
      }
    };

    // User image preview
    const [previewImage, setPreviewImage] = useState('');
    useEffect(() => {
      if (username && username.photo) {
        if (username.photo === 'noimage') {
          setPreviewImage('/ProfilePhotos/noimage.png');
        } else {
          setPreviewImage('/ProfilePhotos/' + username.photo);
        }
      }
    }, [username, setPreviewImage]);

    // Passed Data to search component
    const [isOpenSearch, setIsOpenSearch] = useState(false);
    const [searchData, setSearchData] = useState('');

    return (
    <>
      <header style={{width: '100%', paddingRight: '0'}}>
      <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#537557'}}>
        <div className="container-fluid">
          {/* Label */}
          <a href="/Dashboard" className="navbar-brand" style={{color: 'white', fontWeight:'bold', fontFamily: 'Verdana, Geneva, Tahoma, sans-serif'}}>
            <i className="fa-solid fa-calendar-days"></i> TIMETABLE
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse float-end" id="navbarSupportedContent">
          
            {/* SEARCH BAR */}
            <div className="navbar-nav ms-auto me-auto">
              <form className="d-flex" role="search" id='searchForm' onSubmit={handleSearchSubmit}> 
              <div className="row-5">
                <Select
                    name="peoples[]"
                    options={options}
                    className="participant"
                    classNamePrefix="select"
                    onChange={handleSelectChange}
                    value={searchword}
                    maximumSelectionLength={1}
                    onKeyPress={handleKeyPress}
                    maxMenuHeight={150}
                    components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                    required
                    placeholder="Search..."
                    styles={{ 
                      container: (provided) => ({
                        ...provided,
                        width: '300px',
                        zIndex: '99'
                      })  
                    }}
                  />
              </div>   
                <button className="btn btn-outline-light ms-2" type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
              </form>
            </div>

            {/* Dropdown */}
            <img src={previewImage} className="rounded-circle" alt="example placeholder" style={{width: '30px', height: '30px'}}/>
            <div className="btn-group">
              <button type="button" className="btn dropdown-toggle" style={{backgroundColor: '#537557', color: 'white'}} data-bs-toggle="dropdown" aria-expanded="false">
                <span >{username.fname} {username.lname}</span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a href="/profile" className="dropdown-item"><i className="fa-solid fa-user me-2"></i>My Profile</a></li>
                <LogoutButton/>
              </ul>
            </div>        
          </div>
        </div>
      </nav>
    </header>
    <SearchResult isOpenSearch={isOpenSearch} toggleModal={handleSearchSubmit} searchData={searchData}/>
    </>
    )
}

export default Header