import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/axiosInstance';

const TYPE_CATEGORIES = {
  'Hardware Issue': ['PC / Computer', 'Peripherals', 'Gaming Console', 'Printer'],
  'Software Issue': ['PC / Computer', 'Account Login'],
  'Network Problem': ['Wi-Fi', 'LAN Connection', 'Slow Speed', 'Account Login'],
  'Billing Concern': ['Hourly Rate', 'Membership', 'Load / Top-up', 'Printing Charge'],
  'Safety Concern': ['Power Outage', 'Ventilation', 'Workstation Area'],
  'Cleanliness / Comfort': ['Restrooms', 'Workstation Area', 'Gaming Area', 'VIP / Premium Room'],
  'Noise / Disruption': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room'],
  'Gaming Area Concern': ['Gaming Console', 'Gaming Area', 'Peripherals'],
  'Workstation Concern': ['PC / Computer', 'Peripherals', 'Workstation Area', 'Printer'],
  'General Feedback': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room', 'Hourly Rate', 'Membership'],
  'Staff / Service': ['Workstation Area', 'Gaming Area', 'VIP / Premium Room', 'Hourly Rate']
};

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const effectiveFilterCategory = useMemo(() => {
    if (filterType && filterCategory && !TYPE_CATEGORIES[filterType]?.includes(filterCategory)) {
      return '';
    }
    return filterCategory;
  }, [filterType, filterCategory]);

  const allCategories = useMemo(() => {
    const seen = new Set();
    Object.values(TYPE_CATEGORIES).flat().forEach((c) => seen.add(c));
    return [...seen];
  }, []);

  const filteredCategories = useMemo(() => {
    if (!filterType) return allCategories;
    return TYPE_CATEGORIES[filterType] || [];
  }, [filterType, allCategories]);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get('/tickets');
      setTickets(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (filterType && t.type !== filterType) return false;
      if (effectiveFilterCategory && t.category !== effectiveFilterCategory) return false;
      return true;
    });
  }, [tickets, filterType, effectiveFilterCategory]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/tickets');
        if (!cancelled) setTickets(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load tickets');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return <p className="text-center pt-24 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0]">Loading...</p>;
  }

  if (error) {
    return <p className="text-center pt-24 text-red-600">{error}</p>;
  }

  return (
    <div className="pb-16">
      <PageBanner
        image="/hero-professional.jpg"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Dashboard', to: '/dashboard' }
        ]}
        title="My Requests"
        subtitle="View and track all your submitted complaints and feedback."
      />

      <div className="max-w-5xl mx-auto px-4 pt-8">

      <div className="flex flex-wrap items-end gap-4 mb-8">
        <div className="flex-1">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1.5">Filter by Type</label>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="border-2 border-[#8fa3b0]/25 bg-transparent text-sm text-[#1a1a1a] px-3 py-1.5 focus:outline-none focus:border-[#1a1a1a] cursor-pointer appearance-none font-mono text-xs tracking-wider uppercase">
                <option value="">All Types</option>
                {Object.keys(TYPE_CATEGORIES).map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1.5">Filter by Category</label>
              <select value={effectiveFilterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="border-2 border-[#8fa3b0]/25 bg-transparent text-sm text-[#1a1a1a] px-3 py-1.5 focus:outline-none focus:border-[#1a1a1a] cursor-pointer appearance-none font-mono text-xs tracking-wider uppercase">
                <option value="">All Categories</option>
                {filteredCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
              </select>
            </div>
          </div>
        </div>
        <Link
          to="/new"
          className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] border-2 border-[#1a1a1a] px-6 py-2.5 hover:bg-[#1a1a1a] hover:text-[#f5f3ef] transition-all duration-200"
        >
          New Request
        </Link>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="border-2 border-[#8fa3b0]/20 p-12 text-center">
          <p className="text-sm text-[#5a6d78]">{tickets.length === 0 ? 'No requests found.' : 'No requests match the current filters.'}</p>
        </div>
      ) : (
        <div className="border-2 border-[#1a1a1a] overflow-x-auto">
          <table className="w-full text-left min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-[#1a1a1a]">
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">ID</th>
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Type</th>
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Category</th>
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Priority</th>
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Status</th>
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Date</th>
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8fa3b0]/15">
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[#8fa3b0]/5 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono text-[#8fa3b0]">#{ticket.id}</td>
                  <td className="px-5 py-4 text-sm text-[#1a1a1a] font-medium">{ticket.type}</td>
                  <td className="px-5 py-4 text-sm text-[#5a6d78]">{ticket.category}</td>
                  <td className="px-5 py-4 text-sm text-[#5a6d78]">{ticket.priority}</td>
                  <td className="px-5 py-4 text-sm">
                    <span className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase text-[#5a6d78]">{ticket.status}</span>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#8fa3b0] font-mono">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] underline underline-offset-4 decoration-[#8fa3b0]/30 hover:decoration-[#1a1a1a] transition-colors"
                    >
                      View
                    </Link>
                  </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>
      )}
      </div>
    </div>
  );
}

function PageBanner({ image, breadcrumbs, title, subtitle }) {
  return (
    <div>
      <div className="relative h-56 md:h-64 overflow-hidden">
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1a1a1a]/60" />
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f5f3ef] tracking-tight">{title}</h1>
          <p className="text-sm text-[#8fa3b0] mt-2 max-w-lg">{subtitle}</p>
        </div>
      </div>
      <div className="bg-[#f5f3ef] border-b border-[#8fa3b0]/20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 md:px-16 py-3">
          <nav className="flex items-center gap-2">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 text-[#8fa3b0]">
                    <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L8.94 8 6.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                )}
                {crumb.to ? (
                  <Link to={crumb.to} className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#8fa3b0] hover:text-[#1a1a1a] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[10px] font-mono tracking-[0.15em] uppercase text-[#1a1a1a] font-semibold">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
