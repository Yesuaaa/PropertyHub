import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-6xl w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0 rounded-lg overflow-hidden shadow-lg">
          <div className="md:col-span-2 text-left p-8 flex flex-col justify-start" style={{ backgroundColor: '#0d3b12' }}>
            <h1 className="text-2xl font-bold text-white mb-4">FeedbackHub</h1>
            <h5 className="text-l font-bold text-white mb-4">Hey! Let's get your account set up. It only takes a minute!</h5>
            <div className="space-y-2 text-white text-sm opacity-90">
              <p>✓ Track all your tickets in one place</p>
              <p>✓ Get notified when agents reply</p>
              <p>✓ Review your complaint history</p>
              <p>✓ Rate and close resolved history</p>
              <p>✓ Free for all users</p>
            </div>
          </div>
          
          <div className="md:col-span-3 bg-white p-8">
            <h2 className="text-2xl font-bold mb-2 text-left text-gray-900">Create your Account</h2>
            <p className="text-sm text-gray-600 mb-6 text-left">Already have an account?{''} 
              <Link to="/login" className="text-medium hover:underline" style={{ color: '#0d3b12' }}> Sign in</Link>
            </p>
            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">{error}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4"> 
              <div className="flex gap-4">
                <div className="flex-1">

                  <label className="block text-gray-700 text-sm mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    onFocus={(e) => (e.target.style.borderColor = '#0d3b12')}
                    onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                  />  
                </div>
                <div className="flex-1"> 
                  <label className="block text-gray-700 text-sm mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    onFocus={(e) => (e.target.style.borderColor = '#0d3b12')}
                    onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                  />
                </div>
              </div>

                <div>
                  <label className="block text-gray-700 text-sm mb-1">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="user@feedbackhub.com"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                    onFocus={(e) => (e.target.style.borderColor = '#0d3b12')}
                    onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                  />
                </div>

                <div className="flex gap-4"> 
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                      onFocus={(e) => (e.target.style.borderColor = '#0d3b12')}
                      onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 text-sm mb-1">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-green-500"
                      onFocus={(e) => (e.target.style.borderColor = '#0d3b12')}
                      onBlur={(e) => (e.target.style.borderColor = '#d1d5db')}
                    />
                  </div>  
                </div>

                <div className="flex items-start">
                  <input 
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-1 mr-2"
                    style={{ accentColor: '#0d3b12'}}
                  />
                  <label className="text-sm text-gray-600">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white py-2 rounded-md hover:opacity-90 transition-opcaity font-medium mt-6"
                  style={{ backgroundColor: '#0d3b12'}}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
            </form>
          </div>
        </div>
      </div>
    </div> 
  );
};
