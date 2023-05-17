import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Login from './page/Login';
import Signup from './page/Signup';
import Dashboard from './page/Dashboard';
import Timetable from './page/Timetable';
import Profile from './page/Profile';
import EditProfile from './page/EditProfile';
import Search from './page/Search';
import NotFound from './page/NotFound';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('/checkSession', { withCredentials: true })
      .then(response => {
        if (response.data.status === 'success') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch(error => {
        console.log(error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    // Render a loading screen
    return <div>Loading...</div>;
  } else {
    // Render the dashboard or login page depending on the authentication status
    return (
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/timetable" element={<Timetable />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/login" element={<Navigate to="/dashboard" />} />
              <Route path="/signup" element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Navigate to="/login" replace />} />
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}

              <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
