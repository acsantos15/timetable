import React,{useEffect,useState} from 'react';
import axios from 'axios';

const ViewEvent = (props) => {
  const { isOpenView, eventData } = props;
  const [participants, setParticipants] = useState([]);
  const eventId = eventData.id;

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
  }, []);
  return (
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
              <p style={{display: 'inline'}}>Date: </p><p id="eventStartDate" style={{display: 'inline'}}></p>
              <br/>
              <p style={{display: 'inline'}}>Time: </p><p id="eventStartTime" style={{display: 'inline'}}></p>
            </div>
            <div class="col">
              <p class="fw-bold"><i class="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i>End:</p>
              <p style={{display: 'inline'}}>Date: </p><p id="eventEndDate" style={{display: 'inline'}}></p>
              <br/>
              <p style={{display: 'inline'}}>Time: </p><p id="eventEndTime" style={{display: 'inline'}}></p>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger" id="removeEventBtn"><i class="fa-solid fa-trash me-2"></i>Delete</button>
          <button type="button" class="btn btn-success" id="editEventBtn" data-bs-target="#editEventModal" data-bs-toggle="modal"><i class="fa-solid fa-pen-to-square me-2"></i>Edit</button>
        </div>
      </div>
    </div>
  </div> 
  )
}

export default ViewEvent