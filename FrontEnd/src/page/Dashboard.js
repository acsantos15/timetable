import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import MiniCalendar from '../component/MiniCalendar';
import Navigation from '../component/Navigation';
import { Auth } from '../component/Auth';
import "../css/style.css";


const Dashboard = () => {
  const [todayEvents, setTodayEvents] = useState([]);
  const [tomorrowEvents, setTomorrowEvents] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  
  useEffect(() => {
    axios.get('http://localhost:8080/dashboard')
      .then((response) => {
        setTodayEvents(response.data.today);
        setTomorrowEvents(response.data.tomorrow);
        setWeatherData(response.data.weatherData);
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
        Auth();
    document.body.style.backgroundColor = "#DEDBD3"; 
       
    return (
    
    <div className="row justify-content-center" >
        <Header/>
        <Navigation/>
        {/* Dashboard */}
        <div className="col-lg-8 mb-3" >
            <div className="card" style={{backgroundColor: 'white',margin: '20px 0 0 20px'}}>
                  
                {/* Today's Event Tables */}
                <div className="container" style={{paddingTop: '20px'}}>
                    <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder'}}><i className="fa-solid fa-calendar-day me-2"></i>Today</h3>
                    <hr/>
                    
                    {todayEvents.length ? (
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


                {/* Tommorows's Event Tables */}
                <div className="container" style={{paddingTop: '20px'}}>
                    <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder'}}><i class="fa-solid fa-calendar-day fa-flip-horizontal me-2"></i>Tommorow</h3>
                    <hr/>

                    {tomorrowEvents.length ? (
                    tomorrowEvents.map((event) => (
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
                            <div class="d-flex align-items-center justify-content-center" style={{fontSize: 'larger', fontWeight: 'bold'}}>No Event for Tommorow</div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div class="col mb-3" style={{margin:'20px 20px 0 0'}}>  
            {/* Calendar div */}
            <div class="card mb-3">
                <div class="card-body">
                    <MiniCalendar />
                </div>
            </div>

            {/* Weather div */}
            <div className="card align-items-center" style={{padding: '20px'}}>
              <h3 style={{fontWeight: 'bold', color: '#7993A0'}}>Today's Weather</h3>
              <img src={`http://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`} alt="weather icon" style={{width: '150px'}} />
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