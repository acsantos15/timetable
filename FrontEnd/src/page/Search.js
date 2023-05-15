import React, { useState, useEffect } from 'react';
import moment from 'moment';

const Search = (props) => {
  const { isOpenSearch, searchData } = props;

  return (
  <>
  <div class="modal" tabindex="-1" style={{ display: isOpenSearch ? "block" : "none" }}>
    <div class="modal-dialog modal-md modal-dialog-centered modal-lg">
        <div class="modal-content">
        <div class="modal-header" style={{backgroundColor: '#537557'}}>
            {searchData.users && searchData.users.map((user) => (
            <h5 key={user.id} class="modal-title">
                {user.fname} {user.lname} 
                {/* Schedule for Today */}
            </h5>
            ))} 
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.toggleModal}></button>
        </div>
        <div class="modal-body">
            <div class="row">
                {/* Searched User Account Information */}
                <div class="col-sm-5">
                    <div class="card" style={{padding: '30px'}}>
                        <div class="card-headers" style={{marginBottom: '15px'}}>
                            <h5 style={{color: '#7993a0', fontWeight: 'bold'}}>ACCOUNT INFORMATION</h5>
                        </div>
                        <div class="card-bodys">
                        {searchData.users && searchData.users.map((user) => (
                            <h6 key={user.id}>
                                Name: {user.fname} {user.lname} <br/><br/>
                                Address: {user.address} <br/><br/>
                                Username: {user.username} <br/><br/>
                                Email: {user.email}
                            </h6>
                        ))} 
                        </div>
                    </div>
                </div>

                {/* Searched User Schedule */}
                <div class="col-sm-7">
                    <div class="card" style={{padding: '0 30px 30px 30px', maxHeight: '500px',overflowY: 'auto'}}>
                    <div class="card-headers sticky-top" style={{backgroundColor: 'white'}}>
                        <h5 style={{color: '#7993a0', fontWeight: 'bold', height: '40px', marginTop: '30px'}}>SCHEDULE FOR TODAY</h5>
                    </div>
                    {searchData && searchData.events && searchData.events.length > 0 ? (
                    searchData.events.map((event) => (
                        <div key={event.id} className="dash card" style={{backgroundColor: event.color, margin: '2px', color: 'white'}} data-bs-toggle="tooltip" data-bs-class="custom-tooltip" data-bs-placement="bottom">
                            <ul style={{listStyleType: 'none', marginTop: '12px'}}> 
                                <li style={{fontSize: 'larger', fontWeight: 'bold'}}>{event.title}</li>
                                <li>{event.description}</li>
                                <li><small>{moment(event.start).format('hh:mm a')}</small> - <small>{moment(event.end).format('hh:mm a')}</small></li>
                            </ul>
                        </div>
                    ))
                    ) : (
                        <div>No appointment found.</div>
                    )}
                    </div>
                </div>
            </div>
            
        </div>
        </div>
    </div>
</div>
  </>
  )
}

export default Search