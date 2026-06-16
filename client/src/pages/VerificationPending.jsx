import { Link } from 'react-router-dom';

export default function VerificationPending({ email }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Verify Your Email</span>
          </div>

          <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-[#f5f3ef]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-2 tracking-tight">Check your email</h2>
          <p className="text-sm text-[#5a6d78] mb-2">
            We've sent a verification code to:
          </p>
          <p className="text-sm font-semibold text-[#1a1a1a] mb-8 break-all">{email}</p>
          <p className="text-xs text-[#8fa3b0] mb-8">
            The code expires in 10 minutes. Didn't receive it? Check your spam folder.
          </p>

          <Link
            to={`/verify-otp?email=${encodeURIComponent(email)}`}
            className="inline-block text-[#f5f3ef] px-8 py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200"
          >
            Enter Verification Code
          </Link>
        </div>
      </div>
    </div>
  );
}
