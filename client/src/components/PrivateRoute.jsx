import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children, adminOnly }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    if (adminOnly) {
      return <Navigate to="/admin/login" />;
    }
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== 'admin' && user.role !== 'staff') {
    return <Navigate to="/" />;
  }

  return children;
}
