import { useState } from 'react';
import './App.css';
import Login from './components/login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPanel from './components/adminPanel';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/panel" element={<AdminPanel/>} />
      </Routes>
    </Router>
  );
}

export default App
