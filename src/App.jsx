import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

function App() {
  const [user] = useAuthState(auth);

  const login = () => signInWithPopup(auth, googleProvider);
  const logout = () => signOut(auth);

  return (
    <Router>
      <nav style={navStyle}>
        <Link to="/" style={linkStyle}>Làm Bài Thi</Link>
        <Link to="/admin" style={linkStyle}>Quản Trị</Link>
        {user ? (
          <button onClick={logout} style={authBtn}>Đăng xuất ({user.displayName})</button>
        ) : (
          <button onClick={login} style={authBtn}>Đăng nhập Admin</button>
        )}
      </nav>

      <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

const navStyle = { padding: '15px', background: '#222', display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center' };
const linkStyle = { color: '#00d4ff', textDecoration: 'none', fontWeight: 'bold' };
const authBtn = { padding: '5px 10px', cursor: 'pointer', borderRadius: '5px', border: 'none' };

export default App;