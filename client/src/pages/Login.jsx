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

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full"> 
        
        <div className="rounded-2xl p-10" style={{ backgroundColor:'#0d3b12'}}>
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold text-white mb-1">Welcome to FeedbackHub! </h2>
            <p className="text-white text-sm opacity-90">Central hub for managing customer feedback and complaints- faster, smarter. </p>
          </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800 text-center">Sign in</h2>
          {error && (
            <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center"> 
            {error} </div>
          )}
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@feedbackhub.com"
                className="w-full border border-gray-300 rounder-lg px-3 py-2 focus:outline-none text-sm"
                onFocus={(e) => (e.target.style.borderColor='#0d3b12')}
                onBlur={(e) => (e.target.style.borderColor='#d1d5db')}
              ></input>
            </div>

            <div>
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounder-lg px-3 py-2 focus:outline-none text-sm"
                onFocus={(e) => (e.target.style.borderColor='#0d3b12')}
                onBlur={(e) => (e.target.style.borderColor='#d1d5db')}
              ></input>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 rounded border-gray-300 cursor-pointer"
                  style={{ accentColor:'0d3b12'}}
                ></input>
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm hover:underline"
                style={{ color:'0d3b12'}}
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white py-2 rounded-lg hover-opacity-90 transition-opacity font-medium mt-2"
              style={{ backgroundColor:'#0d3b12'}}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <p className="text-sm text-center text-gray-500 pt-2">
              No account?{''}
              <Link 
                to="/register" 
                className="font-medium hover:underline" 
                style={{ color:'#0d3b12'}}>
                   Create one free
                </Link>
            </p>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}
