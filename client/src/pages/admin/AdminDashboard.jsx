import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/axiosInstance';
import { useNotifications } from '../../context/NotificationContext';

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

const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' }
];

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const { toast } = useNotifications();

  const effectiveFilterCategory = useMemo(() => {
    if (filterType && filterCategory && !TYPE_CATEGORIES[filterType]?.includes(filterCategory)) {
      return '';
    }
    return filterCategory;
  }, [filterType, filterCategory]);

  const statusDisplay = {
    'open': 'Open',
    'in_progress': 'In Progress',
    'resolved': 'Resolved',
    'closed': 'Closed'
  };

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
      const { data } = await api.get('/admin/tickets');
      setTickets([...data]);
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
      if (filterPriority && t.priority !== filterPriority) return false;
      return true;
    });
  }, [tickets, filterType, effectiveFilterCategory, filterPriority]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get('/admin/tickets');
        if (!cancelled) setTickets([...data]);
      } catch (err) {
        console.error(err);
        if (!cancelled) setError(err.response?.data?.message || 'Failed to load tickets');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      if (!window.confirm(`Change ticket #${id} to ${status}?`)) return;
      await api.put(`/admin/tickets/${id}/status`, { status });
      await fetchTickets();
      toast(`Ticket #${id} marked as ${status}.`, 'success');
    } catch (err) {
      console.error(err);
      toast(err.response?.data?.message || 'Failed to update status.', 'error');
    }
  };

  const selectClass = "border-2 border-[#8fa3b0]/25 bg-transparent text-sm text-[#1a1a1a] px-3 py-1.5 focus:outline-none focus:border-[#1a1a1a] cursor-pointer appearance-none font-mono text-xs tracking-wider uppercase";

  if (loading) {
    return <p className="text-center pt-24 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0]">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto pt-24 pb-16 px-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2 h-2 bg-[#e05a30]" />
        <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Administration</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a1a] mb-6 tracking-tight">Internet Cafe Dashboard</h2>

      {error && (
        <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
          <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
          <button onClick={() => setError('')} className="mt-2 text-xs text-[#e05a30] underline cursor-pointer">Dismiss</button>
        </div>
      )}

      <div className="flex flex-wrap items-end gap-4 mb-8">
        <div>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1.5">Filter by Type</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className={selectClass}>
            <option value="">All Types</option>
            {Object.keys(TYPE_CATEGORIES).map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1.5">Filter by Category</label>
          <select value={effectiveFilterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={selectClass}>
            <option value="">All Categories</option>
            {filteredCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1.5">Filter by Priority</label>
          <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} className={selectClass}>
            <option value="">All Priorities</option>
            {PRIORITIES.map((p) => (<option key={p.value} value={p.value}>{p.label}</option>))}
          </select>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="border-2 border-[#8fa3b0]/20 p-12 text-center">
          <p className="text-sm text-[#5a6d78]">{tickets.length === 0 ? 'No requests found.' : 'No requests match the current filters.'}</p>
        </div>
      ) : (
        <div className="border-2 border-[#1a1a1a] overflow-x-auto">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b-2 border-[#1a1a1a]">
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">ID</th>
                <th className="px-5 py-3 text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">User</th>
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
                  <td className="px-5 py-4 text-sm text-[#1a1a1a] font-medium">{ticket.user_name}</td>
                  <td className="px-5 py-4 text-sm text-[#5a6d78]">{ticket.type}</td>
                  <td className="px-5 py-4 text-sm text-[#5a6d78]">{ticket.category}</td>
                  <td className="px-5 py-4 text-sm text-[#5a6d78]">{ticket.priority}</td>
                  <td className="px-5 py-4">
                    <select
                      value={statusDisplay[ticket.status] || ticket.status}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      className={selectClass}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#8fa3b0] font-mono">
                    {new Date(ticket.created_at).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to={`/admin/tickets/${ticket.id}`}
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
  );
}
