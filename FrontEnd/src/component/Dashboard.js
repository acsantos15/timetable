import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import MiniCalendar from '../component/MiniCalendar';
import Navigation from '../component/Navigation';
import { Auth } from './Auth';


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
        Auth();
        function changeBackground(color) {
            document.body.style.background = color;
          }
        
          window.addEventListener("load",function() { changeBackground('#DEDBD3') });
        
        
       
    return (
    
    <div className="row justify-content-center" >
        <Header/>
        <Navigation/>
        {/* Dashboard */}
        <div className="col-lg-8 mb-3" >
            <div className="card" style={{backgroundColor: 'white',margin:'20px'}}>
                  
                {/* Today's Event Tables */}
                <div className="container" style={{paddingTop: '20px'}}>
                    <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder'}}><i className="fa-solid fa-calendar-day me-2"></i>Today</h3>
                    <hr/>

                    {/* Today's Event = true */}
                    <div className="dash card" style={{margin: '10px', color: 'green', padding: '10px 20px 10px 0'}} data-bs-toggle="tooltip" data-bs-class="custom-tooltip" data-bs-placement="bottom">    
                        <ul style={{listStyleType: 'none', marginTop: '12px'}}> 
                        {todayEvents.map((event) => (
                            <li key={event.id}>{event.title} - {event.start}</li>
                        ))}
                        </ul>
                    </div>
                </div>


                {/* Tommorows's Event Tables */}
                <div className="container" style={{paddingTop: '20px'}}>
                    <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder'}}><i class="fa-solid fa-calendar-day fa-flip-horizontal me-2"></i>Tommorow</h3>
                    <hr/>

                    {/* Today's Event = true */}
                    <div className="dash card" style={{margin: '10px', color: 'green', padding: '10px 20px 10px 0'}} data-bs-toggle="tooltip" data-bs-class="custom-tooltip" data-bs-placement="bottom">    
                        <ul style={{listStyleType: 'none', marginTop: '12px'}}> 
                        {tomorrowEvents.map((event) => (
                            <li key={event.id}>{event.title} - {event.start}</li>
                        ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="col mb-3" style={{margin:'20px'}}>  
            {/* Calendar div */}
            <div class="card mb-3">
                <div class="card-body">
                    <MiniCalendar />
                </div>
            </div>

            {/* Weather div */}
            <div className="card align-items-center" style={{padding: '20px'}}>
              <h3 style={{fontWeight: 'bold', color: '#7993A0'}}>Today's Weather</h3>
              <img src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`} style={{width: '150px'}} />
              <p><b>Location:</b> Pasig</p>
              <p><b>Temperature:</b> {weatherData?.main?.temp}&deg;C</p>
              <p><b>Humidity:</b> {weatherData?.main?.humidity}%</p>
              <p><b>Weather Description:</b> <span>{weatherData?.weather?.[0]?.description}</span></p>
            </div>

        </div>
    </div>
  )
}

export default Dashboard