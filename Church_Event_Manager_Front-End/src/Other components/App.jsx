import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Welcome from '../Pages/Welcome';
import Login from '../Pages/Login';
import Register from '../Pages/Reg';
import EventList1 from '../Pages/EventList1';
import EventList2 from '../Pages/EventList2';
import Attendance from '../Pages/Attendance';
import Users from '../Pages/Users';
import '../CSS/App.css'

function App(){
  return(
    <div>
          <Router>
            <Routes>
              <Route path="/" element={<Welcome/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/admin" element={<EventList1/>}/>
              <Route path="/congregant" element={<EventList2/>}/>
              <Route path="/attendance" element={<Attendance/>}/>
              <Route path="/users" element={<Users/>}/>
            </Routes>
          </Router>
    </div>
  );
}
export default App;