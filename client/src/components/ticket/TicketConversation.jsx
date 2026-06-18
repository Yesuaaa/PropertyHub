import { useState, useEffect, useRef } from 'react';
import api from '../../services/axiosInstance';

export default function TicketConversation({ ticketId, currentUserRole }) {
  const [replies, setReplies] = useState([]);
  const [ticketStatus, setTicketStatus] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);

  const isClosed = ticketStatus === 'resolved' || ticketStatus === 'closed';

  const fetchReplies = async () => {
    try {
      const { data } = await api.get(`/tickets/${ticketId}/replies`);
      setReplies(data.replies);
      setTicketStatus(data.status);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await api.get(`/tickets/${ticketId}/replies`);
        if (!cancelled) {
          setReplies(data.replies);
          setTicketStatus(data.status);
        }
      } catch (err) {
        console.error(err);
      }
    })();
    return () => { cancelled = true; };
  }, [ticketId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [replies]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim() || sending) return;

    setSending(true);
    setError('');

    try {
      const { data } = await api.post(`/tickets/${ticketId}/replies`, { message });
      setReplies((prev) => [...prev, data.reply]);
      setMessage('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reply');
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="w-2 h-2 bg-[#e05a30]" />
        <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">
          Conversation
        </span>
      </div>

      {replies.length === 0 ? (
        <div className="border-2 border-[#8fa3b0]/15 p-8 mb-6 text-center">
          <p className="text-sm text-[#8fa3b0]">No replies yet. Start the conversation.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-6 max-h-[500px] overflow-y-auto pr-1 py-2">
          {replies.map((reply, idx) => {
            const isOwnReply = reply.author_role === currentUserRole;
            const isAdmin = reply.author_role === 'admin';
            const prevReply = replies[idx - 1];
            const isGrouped = prevReply && prevReply.author_role === reply.author_role;
            return (
              <div
                key={reply.id}
                className={`flex ${isOwnReply ? 'justify-end' : 'justify-start'} ${isGrouped ? '-mt-1' : ''}`}
              >
                <div
                  className={`relative max-w-[80%] px-4 py-2.5 shadow-sm ${
                    isOwnReply
                      ? 'bg-[#1a1a1a] text-[#f5f3ef] rounded-2xl rounded-br-sm'
                      : 'bg-white border border-[#8fa3b0]/25 text-[#1a1a1a] rounded-2xl rounded-bl-sm'
                  }`}
                >
                  {!isGrouped && (
                    <div className={`flex items-center gap-2 mb-1 ${isOwnReply ? 'justify-end' : 'justify-start'}`}>
                      <span
                        className={`text-[10px] font-mono font-semibold tracking-[0.15em] uppercase ${
                          isOwnReply ? 'text-[#8fa3b0]' : 'text-[#5a6d78]'
                        }`}
                      >
                        {isAdmin ? 'Staff' : reply.author_name}
                      </span>
                      {isAdmin && (
                        <span className="text-[8px] font-mono tracking-[0.2em] uppercase text-[#e05a30] border border-[#e05a30]/40 px-1.5 py-0.5">
                          ADMIN
                        </span>
                      )}
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {reply.message}
                  </p>
                  <div className={`mt-1 flex items-center gap-1.5 ${isOwnReply ? 'justify-end' : 'justify-start'}`}>
                    <span
                      className={`text-[9px] font-mono tracking-wide ${
                        isOwnReply ? 'text-[#8fa3b0]/60' : 'text-[#8fa3b0]'
                      }`}
                    >
                      {formatTime(reply.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      )}

      {isClosed && (
        <div className="border-2 border-[#8fa3b0]/20 px-4 py-3 mb-4">
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#5a6d78]">
            This ticket is {ticketStatus.replace('_', ' ')}. No further replies can be made.
          </span>
        </div>
      )}

      {!isClosed && (
        <form onSubmit={handleSend} className="flex gap-3">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your reply..."
            rows={3}
            className="flex-1 border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200 placeholder:text-[#8fa3b0]/50 resize-none"
          />
          <button
            type="submit"
            disabled={sending || !message.trim()}
            className="self-end text-xs font-semibold tracking-[0.1em] uppercase text-[#f5f3ef] bg-[#1a1a1a] border-2 border-[#1a1a1a] px-6 py-3 hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}

      {error && (
        <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mt-4">
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
          <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
        </div>
      )}
    </div>
  );
}
