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
  const [appointmentCreator, setAppointmentCreator] = useState('');
  useEffect(() => {
    axios.get('/events/'+eventId+'/users')
    .then(response => {
        const people = response.data;
        let num = 1;
        const participantList = people.slice(1).map((person) => {
        return (
            // Transfer this loop
            <li key={person.id} style={{ listStyleType: 'none', marginBottom: '10px' }}>
            {num++}.) {person.fname} {person.lname}
            </li>
        );
        });
        setParticipants(participantList);
        setAppointmentCreator(people[0]?.fname + ' ' + people[0]?.lname);
    })
    .catch(error => {
        console.log(error);
    });
    axios.get('/events/'+eventId+'/users')
      .then(response => {
        const users = response.data.map(user => ({
          value: user.id,
          label: user.fname + ' ' + user.lname
        }));
        setSelectedPeople(users);
      })
      .catch(error => console.error(error));

      
  }, [eventId]);

  const handleDeleteEvent = () => {
    Swal.fire({
        title: 'Delete Event?',
        text: " ",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#537557',
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

  // Open Edit Event Modal
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const handleEditShow = () => {
    setIsOpenEdit(!isOpenEdit);
    setSelectedColor(eventData.color);
    setTitle(eventData.title);
    setDescription(eventData.description);
    setLocation(eventData.location);
    setStart(eventData.start);
    setEnd(eventData.end)
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

  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const fStart = moment(start).format('YYYY-MM-DD HH:mm:ss');
  const [end, setEnd] = useState('');
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

  const handleSubmit = (event) => {
    event.preventDefault();
      axios.defaults.withCredentials = true;
      axios.put('/edit/'+eventId, 
      {title: title, color: selectedColor, description: description, location: location, start: fStart, end: fEnd}, 
      {withCredentials: true}, 
      { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        axios.delete('/delete/'+eventId+'/edit')
        .then(response => {
          const selectedPeopleIds = selectedPeople.map(p => p.value);
          const payload = {eventId: response.data, participantIds: selectedPeopleIds};
          axios.defaults.withCredentials = true;
          axios.post('http://localhost:8080/saveEventParticipants', payload, {withCredentials: true}, 
          { headers: { 'Content-Type': 'application/json' } })
          .then(response => {
            Swal.fire({
                title: 'Event Updated',
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
      const preselectedUser = options.find(user => user.value === selectedPeople[0].value);
      const updatedSelectedPeople = preselectedUser ? [preselectedUser] : [];

      setSelectedPeople(updatedSelectedPeople);
    };

    const handleModalClose = () => {
      props.toggleModal();
      handleClear();
    }
  return (
    <>
    <div className="modal" tabIndex="-1" style={{ display: isOpenView ? "block" : "none" }}>
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header" style={{backgroundColor: selectedColor}}>
          <h5 class="modal-title"> <i class="fa-solid fa-circle-info me-2"></i>Event Details</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={handleModalClose} aria-label="Close"></button>
        </div>

        <div class="modal-body">
          <input type="hidden" id="eventId"></input>
          <p class="fw-bold"><i class="fa-solid fa-pen me-2"></i>Title: </p><p id="eventTitle" style={{wordBreak: 'break-all'}}>{eventData.title}</p>
          <p class="fw-bold"><i class="fa-solid fa-comments me-2"></i>Description: </p><p id="eventDescription" style={{wordBreak: 'break-all'}}>{eventData.description}</p>
          <p class="fw-bold"><i class="fa-solid fa-location-dot me-2"></i>Location: </p><p id="eventLocation">{eventData.location}</p>
          <p><i class="fa-solid fa-user-tie me-2"></i><b>Appointment Creator:</b> {appointmentCreator}</p>
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
      <div class="modal-dialog modal-dialog-centered modal-lg" style={{marginTop: '8%'}}>
        <div style= {{backgroundColor: 'white'}}class="modal-content">
          
          <div class="modal-header" style={{backgroundColor: selectedColor}}>
            <h5 class="modal-title"><i class="fa-regular fa-calendar-plus me-2"></i>Edit Appointment</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={handleEditShow} aria-label="Close"></button>
          </div>
          <div class="modal-body" style={{fontWeight: 'bold'}}>
            <div class="mb-3 row">
              <div class="col-md-10">
                <label for="addTitle" class="form-label"><i class="fa-solid fa-pen me-2"></i>Title</label>
                <input type="text" class="form-control" id="addTitle" name="title" maxlength="100" value={title} onChange={handleTitleChange} required/>
              </div>
              <div class="col-sm-2">
              <label for="addColor" class="form-label"><i class="fa-solid fa-palette me-2"></i>Color</label>
              <select class="form-select" id="addColor" name="color" onChange={handleHeaderColor} value={selectedColor} style={{ backgroundColor: selectedColor}}>
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
                  <input class="form-control" type="datetime-local" id="addStart" name="start" placeholder="Start" value={start} onChange={handleStartChange} required/>
                </div>
              </div>
              <div class="col">
                <label class="control-label col-sm-2" for="addEnd"><i class="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i>End</label>
                <div class="col-sm-15">          
                  <input class="form-control" type="datetime-local" id="addEnd" name="end" placeholder="End" value={end} onChange={handleEndChange} required/>
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

  </>
  )
}

export default ViewEditEvent