import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; // Cần cài: npm install react-firebase-hooks

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  
  // Thay email của bạn vào đây
  const adminEmails = ['netnobaka@gmail.com']; 

  if (loading) return <div>Đang kiểm tra quyền truy cập...</div>;

  if (!user || !adminEmails.includes(user.email)) {
    alert("Chỉ Admin mới có quyền vào đây!");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;