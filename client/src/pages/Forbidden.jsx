import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Forbidden() {
  const { user } = useAuth();
  const home = user?.role === 'admin' || user?.role === 'staff' || user?.role === 'superadmin' ? '/admin' : '/';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="max-w-lg w-full border-2 border-[#1a1a1a] bg-[#f5f3ef] p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 border-2 border-[#e05a30] text-[#e05a30] mb-5 font-mono font-bold">
          403
        </div>
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-2">Access forbidden</h1>
        <p className="text-sm text-[#5a6d78] mb-7">
          Your current account does not have permission to open this page.
        </p>
        <Link
          to={home}
          className="inline-flex items-center justify-center text-xs font-semibold tracking-[0.1em] uppercase text-[#f5f3ef] bg-[#1a1a1a] border-2 border-[#1a1a1a] px-6 py-3 hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}
