import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PasswordInput from '../../components/PasswordInput';
import { validateRegistration, passwordStrength, cleanText } from '../../utils/validation';

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const strength = passwordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateRegistration({ firstName, lastName, email, password, confirmPassword, agreeTerms });
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      await register({
        first_name: cleanText(firstName),
        last_name: cleanText(lastName),
        email: cleanText(email).toLowerCase(),
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200 placeholder:text-[#8fa3b0]/50";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-xl w-full">
        <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Create Account</span>
          </div>
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1 tracking-tight">Get started</h2>
          <p className="text-sm text-[#5a6d78] mb-8">Create an account to submit and track your requests.</p>

          {error && (
            <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
              <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
              <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={60}
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={60}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@propertyhub.com"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PasswordInput
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <PasswordInput
                label="Confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#8fa3b0]">Password strength</span>
                <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#5a6d78]">{strength.label}</span>
              </div>
              <div className="h-2 border border-[#8fa3b0]/25 bg-transparent">
                <div className="h-full bg-[#1a1a1a] transition-all duration-200" style={{ width: strength.width }} />
              </div>
              <p className="text-[11px] text-[#5a6d78] mt-2">Use uppercase, lowercase, number, and special character.</p>
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 border-2 border-[#8fa3b0]/40 cursor-pointer"
                style={{ accentColor: '#1a1a1a' }}
              />
              <label className="text-xs text-[#5a6d78] leading-relaxed">
                I agree to the{' '}
                <Link to="/terms" className="font-semibold text-[#1a1a1a] hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="font-semibold text-[#1a1a1a] hover:underline">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-[#f5f3ef] py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
            <p className="text-sm text-[#5a6d78] mb-8">Already have an account?{' '}
              <Link to="/login" className="font-semibold text-[#1a1a1a] hover:text-[#5a6d78] transition-colors tracking-wider uppercase text-xs">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
