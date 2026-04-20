import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px', background: '#282c34', color: 'white', display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Trang Chủ (Thi)</Link>
        <Link to="/admin" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Quản Trị (Admin)</Link>
      </nav>

      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;