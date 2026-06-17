import { useState, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { verifyOTP, resendOTP } from '../../services/authService';

export default function VerifyOtp() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    pasted.split('').forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextEmpty = newOtp.findIndex(v => !v);
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
  };

  const code = otp.join('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await verifyOTP(email, code);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setResendMessage('');
    try {
      await resendOTP(email);
      setResendMessage('A new code has been sent to your phone.');
    } catch (err) {
      setResendMessage(err.response?.data?.message || 'Failed to resend code');
    } finally {
      setResendLoading(false);
    }
  };

  const inputClass = "w-12 h-14 border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] text-center text-xl font-mono focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Verify Phone</span>
          </div>

          {success ? (
            <>
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-[#f5f3ef]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 tracking-tight">Verified!</h2>
                <p className="text-sm text-[#5a6d78] mb-8">Your email has been verified. You can now sign in.</p>
                <Link
                  to="/login"
                  className="inline-block text-[#f5f3ef] px-8 py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200"
                >
                  Sign In
                </Link>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1 tracking-tight">Enter verification code</h2>
              <p className="text-sm text-[#5a6d78] mb-8">We sent a 6-digit code to your email.</p>

              {error && (
                <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
                  <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
                  <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center gap-3" onPaste={handlePaste}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => inputRefs.current[i] = el}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleChange(i, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(i, e)}
                      required
                      className={inputClass}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || code.length !== 6}
                  className="w-full text-[#f5f3ef] py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>
              </form>

              <div className="text-center pt-6">
                <button
                  onClick={handleResend}
                  disabled={resendLoading}
                  className="text-xs font-semibold tracking-wider uppercase text-[#8fa3b0] hover:text-[#1a1a1a] transition-colors cursor-pointer disabled:opacity-50"
                >
                  {resendLoading ? 'Sending...' : 'Resend code'}
                </button>
                {resendMessage && <p className="text-xs text-[#5a6d78] mt-2">{resendMessage}</p>}
              </div>
            </>
          )}

          <p className="text-sm text-center text-[#5a6d78] pt-6">
            <Link to="/login" className="font-semibold text-[#1a1a1a] hover:text-[#5a6d78] transition-colors tracking-wider uppercase text-xs">
              Back to sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
