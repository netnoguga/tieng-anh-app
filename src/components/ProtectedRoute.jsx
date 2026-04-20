// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { auth } from '../firebase'; // Đảm bảo bạn đã export auth từ file firebase.js

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser;
  
  // Danh sách email được phép truy cập
  const adminEmails = ['netnobaka@gmail.com', 'nguoiban@gmail.com'];

  if (!user || !adminEmails.includes(user.email)) {
    // Nếu không phải admin, đá về trang chủ hoặc trang login
    alert("Bạn không có quyền truy cập vùng này!");
    return <Navigate to="/" />;
  }

  return children;
};