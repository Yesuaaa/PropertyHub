import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children, adminOnly, superAdminOnly }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <p className="text-center pt-24 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0]">
        Checking access...
      </p>
    );
  }

  if (!user) {
    if (superAdminOnly || adminOnly) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (superAdminOnly && user.role !== 'superadmin') {
    return <Navigate to="/403" replace />;
  }

  if (adminOnly && user.role !== 'admin' && user.role !== 'staff' && user.role !== 'superadmin') {
    return <Navigate to="/403" replace />;
  }

  return children;
}
