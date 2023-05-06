import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Try() {
    const [events, setEvents] = useState([]);
  
    useEffect(() => {
      axios.get('/events')
        .then(response => setEvents(response.data))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.title}</li>
        ))}
      </ul>
    );
  }

export default Try