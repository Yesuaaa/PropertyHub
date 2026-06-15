import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await login(email, password);

      if (user.role !== 'admin' && user.role !== 'staff' && user.role !== 'superadmin') {
        setError('Access denied. Admin or staff credentials required.');
        setLoading(false);
        return;
      }

      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#e05a30] transition-colors duration-200 placeholder:text-[#8fa3b0]/50";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-10 relative">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Admin / Staff Portal</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1 tracking-tight">Staff Sign In</h2>
          <p className="text-sm text-[#5a6d78] mb-8">Enter your credentials to access the admin dashboard.</p>

          {error && (
            <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
              <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
              <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@propertyhub.com"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-[#f5f3ef] py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#e05a30] border-2 border-[#e05a30] hover:bg-[#c44a25] hover:border-[#c44a25] transition-all duration-200 mt-2 cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="pt-4 border-t-2 border-[#8fa3b0]/15">
              <p className="text-sm text-center text-[#5a6d78]">
                Looking for the user login?{' '}
                <Link to="/login" className="font-semibold text-[#1a1a1a] hover:text-[#5a6d78] transition-colors tracking-wider uppercase text-xs">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
