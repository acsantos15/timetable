import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/Header';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [todayEvents, setTodayEvents] = useState([]);
  const [todayResponse, setTodayResponse] = useState('');
  const [tomorrowEvents, setTomorrowEvents] = useState([]);
  const [tomorrowResponse, setTomorrowResponse] = useState('');
  const [weatherData, setWeatherData] = useState({});
  
  useEffect(() => {
    axios.get('http://localhost:8080/dashboard')
      .then((response) => {
        setUsername(response.data.username);
        setTodayEvents(response.data.today);
        setTodayResponse(response.data.todayResponse);
        setTomorrowEvents(response.data.tomorrow);
        setTomorrowResponse(response.data.tomorrowResponse);
        setWeatherData(response.data.weatherData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="row justify-content-center" style={{margin:'50px'}}>
        <Header/>
        {/* Dashboard */}
        <div className="col-lg-8 mb-3">
            <div className="card" style={{backgroundColor: 'white'}}>
                  
                {/* Today's Event Tables */}
                <div className="container" style={{paddingTop: '20px'}}>
                    <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder'}}><i className="fa-solid fa-calendar-day me-2"></i>Today</h3>
                    <hr/>

                    {/* Today's Event = null */}
                    {/* <th:block th:if="${todayResponse == 'NoData'}">
                        <div class="dash card" style={{margin:10px; color:white; padding: 20px 20px 20px 0; background-color: rgb(68, 66, 66);}}>
                            <div class="d-flex align-items-center justify-content-center" style="font-size: larger; font-weight: bold;">No Event for Today</div>
                        </div>
                    </th:block> */}

                    {/* Today's Event = true */}
                        <div className="dash card" style={{margin: '10px', color: 'white', padding: '10px 20px 10px 0'}} data-bs-toggle="tooltip" data-bs-class="custom-tooltip" data-bs-placement="bottom">    
                            <ul style={{listStyleType: 'none', marginTop: '12px'}}> 
                            {todayEvents.map((event) => (
                                <li key={event.id}>{event.title} - {event.start}</li>
                            ))}
                            </ul>
                        </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard