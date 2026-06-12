import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children, adminOnly }) {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (!token) {
    if (adminOnly) {
      return <Navigate to="/admin/login" />;
    }
    return <Navigate to="/login" />;
  }

  if (adminOnly && user?.role !== 'admin' && user?.role !== 'staff') {
    return <Navigate to="/" />;
  }

  return children;
}
