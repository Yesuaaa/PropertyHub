import { useState, useEffect } from 'react';
import axios from 'axios';

const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map database status (lowercase) to display status (capitalized)
  const statusDisplay = {
    'open': 'Open',
    'in_progress': 'In Progress',
    'resolved': 'Resolved',
    'closed': 'Closed'
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/tickets`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      // Create a new array reference to force re‑render
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
      // Refresh the list after update
      await fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center pt-24 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0]">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto pt-24 pb-16 px-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2 h-2 bg-[#e05a30]" />
        <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Administration</span>
      </div>
      <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 tracking-tight">Property Management Dashboard</h2>

      {tickets.length === 0 ? (
        <div className="border-2 border-[#8fa3b0]/20 p-12 text-center">
          <p className="text-sm text-[#5a6d78]">No requests found.</p>
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
               </tr>
            </thead>
            <tbody className="divide-y divide-[#8fa3b0]/15">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-[#8fa3b0]/5 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono text-[#8fa3b0]">#{ticket.id}</td>
                  <td className="px-5 py-4 text-sm text-[#1a1a1a] font-medium">{ticket.user_name}</td>
                  <td className="px-5 py-4 text-sm text-[#5a6d78]">{ticket.type}</td>
                  <td className="px-5 py-4 text-sm text-[#5a6d78]">{ticket.category}</td>
                  <td className="px-5 py-4 text-sm text-[#5a6d78]">{ticket.priority}</td>
                  <td className="px-5 py-4">
                    <select
                      // Map the stored lowercase status to display value
                      value={statusDisplay[ticket.status] || ticket.status}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      className="border-2 border-[#8fa3b0]/25 bg-transparent text-sm text-[#1a1a1a] px-3 py-1.5 focus:outline-none focus:border-[#1a1a1a] cursor-pointer appearance-none font-mono text-xs tracking-wider uppercase"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-xs text-[#8fa3b0] font-mono">
                    {new Date(ticket.created_at).toLocaleDateString()}
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