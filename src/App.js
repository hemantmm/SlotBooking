import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import SlotManager from './components/SlotManager';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SlotManager />} />
      </Routes>
      </Router>
  );
}

export default App;
