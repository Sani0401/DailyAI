import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './pages/Admin';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
