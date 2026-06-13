import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/tickets/${id}`,
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        setTicket(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) {
    return <p className="text-center pt-24 text-[10px] font-mono tracking-[0.2em] uppercase text-[#8fa3b0]">Loading...</p>;
  }

  if (!ticket) {
    return <p className="text-center pt-24 text-sm text-[#5a6d78]">Request not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto pt-24 pb-16 px-4">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-[#8fa3b0] hover:text-[#1a1a1a] transition-colors mb-8"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path fillRule="evenodd" d="M7.25 2.75a.75.75 0 10-1.5 0v7.69L3.03 7.22a.75.75 0 00-1.06 1.06l4.25 4.25a.75.75 0 001.06 0l4.25-4.25a.75.75 0 00-1.06-1.06L8.75 10.44V2.75z" clipRule="evenodd" />
        </svg>
        Back to requests
      </Link>

      <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-8">
        <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-[#8fa3b0]/20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-[#e05a30]" />
              <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Request #{ticket.id}</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">{ticket.type}</h2>
          </div>
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#5a6d78] border border-[#8fa3b0]/25 px-3 py-1.5">{ticket.status}</span>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8 pb-8 border-b-2 border-[#8fa3b0]/20">
          <div>
            <span className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1">Type</span>
            <span className="text-sm text-[#1a1a1a]">{ticket.type}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1">Category</span>
            <span className="text-sm text-[#1a1a1a]">{ticket.category}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1">Priority</span>
            <span className="text-sm text-[#1a1a1a]">{ticket.priority}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-1">Created</span>
            <span className="text-sm text-[#1a1a1a] font-mono">{new Date(ticket.created_at).toLocaleString()}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Description</span>
          </div>
          <p className="text-sm text-[#5a6d78] leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
        </div>
      </div>
    </div>
  );
}
