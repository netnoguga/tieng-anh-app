import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute'; // Phải có dòng này!
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);
  const login = () => signInWithPopup(auth, googleProvider);

  return (
    <Router>
      <nav style={{ padding: '15px', background: '#333', color: 'white', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/" style={{color: 'white', textDecoration: 'none'}}>Trang Chủ</Link>
        <Link to="/admin" style={{color: 'white', textDecoration: 'none'}}>Admin</Link>
        {user ? <button onClick={() => signOut(auth)}>Thoát</button> : <button onClick={login}>Login Admin</button>}
      </nav>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;