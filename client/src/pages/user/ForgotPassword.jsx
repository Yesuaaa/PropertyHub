import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200 placeholder:text-[#8fa3b0]/50";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Reset Password</span>
          </div>

          {!success ? (
            <>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1 tracking-tight">Forgot your password?</h2>
              <p className="text-sm text-[#5a6d78] mb-8">Enter your email and we&apos;ll send you a reset code.</p>

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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full text-[#f5f3ef] py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 mt-2 cursor-pointer"
                >
                  {loading ? 'Sending...' : 'Send Reset Code'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#f5f3ef]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 tracking-tight">Code sent!</h2>
              <p className="text-sm text-[#5a6d78] mb-8">If that email exists, we have sent a reset code.</p>
              <Link
                to={`/reset-password?email=${encodeURIComponent(email)}`}
                className="inline-block text-[#f5f3ef] px-8 py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200"
              >
                Enter Code
              </Link>
            </div>
          )}

          <p className="text-sm text-center text-[#5a6d78] pt-6">
            Remember your password?{' '}
            <Link to="/login" className="font-semibold text-[#1a1a1a] hover:text-[#5a6d78] transition-colors tracking-wider uppercase text-xs">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
