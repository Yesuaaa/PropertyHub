import { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../../services/authService';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');

  const resolvedStatus = useMemo(() => {
    if (!token) return 'error';
    return status;
  }, [token, status]);

  const resolvedError = useMemo(() => {
    if (!token) return 'Invalid or missing verification token.';
    return error;
  }, [token, error]);

  useEffect(() => {
    if (!token) return;

    (async () => {
      try {
        await verifyEmail(token);
        setStatus('success');
      } catch (err) {
        setStatus('error');
        setError(err.response?.data?.message || 'Verification failed');
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-6 sm:p-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Email Verification</span>
          </div>

          {resolvedStatus === 'loading' && (
            <>
              <div className="w-8 h-8 border-2 border-[#1a1a1a] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <p className="text-sm text-[#5a6d78]">Verifying your email...</p>
            </>
          )}

          {resolvedStatus === 'success' && (
            <>
              <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#f5f3ef]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 tracking-tight">Email verified!</h2>
              <p className="text-sm text-[#5a6d78] mb-8">Your account has been verified. You can now sign in.</p>
              <Link
                to="/login"
                className="inline-block text-[#f5f3ef] px-8 py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200"
              >
                Sign In
              </Link>
            </>
          )}

          {resolvedStatus === 'error' && (
            <>
              <div className="w-16 h-16 bg-[#e05a30]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#e05a30]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 tracking-tight">Verification failed</h2>
              <p className="text-sm text-[#5a6d78] mb-8">{resolvedError}</p>
              <Link
                to="/login"
                className="inline-block text-xs font-semibold tracking-wider uppercase text-[#1a1a1a] hover:text-[#5a6d78] transition-colors"
              >
                Back to sign in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
