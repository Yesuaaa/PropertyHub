import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold tracking-wide">
        Complaint System
      </Link>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-indigo-200">Hi, {user.name}</span>
        )}
        {user?.role === 'admin' && (
          <Link to="/admin" className="hover:text-indigo-200 text-sm">
            Admin
          </Link>
        )}
        {user && (
          <Link to="/my-tickets" className="hover:text-indigo-200 text-sm">
            My Tickets
          </Link>
        )}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded text-sm cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-indigo-700 hover:bg-indigo-800 px-3 py-1 rounded text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
