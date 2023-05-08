import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';


import Login from './component/Login';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';
import Timetable from './component/Timetable';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/timetable" element={<Timetable/>} />
      </Routes>     
    </BrowserRouter>
  );
}

export default App;