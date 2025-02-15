import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SlotManager from './components/SlotManager';
import CalendarView from './components/CalendarView';
import LoginPage from './components/LoginPage';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/slot" element={<SlotManager />} />
        <Route path="/calendar" element={<CalendarView />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
      </Router>
  );
}

export default App;
