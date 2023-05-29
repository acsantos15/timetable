import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import MiniCalendar from '../component/MiniCalendar';
import Navigation from '../component/Navigation';
import "../css/style.css";
import moment from 'moment';


const Dashboard = () => {
    // Dashboard data variables
    const [todayEvents, setTodayEvents] = useState([]);
    const [tomorrowEvents, setTomorrowEvents] = useState([]);
    const [weatherData, setWeatherData] = useState({});
    
    // Loading variables
    const [Loading, setLoading] = useState(true);
    
    // Set dashboard data 
    useEffect(() => {
        axios.get('/dashboard')
        .then((response) => {
            setTodayEvents(response.data.today);
            setTomorrowEvents(response.data.tomorrow);
            setWeatherData(response.data.weatherData);
            setLoading(false)
        })
        .catch((error) => {
            console.log(error);
            setLoading(false)
        });
    }, []);

    // Participant variables
    const [participant, setParticipant] = useState([]);

    // Fetch participants for todays event
    useEffect(() => {
        todayEvents.forEach((event) => {
        axios.get('/events/'+event.id+'/users')
            .then((response) => {
            const users = response.data;
            const participantNames = users.map((people) => people.fname+' '+people.lname);
            setParticipant((prevParticipants) => ({
                ...prevParticipants,
                [event.id]: participantNames,
            }));
            })
            .catch((error) => {
            console.log(error);
            });
        });
    }, [todayEvents]);

    // Fetch participants for tommorows event
    useEffect(() => {
        tomorrowEvents.forEach((event) => {
        axios.get('/events/'+event.id+'/users')
            .then((response) => {
            const users = response.data;
            const participantNames = users.map((people) => people.fname+' '+people.lname);
            setParticipant((prevParticipants) => ({
                ...prevParticipants,
                [event.id]: participantNames,
            }));
            })
            .catch((error) => {
            console.log(error);
            });
        });
    }, [tomorrowEvents]);

    // use to constantly update current time
    const [, setCurrentTime] = useState(moment().format('hh:mm:ss a'));
    useEffect(() => {
        const interval = setInterval(() => {
        setCurrentTime(moment().format('hh:mm:ss a'));
        }, 1000);
    
        return () => clearInterval(interval);
    }, []);

    // set weather gif 
    const icon = weatherData?.weather?.[0]?.icon;
    const [weatherIcon, setWeatherIcon] = useState('');
    useEffect(() => {
    if (icon === "01d") {
        setWeatherIcon("/weather/ClearSkyDay.gif");
    } else if (icon === "01n") {
        setWeatherIcon("/weather/ClearSkyNight.gif");
    } else if (icon === "02d") {
        setWeatherIcon("/weather/FewCloudsDay.gif");
    } else if (icon === "02n") {
        setWeatherIcon("/weather/FewCloudsNight.gif");
    } else if (icon === "03d" || icon === "03n") {
        setWeatherIcon("/weather/ScatteredClouds.gif");
    } else if (icon === "04d" || icon === "04n") {
        setWeatherIcon("/weather/BrokenClouds.gif");
    } else if (icon === "09d" || icon === "09n") {
        setWeatherIcon("/weather/ShowerRain.gif");
    } else if (icon === "10d") {
        setWeatherIcon("/weather/RainDay.gif");
    } else if (icon === "10n") {
        setWeatherIcon("/weather/RainNight.gif");
    } else if (icon === "11d" || icon === "11n") {
        setWeatherIcon("/weather/Thunderstorm.gif");
    } else {
        setWeatherIcon("/weather/Mist.gif");
    }
    }, [icon, weatherData])

    const filteredEvents = todayEvents
    .filter((event) => moment(event.end) > moment())
    .sort((a, b) => moment(a.start) - moment(b.start));
        
    return (
    <div className="justify-content-center">
        <Header/>
        <Navigation/>
        {/* Dashboard */}
        <div className="row" style={{margin: '20px 40px 0 40px'}}>
            <div className="col-lg-8 mb-3" >
                <div className="card" style={{backgroundColor: 'white'}}>
                    
                    {/* Today's Event Tables */}
                    <div className="container" style={{padding: '0 20px 0 20px', maxHeight: '400px',overflowY: 'auto', zIndex: '1'}}>
                        <div className="card-header sticky-top" style={{backgroundColor: 'white'}}>
                            <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder', height: '40px', margin: '15px 0 0 0'}}>
                                <i className="fa-solid fa-calendar-day me-2"></i>Today
                            </h3>
                        </div>
                        {/* <hr/> */}
                        
                        {Loading ? (
                            // Show the Bootstrap spinner while loading is true
                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                            <div class="row">
                            {filteredEvents.length ? (
                            filteredEvents
                            .map((event) => (
                                <div key={event.id} className="dash card col" style={{backgroundColor: event.color, margin: '10px', color: 'white', padding: '10px 20px 10px 0'}}>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-sm-9">
                                            <ul style={{listStyleType: 'none', marginTop: '12px'}}> 
                                                <li style={{fontSize: 'larger', fontWeight: 'bold'}}>{event.title}</li>
                                                <li> {event.description}</li>
                                                <li> {event.location}</li>
                                                <li><small>{moment(event.start).format('hh:mm a')}</small> - <small>{moment(event.end).format('hh:mm a')}</small></li>
                                                {moment().isBetween(moment(event.start), moment(event.end)) && (
                                                <li>
                                                    <span className="badge bg-light" style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }}>ONGOING ​​​​
                                                    <div className="spinner-border text-danger spinner-border-sm" role="status">
                                                        <span className="visually-hidden">Loading...</span>
                                                    </div>
                                                    </span>
                                                </li>
                                                )}
                                            </ul>
                                            </div>
                                            <div className="col">
                                            <div className="card" style={{backgroundColor: 'rgb(0 0 0 / 20%)'}}>
                                                <div className="card-header" style={{fontSize: 'small', fontWeight: 'bold'}}>
                                                    Participant/s
                                                </div>
                                                <ul className="list-unstyled pl-1" style={{listStyleType: 'none', margin: '5px'}}>
                                                    {participant[event.id]?.map((participantName, index) => (
                                                    <li key={index} className="list-group-item" style={{fontSize: 'small'}}>•ㅤ{participantName}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                            </div>
                                        </div>
                                    </div>           
                                </div>
                                
                            ))
                            ) : (
                                <div className="dash card col" style={{margin:'10px', color:'white', padding: '20px 20px 20px 0', backgroundColor: 'rgb(68, 66, 66)'}}>
                                    <div className="d-flex align-items-center justify-content-center" style={{fontSize: 'larger', fontWeight: 'bold'}}>No Event for Today</div>
                                </div>
                            )}
                            </div>
                            </>
                        )}  
                        <div className="card-footer sticky-bottom" style={{backgroundColor: 'white'}}></div>
                    </div>


                    {/* Tommorows's Event Tables */}
                    <div className="container" style={{padding: '0 20px 0px 20px', maxHeight: '410px',overflowY: 'auto'}}>
                        <div className="card-header sticky-top" style={{backgroundColor: 'white'}}>
                            <h3 style={{color: 'rgb(82, 10, 10)', fontWeight: 'bolder', height: '40px'}}>
                                <i className="fa-solid fa-calendar-day fa-flip-horizontal me-2"></i>Tommorow
                            </h3>
                        </div>
                        {/* <hr/> */}

                        {Loading ? (
                            // Show the Bootstrap spinner while loading is true
                            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
                                <div className="spinner-border text-success" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                            <div class="row">
                            {tomorrowEvents.length ? (
                            tomorrowEvents.map((event) => (
                                <div key={event.id} className="dash card col" style={{backgroundColor: event.color, margin: '10px', color: 'white', padding: '10px 20px 10px 0'}}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-9">
                                        <ul style={{listStyleType: 'none', marginTop: '12px'}}> 
                                            <li style={{fontSize: 'larger', fontWeight: 'bold'}}>{event.title}</li>
                                            <li> {event.description}</li>
                                            <li> {event.location}</li>
                                            <li><small>{moment(event.start).format('hh:mm a')}</small> - <small>{moment(event.end).format('hh:mm a')}</small></li>
                                            {moment().isBetween(moment(event.start), moment(event.end)) && (
                                            <li>
                                                <span className="badge bg-light" style={{ color: 'red', fontWeight: 'bold', fontSize: '15px' }}>ONGOING ​​​​
                                                <div className="spinner-border text-danger spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                                </span>
                                            </li>
                                            )}
                                        </ul>
                                        </div>
                                        <div className="col">
                                        <div className="card" style={{backgroundColor: 'rgb(0 0 0 / 20%)'}}>
                                            <div className="card-header" style={{fontSize: 'small', fontWeight: 'bold'}}>
                                                Participant/s
                                            </div>
                                            <ul className="list-unstyled pl-1" style={{listStyleType: 'none', margin: '5px'}}>
                                                {participant[event.id]?.map((participantName, index) => (
                                                <li key={index} className="list-group-item" style={{fontSize: 'small'}}>•ㅤ{participantName}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        </div>
                                    </div>
                                </div>           
                                </div>
                                
                            ))
                            ) : (
                                <div className="dash card col" style={{margin:'10px', color:'white', padding: '20px 20px 20px 0', backgroundColor: 'rgb(68, 66, 66)'}}>
                                    <div className="d-flex align-items-center justify-content-center" style={{fontSize: 'larger', fontWeight: 'bold'}}>No Event for Tommorow</div>
                                </div>
                            )}
                            </div>
                            </>
                        )}  
                        <div className="card-footer sticky-bottom" style={{backgroundColor: 'white'}}></div>
                    </div>
                </div>
            </div>

            <div className="col mb-3">  
                {/* Calendar div */}
                <div className="card mb-4">
                    <div className="card-body">
                        <MiniCalendar />
                    </div>
                </div>

                {/* Weather div */}
                <div className="card align-items-center mb-3" style={{padding: '20px'}}>
                <h3 style={{fontWeight: 'bold', color: '#7993A0'}}>Today's Weather</h3>
                    {Loading ? (
                        // Show the Bootstrap spinner while loading is true
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                    ) : (
                        // Render the content when loading is false
                        <>
                        <img src={weatherIcon} alt="weather icon" style={{width: '150px'}} />
                        <p><b>Location:</b> Pasig</p>
                        <p><b>Temperature:</b> {weatherData?.main?.temp}&deg;C</p>
                        <p><b>Humidity:</b> {weatherData?.main?.humidity}%</p>
                        <p><b>Weather Description:</b> <span>{weatherData?.weather?.[0]?.description}</span></p>
                        </>
                    )}
                
                </div>

            </div>
        </div>
    </div>
    )
}

export default Dashboard