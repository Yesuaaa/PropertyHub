import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children, adminOnly, superAdminOnly }) {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!user) {
    if (superAdminOnly || adminOnly) {
      return <Navigate to="/admin/login" />;
    }
    return <Navigate to="/login" />;
  }

  if (superAdminOnly && user.role !== 'superadmin') {
    return <Navigate to="/admin" />;
  }

  if (adminOnly && user.role !== 'admin' && user.role !== 'staff' && user.role !== 'superadmin') {
    return <Navigate to="/" />;
  }

  return children;
}
