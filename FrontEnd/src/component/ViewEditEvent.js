import React,{useEffect,useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import Swal from 'sweetalert2';
import Select from 'react-select';

const ViewEditEvent = (props) => {
  const { isOpenView, eventData } = props;
  const [participants, setParticipants] = useState([]);
  const eventId = eventData.id;

  // Populate Participants
  useEffect(() => {
    axios.get('/events/'+eventId+'/users')
    .then(response => {
        const people = response.data;
        let num = 1;
        const participantList = people.map((person) => {
        return (
            // Transfer this loop
            <li key={person.id} style={{ listStyleType: 'none', marginBottom: '10px' }}>
            {num++}.) {person.fname} {person.lname}
            </li>
        );
        });
        setParticipants(participantList);
    })
    .catch(error => {
        console.log(error);
    });
  }, [eventId]);

  const handleDeleteEvent = () => {
    Swal.fire({
        title: 'Delete Event?',
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
          axios.delete('/delete/'+eventId)
          .then(response => {
            window.location.reload(); 
          })           
        }
    }) 
  };


  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleEditShow = () => {
    setIsOpenEdit(!isOpenEdit);
  };


  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('#537C78');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  
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

  const handleSubmit = (event) => {
    event.preventDefault();
      axios.defaults.withCredentials = true;
      axios.post('http://localhost:8080/saveEvent', 
      {title: title, color: selectedColor, description: description, location: location, start: start, end: end}, 
      {withCredentials: true}, 
      { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
      })  
      .catch(error => {
        console.log(error);
      });  
  };
  return (
    <>
    <div className="modal" tabIndex="-1" style={{ display: isOpenView ? "block" : "none" }}>
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"> <i class="fa-solid fa-circle-info me-2"></i>Event Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={props.toggleModal} aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <input type="hidden" id="eventId"></input>
          <p class="fw-bold"><i class="fa-solid fa-pen me-2"></i>Title: </p><p id="eventTitle" style={{wordBreak: 'break-all'}}>{eventData.title}</p>
          <p class="fw-bold"><i class="fa-solid fa-comments me-2"></i>Description: </p><p id="eventDescription" style={{wordBreak: 'break-all'}}>{eventData.description}</p>
          <p class="fw-bold"><i class="fa-solid fa-location-dot me-2"></i>Location: </p><p id="eventLocation">{eventData.location}</p>
          <p class="fw-bold"><i class="fa-solid fa-users me-2"></i>Participant:</p>
          <ul class="list-group" id="participant">
            {participants}
          </ul>

          <div class="row align-items-center">
            <div class="col">
              <p class="fw-bold"><i class="fa-solid fa-hourglass-start me-2"></i>Start:</p>
              <p style={{display: 'inline'}}>Date: </p><p id="eventStartDate" style={{display: 'inline'}}>{moment(eventData.start).format('YYYY-MM-DD')}</p>
              <br/>
              <p style={{display: 'inline'}}>Time: </p><p id="eventStartTime" style={{display: 'inline'}}>{moment(eventData.start).format('HH:mm a')}</p>
            </div>
            <div class="col">
              <p class="fw-bold"><i class="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i>End:</p>
              <p style={{display: 'inline'}}>Date: </p><p id="eventEndDate" style={{display: 'inline'}}>{moment(eventData.end).format('YYYY-MM-DD')}</p>
              <br/>
              <p style={{display: 'inline'}}>Time: </p><p id="eventEndTime" style={{display: 'inline'}}>{moment(eventData.end).format('HH:mm a')}</p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" id="removeEventBtn" onClick={handleDeleteEvent}><i class="fa-solid fa-trash me-2" ></i>Delete</button>
          <button type="button" class="btn btn-success" id="editEventBtn" data-bs-target="#editEventModal" onClick={handleEditShow}><i class="fa-solid fa-pen-to-square me-2"></i>Edit</button>
        </div>
      </div>
    </div>
  </div> 

<div className="modal" tabIndex="-1" style={{ display: isOpenEdit ? "block" : "none" }}>
      <form onSubmit={handleSubmit}>
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div style= {{backgroundColor: 'white'}}class="modal-content">
          
          <div class="modal-header" style={{backgroundColor: selectedColor}}>
            <h5 class="modal-title"><i class="fa-regular fa-calendar-plus me-2"></i>New Appointment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={handleEditShow} aria-label="Close"></button>
          </div>
          <div class="modal-body" style={{fontWeight: 'bold'}}>
            <div class="mb-3 row">
              <div class="col-md-10">
                <label for="addTitle" class="form-label"><i class="fa-solid fa-pen me-2"></i>Title</label>
                <input type="text" class="form-control" id="addTitle" name="title" maxlength="100" value={eventData.title} onChange={handleTitleChange} required/>
              </div>
              <div class="col-sm-2">
              <label for="addColor" class="form-label"><i class="fa-solid fa-palette me-2"></i>Color</label>
              <select class="form-select" id="addColor" name="color" onChange={handleHeaderColor} value={eventData.color} style={{ backgroundColor: selectedColor }}>
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
              <textarea type="textarea" class="form-control" id="addDesc" name="description" maxlength="100" rows="3" value={eventData.description} onChange={handleDescriptionChange} required></textarea>
            </div>

            <div class="mb-3">
              <label for="addLoc" class="form-label"><i class="fa-solid fa-location-dot me-2"></i>Location</label>
              <select class="form-select" aria-label="Default select example" id="addLoc" name="location" value={eventData.location} onChange={handleLocationChange} required>
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
                // options={options}
                className="participant"
                classNamePrefix="select"
                // value={selectedPeople}
                // onChange={handleSelectChange}
              />
            </div> 

            <div class="row g-3">
              <div class="col">
                <label class="control-label col-sm-2" for="addStart"><i class="fa-solid fa-hourglass-start me-2"></i>Start</label>
                <div class="col-sm-15">          
                  <input class="form-control" type="datetime-local" id="addStart" name="start" placeholder="Start" value={eventData.start} onChange={handleStartChange} required/>
                </div>
              </div>
              <div class="col">
                <label class="control-label col-sm-2" for="addEnd"><i class="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i>End</label>
                <div class="col-sm-15">          
                  <input class="form-control" type="datetime-local" id="addEnd" name="end" placeholder="End" value={eventData.end} onChange={handleEndChange} required/>
                </div>
              </div>
            </div>
            
            {/* Error Message */}
            <span id="errMsg" style={{color:'red' }}></span>   
          </div>

          {/* Buttons */}
          <div class="modal-footer">
            <button type="reset" class="btn btn-outline-secondary"><i class="fa-solid fa-eraser me-2"></i>Clear</button>
            <button type="submit" class="btn btn-success" id="addEventBtn"><i class="fa-solid fa-floppy-disk me-2"></i>Save Changes</button>
          </div>            
        </div>                            
      </div>
      </form>
    </div>

  </>
  )
}

export default ViewEditEvent