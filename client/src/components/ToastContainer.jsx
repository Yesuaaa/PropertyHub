import { AnimatePresence, motion } from 'framer-motion';
import { useNotifications } from '../context/NotificationContext';

const STYLES = {
  info: {
    bar: 'bg-[#1a1a1a] text-[#f5f3ef]',
    label: 'text-[#8fa3b0]',
    title: 'Info',
  },
  success: {
    bar: 'bg-[#1a1a1a] text-[#f5f3ef]',
    label: 'text-green-400',
    title: 'Success',
  },
  error: {
    bar: 'bg-[#e05a30] text-[#f5f3ef]',
    label: 'text-[#ffd9cc]',
    title: 'Error',
  },
  warning: {
    bar: 'bg-[#e05a30] text-[#f5f3ef]',
    label: 'text-[#ffe6db]',
    title: 'Warning',
  },
};

export default function ToastContainer() {
  const { toasts, dismissToast } = useNotifications();

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 max-w-sm w-[calc(100%-2rem)] sm:w-auto pointer-events-none">
      <AnimatePresence initial={false}>
        {toasts.map((t) => {
          const s = STYLES[t.type] || STYLES.info;
          return (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto border-l-2 border-[#e05a30] pl-3 pr-3 py-3 shadow-lg flex items-start gap-3 ${s.bar}`}
            >
              <div className="flex-1 min-w-0">
                <span className={`block text-[9px] font-mono font-semibold tracking-[0.2em] uppercase ${s.label}`}>
                  {s.title}
                </span>
                <p className="text-sm mt-0.5 break-words">{t.message}</p>
              </div>
              <button
                onClick={() => dismissToast(t.id)}
                className="text-current/60 hover:text-current text-xs leading-none mt-1 bg-transparent border-none cursor-pointer"
                aria-label="Dismiss notification"
              >
                ✕
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
