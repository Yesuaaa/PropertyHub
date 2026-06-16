import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  let user = null;
  try { user = JSON.parse(localStorage.getItem('user') || 'null'); } catch {}
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

  const closeMenu = () => setMenuOpen(false);
  const resolveLink = (to) => (user ? to : '/login');

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled || menuOpen ? 'bg-[#f5f3ef]/95 backdrop-blur-sm border-b border-[#8fa3b0]/20' : 'bg-[#f5f3ef]'}`}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 sm:px-10 py-0 h-16">
        <div className="flex items-center gap-10">
          <Link to="/" className="flex items-center gap-3 no-underline">
            <div className="w-7 h-7 border-2 border-[#1a1a1a] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5 text-[#1a1a1a]">
                <path fillRule="evenodd" d="M8 1.75a.75.75 0 01.75.75v5.25h4.25a.75.75 0 010 1.5H8.75V13a.75.75 0 01-1.5 0V9H3.25a.75.75 0 010-1.5H7.25V2.5A.75.75 0 018 1.75z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-[#1a1a1a] font-bold text-sm tracking-[0.08em] uppercase">
              Property Hub
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to={resolveLink('/new')}>Submit Request</NavLink>
            <NavLink to={resolveLink('/dashboard')}>Dashboard</NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <span className="hidden sm:inline text-xs font-mono text-[#8fa3b0] tracking-wider uppercase">{user.name}</span>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="hidden sm:block text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] border border-[#1a1a1a] px-5 py-2 hover:bg-[#1a1a1a] hover:text-[#f5f3ef] transition-all duration-200 cursor-pointer bg-transparent"
            >
              Logout
            </button>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs font-medium text-[#5a6d78] hover:text-[#1a1a1a] transition-colors tracking-wider uppercase"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] border border-[#1a1a1a] px-5 py-2 hover:bg-[#1a1a1a] hover:text-[#f5f3ef] transition-all duration-200"
              >
                Get Started
              </Link>
            </div>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] cursor-pointer bg-transparent border-none"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-[#1a1a1a] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </button>
        </div>
      </div>

      <div className={`lg:hidden fixed inset-0 top-16 bg-[#f5f3ef] transition-all duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-start gap-2 pt-12">
          <MobileNavLink to="/" onClick={closeMenu}>Home</MobileNavLink>
          <MobileNavLink to={resolveLink('/new')} onClick={closeMenu}>Submit Request</MobileNavLink>
          <MobileNavLink to={resolveLink('/dashboard')} onClick={closeMenu}>My Requests</MobileNavLink>
          <div className="w-12 h-px bg-[#8fa3b0]/40 my-6" />
          {user && <span className="text-xs font-mono text-[#8fa3b0] tracking-wider uppercase mb-3">{user.name}</span>}
          {user ? (
            <button
              onClick={() => { handleLogout(); closeMenu(); }}
              className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] border border-[#1a1a1a] px-10 py-3 hover:bg-[#1a1a1a] hover:text-[#f5f3ef] transition-all duration-200 cursor-pointer bg-transparent"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] border border-[#1a1a1a] px-10 py-3 hover:bg-[#1a1a1a] hover:text-[#f5f3ef] transition-all duration-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="relative text-xs font-semibold tracking-[0.1em] uppercase text-[#5a6d78] hover:text-[#1a1a1a] transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#e05a30] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-[#1a1a1a] text-base font-semibold tracking-[0.05em] uppercase px-10 py-3 hover:text-[#5a6d78] transition-colors duration-200"
    >
      {children}
    </Link>
  );
}
