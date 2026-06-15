import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TYPE_CATEGORIES = {
  'Maintenance Request': ['Plumbing', 'Electrical', 'HVAC', 'Structural', 'Pest Control', 'Common Areas', 'Parking'],
  'Noise Complaint': ['Common Areas', 'Parking', 'Security & Safety'],
  'Lease Dispute': ['Lease & Billing'],
  'Billing / Payment Concern': ['Lease & Billing'],
  'Safety Concern': ['Electrical', 'Structural', 'Common Areas', 'Parking', 'Security & Safety'],
  'Cleanliness / Sanitation': ['Pest Control', 'Common Areas', 'Parking'],
  'Parking Concern': ['Parking', 'Security & Safety'],
  'Amenity / Facility Concern': ['Electrical', 'HVAC', 'Structural', 'Common Areas', 'Security & Safety'],
  'Neighbor Complaint': ['Common Areas', 'Parking', 'Security & Safety'],
  'General Feedback': ['Common Areas', 'Parking', 'Lease & Billing', 'Security & Safety'],
  'Behavior': ['Common Areas', 'Parking', 'Security & Safety']
};

const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

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

  useEffect(() => {
    if (filterType && filterCategory && !TYPE_CATEGORIES[filterType]?.includes(filterCategory)) {
      setFilterCategory('');
    }
  }, [filterType, filterCategory]);

  const filteredTickets = useMemo(() => {
    return tickets.filter((t) => {
      if (filterType && t.type !== filterType) return false;
      if (filterCategory && t.category !== filterCategory) return false;
      return true;
    });
  }, [tickets, filterType, filterCategory]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/tickets`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTickets([...data]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/tickets/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      await fetchTickets();
    } catch (err) {
      console.error(err);
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
      <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6 tracking-tight">Property Management Dashboard</h2>

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
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className={selectClass}>
            <option value="">All Categories</option>
            {filteredCategories.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="border-2 border-[#8fa3b0]/20 p-12 text-center">
          <p className="text-sm text-[#5a6d78]">{tickets.length === 0 ? 'No requests found.' : 'No requests match the current filters.'}</p>
        </div>
      ) : (
        <div className="border-2 border-[#1a1a1a] overflow-x-auto">
          <table className="w-full text-left">
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
                    {new Date(ticket.created_at).toLocaleDateString()}
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
