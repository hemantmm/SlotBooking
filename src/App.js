import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SlotManager from './components/SlotManager';
import CalendarView from './components/CalendarView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SlotManager />} />
        <Route path="/calendar" element={<CalendarView />} />
      </Routes>
      </Router>
  );
}

export default App;
