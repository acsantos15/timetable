import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';

function AddEvent(props) {
  const { isOpenAdd, selectStart, selectEnd } = props;
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('#537C78');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState(moment(new Date().toISOString()).format('YYYY-MM-DD HH:mm:ss'));
  const fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
  const [end, setEnd] = useState(moment(new Date().toISOString()).add(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'));
  const fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');
  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleHeaderColor = (event) => {
    setSelectedColor(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleStartChange = (event) => {
    setStart(event.target.value);
  };
  const handleEndChange = (event) => {
    setEnd(event.target.value);
  };

  const [options, setOptions] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  useEffect(() => {
    axios.get('/users')
      .then(response => {
        const users = response.data.users.map(user => ({
          value: user.id,
          label: user.fname +" "+ user.lname,
        }));
        setOptions(users);
        const preselectedUser = users.find(user => user.value === response.data.userid);
        setSelectedPeople([preselectedUser]);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSelectChange = (selected) => {
    setSelectedPeople(selected);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:8080/saveEvent', 
      {title: title, color: selectedColor, description: description, location: location, start: fStart, end: fEnd}, 
      {withCredentials: true}, 
      { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        alert(response.data)
        const selectedPeopleIds = selectedPeople.map(p => p.value);
        const payload = {eventId: response.data, participantIds: selectedPeopleIds};
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:8080/saveEventParticipants', payload, {withCredentials: true}, 
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          Swal.fire({
            title: 'Event Added',
            text: " ",
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.reload(); 
            }
        }) 
        })
        .catch(error => {
          console.log(error);
        });  
      })
      .catch(error => {
        console.log(error);
      });  
  };
  const handleClear = () => {
    setTitle('');
    setSelectedColor('#537C78');
    setDescription('');
    setLocation('');
    setStart('');
    setEnd('');
    setSelectedPeople([]);
  };
  
  return (
    <div className="modal" tabIndex="-1" style={{ display: isOpenAdd ? "block" : "none" }}>
      <form onSubmit={handleSubmit}>
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div style= {{backgroundColor: 'white'}}class="modal-content">
          
          <div class="modal-header" style={{backgroundColor: selectedColor}}>
            <h5 class="modal-title"><i class="fa-regular fa-calendar-plus me-2"></i>New Appointment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={props.toggleModal} aria-label="Close"></button>
          </div>
          <div class="modal-body" style={{fontWeight: 'bold'}}>
            <div class="mb-3 row">
              <div class="col-md-10">
                <label for="addTitle" class="form-label"><i class="fa-solid fa-pen me-2"></i>Title</label>
                <input type="text" class="form-control" id="addTitle" name="title" maxlength="100" value={title} onChange={handleTitleChange} required/>
              </div>
              <div class="col-sm-2">
              <label for="addColor" class="form-label"><i class="fa-solid fa-palette me-2"></i>Color</label>
              <select class="form-select" id="addColor" name="color" onChange={handleHeaderColor} value={selectedColor} style={{ backgroundColor: selectedColor }}>
                <option value="#537C78" style={{backgroundColor: '#537C78'}}></option>
                <option value="#F8B195" style={{backgroundColor: '#F8B195'}}></option>
                <option value="#6C5B78" style={{backgroundColor: '#6C5B78'}}></option>
                <option value="#B26565" style={{backgroundColor: '#B26565'}}></option>
                <option value="#355C7D" style={{backgroundColor: '#355C7D'}}></option>
              </select>
              </div>
            </div>

            <div class="mb-3">
              <label for="addDesc" class="form-label"><i class="fa-solid fa-comments me-2"></i>Description</label>
              <textarea type="textarea" class="form-control" id="addDesc" name="description" maxlength="100" rows="3" value={description} onChange={handleDescriptionChange} required></textarea>
            </div>

            <div class="mb-3">
              <label for="addLoc" class="form-label"><i class="fa-solid fa-location-dot me-2"></i>Location</label>
              <select class="form-select" aria-label="Default select example" id="addLoc" name="location" value={location} onChange={handleLocationChange} required>
                <option value="" selected disabled></option>
                <option value="Online Conference">Online Conference</option>
                <option value="Center of Excellence 1">Center of Excellence 1</option>
                <option value="Center of Excellence 2">Center of Excellence 2</option>
                <option value="Center of Excellence 3">Center of Excellence 3</option>
              </select>
            </div>

            <div class="mb-3">
              <label for="addPart" class="form-label"><i class="fa-solid fa-users me-2"></i>Participant/s:</label>
              <Select
                isMulti
                name="peoples[]"
                options={options}
                className="participant"
                classNamePrefix="select"
                value={selectedPeople}
                onChange={handleSelectChange}
              />
            </div> 

            <div class="row g-3">
              <div class="col">
                <label class="control-label col-sm-2" for="addStart"><i class="fa-solid fa-hourglass-start me-2"></i>Start</label>
                <div class="col-sm-15">          
                  <input class="form-control" type="datetime-local" id="addStart" name="start" placeholder="Start" value={selectStart} onChange={handleStartChange} required/>
                </div>
              </div>
              <div class="col">
                <label class="control-label col-sm-2" for="addEnd"><i class="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i>End</label>
                <div class="col-sm-15">          
                  <input class="form-control" type="datetime-local" id="addEnd" name="end" placeholder="End" value={selectEnd} onChange={handleEndChange} required/>
                </div>
              </div>
            </div>
            
            {/* Error Message */}
            <span id="errMsg" style={{color:'red' }}></span>   
          </div>

          {/* Buttons */}
          <div class="modal-footer">
            <button type="reset" class="btn btn-outline-secondary" onClick={handleClear}><i class="fa-solid fa-eraser me-2"></i>Clear</button>
            <button type="submit" class="btn btn-success" id="addEventBtn"><i class="fa-solid fa-floppy-disk me-2"></i>Save Changes</button>
          </div>            
        </div>                            
      </div>
      </form>
    </div>
  );
}

export default AddEvent;
