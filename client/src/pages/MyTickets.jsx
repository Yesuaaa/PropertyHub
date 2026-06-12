import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center pt-24 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0]">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto pt-24 pb-16 px-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2 h-2 bg-[#e05a30]" />
        <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Dashboard</span>
      </div>

      <div className="flex justify-between items-end mb-8">
        <h2 className="text-3xl font-bold text-[#1a1a1a] tracking-tight">My Requests</h2>
        <Link
          to="/new"
          className="text-xs font-semibold tracking-[0.1em] uppercase text-[#1a1a1a] border-2 border-[#1a1a1a] px-6 py-2.5 hover:bg-[#1a1a1a] hover:text-[#f5f3ef] transition-all duration-200"
        >
          New Request
        </Link>
      </div>

      {tickets.length === 0 ? (
        <div className="border-2 border-[#8fa3b0]/20 p-12 text-center">
          <p className="text-sm text-[#5a6d78]">No requests found.</p>
        </div>
      ) : (
        <div className="border-2 border-[#1a1a1a] overflow-hidden">
          <table className="w-full text-left">
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
              {tickets.map((ticket) => (
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
  );
}
