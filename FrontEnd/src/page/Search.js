import React, { useState, useEffect } from 'react';

const Search = (props) => {
  const { isOpenSearch, searchName } = props;

  return (
  <>
  <div class="modal" tabindex="-1" style={{ display: isOpenSearch ? "block" : "none" }}>
    <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Search Result</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.toggleModal}></button>
        </div>
        <div class="modal-body">
            <p>{searchName}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
    </div>
  </div>
    {/* <div style={{margin: '30px 0px 0px 60px', color: '#537557', fontWeight: 'bold'}}>
        <h3> Search Result</h3>
    </div>

    <div class="row justify-content-center" style={{margin: '30px 50px 50px 50px'}}>

        {/* <div class="col">
            <div class="card" style={{padding:'30px'}}>
                <div class="card-headers" style={{marginBottom: '15px'}}>
                    <h5 style={{color: '#7993a0', fontWeight: 'bold'}}>ACCOUNT INFORMATION</h5>
                </div>
                <div class="card-bodys">
                    {user.length ? (
                        todayEvents.map((event) => (
                            <div key={event.id} className="dash card" style={{backgroundColor: event.color, margin: '10px', color: 'white', padding: '10px 20px 10px 0'}} data-bs-toggle="tooltip" data-bs-class="custom-tooltip" data-bs-placement="bottom">
                            <ul style={{listStyleType: 'none', marginTop: '12px'}}> 
                                <li style={{fontSize: 'larger', fontWeight: 'bold'}}>{event.title}</li>
                                <li> {event.description}</li>
                                <li><small>{event.start}</small> - <small>{event.end}</small></li>
                            </ul>
                            </div>
                        ))
                        ) : (
                            <div class="dash card" style={{margin:'10px', color:'white', padding: '20px 20px 20px 0', backgroundColor: 'rgb(68, 66, 66)'}}>
                                <div class="d-flex align-items-center justify-content-center" style={{fontSize: 'larger', fontWeight: 'bold'}}>No Event for Today</div>
                            </div>
                    )}
                </div>
            </div>
        </div>

        <div class="col">
            <div class="card" style="padding:30px;">
                <th:block th:each="uname: ${users}">
                    <h4 style="color: rgb(82, 10, 10);"><span th:text="${#strings.capitalize(uname.username)}"></span>'s Schedule for Today</h4>
                </th:block>
                <td th:if="${eventresult == 'noevent'}">
                    <div class="dash card" style="margin:10px; color:white; padding: 20px 0 20px 0; background-color: rgb(68, 66, 66);">
                        <div class="d-flex align-items-center justify-content-center" style="font-size: larger; font-weight: bold;">No Appointment for Today</div>
                    </div>
                </td>
                <th:block th:each="event : ${events}">
                    <div class="dash card" th:style="'background-color:' + ${event.color}+'; margin:10px; color:white;'" th:id="${event.id}" data-bs-toggle="tooltip" data-bs-placement="bottom">
                        <ul style="list-style-type: none; margin-top: 12px;"> 
                            <li th:text="${event.title}" style="font-size: larger; font-weight: bold;"></li>
                            <li th:text="${event.description}"></li>
                            <li><small th:text="${#temporals.format(event.start, 'hh:mm a')}" ></small> - <small th:text="${#temporals.format(event.end, 'hh:mm a')}" ></small></li>
                        </ul>
                    </div>
                </th:block>
            </div>
        </div>

    </div> */}
  </>
  )
}

export default Search