import React, { useEffect, useState } from "react";
import Select from 'react-select';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';

function AddEvent(props) {
  const { isOpenAdd, selectStart, selectEnd } = props;

  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('#dd766a');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
  const [end, setEnd] = useState('');
  const fEnd = moment(end).format('YYYY-MM-DD HH:mm:ss');

  useEffect(() => {
    if (selectStart != null && selectEnd != null) {
      setStart(selectStart);
      setEnd(selectEnd);
    }
  }, [selectStart, selectEnd]);
  
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
    if (!selected.some(option => option.value === selectedPeople[0].value)) {
      setSelectedPeople(selectedPeople);
    } else {
      setSelectedPeople(selected);
    }
  };
  
  const sTime = moment(start).format('HH');
  const eTime = moment(end).format('HH');
  const sTimeStamp = Date.parse(start);
  const eTimeStamp = Date.parse(end);

  const diffMs = Math.abs(sTimeStamp - eTimeStamp);
  const diffMins = Math.floor(diffMs / 1000 / 60);

  const currentDatetime = moment().format('YYYY-MM-DDTHH:mm');

  const handleSubmit = (event) => {
    event.preventDefault();
    if(sTime > 19 || sTime < 6 || eTime > 19 || eTime < 6){
      setTimeError('6am to 7pm only');
      setTimeout(() => {
        setTimeError(null);
      }, 3000);
    }else if(moment(end).isBefore(start)){
      setTimeError('Appointment start should be later than end');
      setTimeout(() => {
        setTimeError(null);
      }, 3000);
    }else if(diffMins < 30){
      setTimeError('Appointment should be atleast 30 mins');
      setTimeout(() => {
        setTimeError(null);
      }, 3000);
    }else if(moment(start).isBefore(currentDatetime)){
      setTimeError('Time has already passed');
      setTimeout(() => {
        setTimeError(null);
      }, 3000);
    }
    else{
      axios.defaults.withCredentials = true;
      axios.post('/saveEvent', 
      {title: title, color: selectedColor, description: description, location: location, start: fStart, end: fEnd},
      {withCredentials: true}, 
      { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        const selectedPeopleIds = selectedPeople.map(p => p.value);
        const payload = {eventId: response.data, participantIds: selectedPeopleIds};
        axios.defaults.withCredentials = true;
        axios.post('/saveEventParticipants', payload, {withCredentials: true}, 
        { headers: { 'Content-Type': 'application/json' } })
        .then(response => {
          Swal.fire({
              title: 'Event Added',
              text: " ",
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK',
              confirmButtonColor: '#537557',
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
    }  
  };
  const handleClear = () => {
    setTitle('');
    setSelectedColor('#dd766a');
    setDescription('');
    setLocation('');
    setStart('');
    setEnd('');
    const preselectedUser = options.find(user => user.value === selectedPeople[0].value);
    const updatedSelectedPeople = preselectedUser ? [preselectedUser] : [];

    setSelectedPeople(updatedSelectedPeople);
  };

  const handleModalClose = () => {
    props.toggleModal();
    handleClear();
  }

  // Errors
  const [timeerr, setTimeError] = useState(null);
  
  return (
    <div className="modal" tabIndex="-1" style={{ display: isOpenAdd ? "block" : "none" }}>
      <form onSubmit={handleSubmit}>
      <div class="modal-dialog modal-dialog-centered modal-lg" style={{marginTop: '8%'}}>
        <div style= {{backgroundColor: 'white'}}class="modal-content">
          
          <div class="modal-header" style={{backgroundColor:selectedColor}}>
            <h5 class="modal-title"><i class="fa-regular fa-calendar-plus me-2"></i>New Appointment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={handleModalClose} aria-label="Close"></button>
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
                  <option value="#dd766a" style={{backgroundColor: '#dd766a'}}></option>
                  <option value="#dd996a" style={{backgroundColor: '#dd996a'}}></option>
                  <option value="#eddf7d" style={{backgroundColor: '#eddf7d'}}></option>
                  <option value="#5f9e55" style={{backgroundColor: '#5f9e55'}}></option>
                  <option value="#5287ba" style={{backgroundColor: '#5287ba'}}></option>  
                  <option value="#8364a7" style={{backgroundColor: '#8364a7'}}></option>
                  <option value="#c97ab9" style={{backgroundColor: '#c97ab9'}}></option>
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
                  <input className={`form-control ${timeerr ? 'is-invalid' : ''}`} type="datetime-local" id="addStart" name="start" placeholder="Start" value={start} onChange={handleStartChange} required/>
                  {timeerr && <div style={{height: '10px'}} className="invalid-feedback">{timeerr}</div>}
                </div>
              </div>
              <div class="col">
                <label class="control-label col-sm-2" for="addEnd"><i class="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i>End</label>
                <div class="col-sm-15">          
                  <input className={`form-control ${timeerr ? 'is-invalid' : ''}`} type="datetime-local" id="addEnd" name="end" placeholder="End" value={end} onChange={handleEndChange} required/>
                  {timeerr && <div style={{height: '10px'}} className="invalid-feedback">{timeerr}</div>}
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
