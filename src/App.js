import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SlotManager from './components/SlotManager';
import CalendarView from './components/CalendarView';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';
import ConfirmBooking from './components/ConfirmBooking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/slot" element={<SlotManager />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/confirm-booking" element={<ConfirmBooking />} />
      </Routes>
      </Router>
  );
}

export default App;
