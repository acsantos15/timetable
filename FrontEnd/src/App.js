import './App.css';
import { BrowserRouter, Routers, Route, Routes} from 'react-router-dom';


import Login from './component/Login';
import Signup from './component/Signup';
import Dashboard from './component/Dashboard';
import Try from './component/Try';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/try" element={<Try/>} />
      </Routes>     
    </BrowserRouter>
  );
}

export default App;
