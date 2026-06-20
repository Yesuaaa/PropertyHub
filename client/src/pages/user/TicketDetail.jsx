import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/axiosInstance';
import TicketConversation from '../../components/ticket/TicketConversation';
import { useAuth } from '../../hooks/useAuth';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const { data } = await api.get(`/tickets/${id}`);
        setTicket(data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load request');
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
    return <p className="text-center pt-24 text-sm text-[#5a6d78]">{error || 'Request not found.'}</p>;
  }

  const statusColor = {
    open: 'text-[#1a1a1a] border-[#1a1a1a]',
    in_progress: 'text-[#5a6d78] border-[#5a6d78]',
    resolved: 'text-green-700 border-green-700',
    closed: 'text-[#8fa3b0] border-[#8fa3b0]'
  }[ticket.status] || 'text-[#5a6d78] border-[#8fa3b0]/25';

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

      <div className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 pb-6 border-b-2 border-[#8fa3b0]/20">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 bg-[#e05a30]" />
              <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">Request #{ticket.id}</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1a1a1a] tracking-tight">{ticket.type}</h2>
          </div>
          <span className={`text-[10px] font-mono font-semibold tracking-[0.2em] uppercase border px-3 py-1.5 self-start sm:self-auto ${statusColor}`}>
            {ticket.status?.replace('_', ' ')}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 mb-8 pb-8 border-b-2 border-[#8fa3b0]/20">
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

        <div className="mb-8 pb-8 border-b-2 border-[#8fa3b0]/20">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 bg-[#e05a30]" />
            <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Description</span>
          </div>
          <p className="text-sm text-[#5a6d78] leading-relaxed whitespace-pre-wrap">{ticket.description}</p>
        </div>

        <TicketConversation ticketId={id} currentUserRole={user?.role || 'user'} />
      </div>
    </div>
  );
}
