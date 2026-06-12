import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );

      if (rememberMe) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringfy(data.user));
      } else {
        sessionStorage.setItem('token', data.token);
        sessionStrorage.setItem('user', JSON.stringify(data.user));
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200 placeholder:text-[#8fa3b0]/50";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Sign In</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1 tracking-tight">Welcome back</h2>
          <p className="text-sm text-[#5a6d78] mb-8">Enter your credentials to access PropertyHub.</p>

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
                placeholder="you@propertyhub.com"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 border-2 border-[#8fa3b0]/40 cursor-pointer"
                  style={{ accentColor: '#1a1a1a' }}
                />
                <span className="text-xs text-[#5a6d78]">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-[#8fa3b0] hover:text-[#1a1a1a] transition-colors tracking-wider uppercase"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-[#f5f3ef] py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 mt-2 cursor-pointer"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <p className="text-sm text-center text-[#5a6d78] pt-3">
              No account?{' '}
              <Link to="/register" className="font-semibold text-[#1a1a1a] hover:text-[#5a6d78] transition-colors tracking-wider uppercase text-xs">
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
