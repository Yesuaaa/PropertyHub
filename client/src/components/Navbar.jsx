import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const textColor = scrolled ? 'text-white' : 'text-green-700';
  const borderColor = scrolled ? 'border-white/40' : 'border-green-700/40';
  const hoverBg = scrolled ? 'hover:bg-white/10' : 'hover:bg-green-700/10';

  const closeMenu = () => setMenuOpen(false);

  const mobileMenuBg = scrolled ? 'bg-green-600' : 'bg-green-600';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled || menuOpen ? 'bg-green-600' : 'bg-transparent'}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 sm:px-8 py-0 h-20">
        <div className="flex items-center gap-10">
          <Link to="/" className={`flex items-center gap-2 no-underline ${textColor}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
            </svg>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            <NavLink to="/" scrolled={scrolled}>Home</NavLink>
            <NavLink to="/new" scrolled={scrolled}>Submit A Ticket</NavLink>
            <NavLink to="/dashboard" scrolled={scrolled}>My Tickets</NavLink>
            {user?.role === 'admin' && <NavLink to="/admin" scrolled={scrolled}>Admin</NavLink>}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className={`hidden sm:inline text-sm font-medium ${scrolled ? 'text-green-200' : 'text-green-500'}`}>
              {user.name}
            </span>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className={`hidden sm:block text-sm font-bold uppercase tracking-wider ${textColor} border ${borderColor} px-5 py-2 ${hoverBg} transition-colors cursor-pointer bg-transparent`}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`hidden sm:inline-flex text-sm font-bold uppercase tracking-wider ${textColor} border ${borderColor} px-5 py-2 ${hoverBg} transition-colors`}
            >
              Login
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer bg-transparent border-none ${textColor}`}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 ${scrolled || menuOpen ? 'bg-white' : 'bg-green-700'} transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 ${scrolled || menuOpen ? 'bg-white' : 'bg-green-700'} transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 ${scrolled || menuOpen ? 'bg-white' : 'bg-green-700'} transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 top-20 ${mobileMenuBg} transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-start gap-2 pt-12">
          <MobileNavLink to="/" scrolled={scrolled} onClick={closeMenu}>Home</MobileNavLink>
          <MobileNavLink to="/new" scrolled={scrolled} onClick={closeMenu}>Submit A Ticket</MobileNavLink>
          <MobileNavLink to="/dashboard" scrolled={scrolled} onClick={closeMenu}>My Tickets</MobileNavLink>
          {user?.role === 'admin' && <MobileNavLink to="/admin" scrolled={scrolled} onClick={closeMenu}>Admin</MobileNavLink>}
          <div className={`w-24 h-px ${scrolled ? 'bg-white/20' : 'bg-green-700/20'} my-4`} />
          {user && (
            <span className="text-sm text-green-200 font-medium mb-2">{user.name}</span>
          )}
          {user ? (
            <button
              onClick={() => { handleLogout(); closeMenu(); }}
              className="text-sm font-bold uppercase tracking-wider text-white border border-white/40 px-8 py-3 hover:bg-white/10 transition-colors cursor-pointer bg-transparent"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-sm font-bold uppercase tracking-wider text-white border border-white/40 px-8 py-3 hover:bg-white/10 transition-colors"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, scrolled }) {
  const textColor = scrolled ? 'text-white/80' : 'text-green-700/80';
  const hoverColor = scrolled ? 'hover:text-white' : 'hover:text-green-700';
  const indicatorColor = scrolled ? 'after:bg-white' : 'after:bg-green-700';

  return (
    <Link
      to={to}
      className={`relative text-sm font-medium ${textColor} px-4 py-5 ${hoverColor} transition-colors after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 ${indicatorColor} after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center`}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, scrolled, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-white text-lg font-semibold px-8 py-3 hover:bg-white/10 transition-colors rounded-lg"
    >
      {children}
    </Link>
  );
}
