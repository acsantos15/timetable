import React from 'react'

const AddEvent = () => {
  return (
    <div class="modal" id="addEventModal">
    <form id="addEventForm">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div style= {{backgroundColor: 'white'}} class="modal-content">

        <div class="modal-header">
          <h5 class="modal-title"><i class="fa-regular fa-calendar-plus me-2"></i>New Appointment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body" style={{fontWeight: 'bold'}}>
          <div class="mb-3 row">
            <div class="col-md-10">
              <label for="addTitle" class="form-label"><i class="fa-solid fa-pen me-2"></i>Title</label>
              <input type="text" class="form-control" id="addTitle" name="title" maxlength="100" required/>
            </div>
            <div class="col-sm-2" style={{paddingLeft: '0%'}}>
              <label for="addColor" class="form-label"><i class="fa-solid fa-palette me-2"></i>Event Color</label>
              <input type="color" class="form-control form-control-color" id="addColor" name="color" value="#537C78" list="colorPreset" title="Choose your color"/>
              <datalist id="colorPreset">
                <option>#537C78</option>
                <option>#F8B195</option>
                <option>#6C5B78</option>
                <option>#B26565</option>
                <option>#355C7D</option>
              </datalist>
            </div>
          </div>

          <div class="mb-3">
            <label for="addDesc" class="form-label"><i class="fa-solid fa-comments me-2"></i>Description</label>
            <textarea type="textarea" class="form-control" id="addDesc" name="description" maxlength="100" rows="3" required></textarea>
          </div>

          <div class="mb-3">
            <label for="addLoc" class="form-label"><i class="fa-solid fa-location-dot me-2"></i>Location</label>
            <select class="form-select" aria-label="Default select example" id="addLoc" name="location" required>
              <option value="" selected disabled></option>
              <option value="Center of Excellence 1">Center of Excellence 1</option>
              <option value="Center of Excellence 2">Center of Excellence 2</option>
              <option value="Center of Excellence 3">Center of Excellence 3</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="addPart" class="form-label"><i class="fa-solid fa-users me-2"></i>Participant/s:</label>
            <select class="participant" id="userSelect" name="peoples[]" multiple="multiple" style={{width:'100%'}} required></select>
          </div> 

          <div class="row g-3">
            <div class="col">
              <label class="control-label col-sm-2" for="addStart"><i class="fa-solid fa-hourglass-start me-2"></i>Start</label>
              <div class="col-sm-15">          
                <input class="form-control" type="datetime-local" id="addStart" name="start" placeholder="Start" min="T06:00" max="T19:30" required/>
              </div>
            </div>
            <div class="col">
              <label class="control-label col-sm-2" for="addEnd"><i class="fa-solid fa-hourglass-start fa-rotate-180 me-2"></i>End</label>
              <div class="col-sm-15">          
                <input class="form-control" type="datetime-local" id="addEnd" name="end" placeholder="End" min="06:30:00" max="20:00:00" required/>
              </div>
            </div>
          </div>

          {/* Error Message */}
          <span id="errMsg" style={{color:'red'}}></span>   
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
  )
}

export default AddEvent