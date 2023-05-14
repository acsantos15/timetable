import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';


import Login from './page/Login';
import Signup from './page/Signup';
import Dashboard from './page/Dashboard';
import Timetable from './page/Timetable';
import Profile from './page/Profile';
import EditProfile from './page/EditProfile';
import Search from './page/Search';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/timetable" element={<Timetable/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/editprofile" element={<EditProfile/>} />
        <Route path="/search" element={<Search/>} />
      </Routes>     
    </BrowserRouter>
  );
}

export default App;