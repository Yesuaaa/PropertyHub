import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotifications } from '../context/NotificationContext';

function formatRelative(dateStr) {
  const then = new Date(dateStr).getTime();
  const diff = Date.now() - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

const TYPE_DOT = {
  ticket_created: 'bg-[#e05a30]',
  ticket_reply: 'bg-[#1a1a1a]',
  ticket_status: 'bg-green-600',
  account_change: 'bg-[#5a6d78]',
};

export default function NotificationBell({ variant = 'light' }) {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click.
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const isDark = variant === 'dark';

  const iconColor = isDark
    ? 'text-white/70 hover:text-white'
    : 'text-[#5a6d78] hover:text-[#1a1a1a]';
  const panelBg = isDark ? 'bg-[#1a1a1a] border-white/15' : 'bg-[#f5f3ef] border-[#1a1a1a]';
  const titleColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const mutedColor = isDark ? 'text-white/45' : 'text-[#8fa3b0]';
  const itemHover = isDark ? 'hover:bg-white/5' : 'hover:bg-[#8fa3b0]/10';
  const divider = isDark ? 'divide-white/10' : 'divide-[#8fa3b0]/15';

  const handleItemClick = async (n) => {
    if (!n.is_read) await markAsRead(n.id);
    setOpen(false);
    if (n.link) navigate(n.link);
  };

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className={`relative flex items-center justify-center w-8 h-8 bg-transparent border-none cursor-pointer transition-colors ${iconColor}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path
            fillRule="evenodd"
            d="M5.25 9.769a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 10.5v-.731zM12 21.75a2.25 2.25 0 002.25-2.25c-.812.094-1.636.15-2.471.15-.835 0-1.659-.056-2.471-.15A2.25 2.25 0 0012 21.75z"
            clipRule="evenodd"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center bg-[#e05a30] text-white text-[9px] font-mono font-bold rounded-full">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-2 w-[20rem] max-w-[calc(100vw-2rem)] border-2 shadow-xl ${panelBg}`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b-2 border-current/10">
              <span className={`text-[10px] font-mono font-semibold tracking-[0.2em] uppercase ${mutedColor}`}>
                Notifications
              </span>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className={`text-[9px] font-mono font-semibold tracking-[0.15em] uppercase bg-transparent border-none cursor-pointer ${isDark ? 'text-[#e05a30] hover:text-[#ff7a4d]' : 'text-[#e05a30] hover:text-[#1a1a1a]'}`}
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className={`max-h-[22rem] overflow-y-auto divide-y ${divider}`}>
              {notifications.length === 0 ? (
                <div className="px-4 py-8 text-center">
                  <span className={`block text-[10px] font-mono tracking-[0.2em] uppercase ${mutedColor}`}>
                    No notifications
                  </span>
                </div>
              ) : (
                notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => handleItemClick(n)}
                    className={`w-full text-left flex gap-3 px-4 py-3 transition-colors ${itemHover} ${!n.is_read ? (isDark ? 'bg-white/[0.03]' : 'bg-[#8fa3b0]/[0.07]') : ''}`}
                  >
                    <span className={`mt-1.5 w-2 h-2 shrink-0 rounded-full ${n.is_read ? (isDark ? 'bg-white/15' : 'bg-[#8fa3b0]/30') : TYPE_DOT[n.type] || 'bg-[#e05a30]'}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={`text-xs font-semibold truncate ${titleColor}`}>{n.title}</span>
                        <span className={`text-[9px] font-mono shrink-0 ${mutedColor}`}>{formatRelative(n.created_at)}</span>
                      </div>
                      <p className={`text-xs mt-0.5 leading-relaxed ${isDark ? 'text-white/60' : 'text-[#5a6d78]'}`}>
                        {n.message}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
