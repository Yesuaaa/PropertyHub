import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/axiosInstance';
import { useNotifications } from '../../context/NotificationContext';
import { TYPE_CATEGORIES, validateTicket, cleanText } from '../../utils/validation';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const DESCRIPTION_LIMIT = 1000;

export default function NewTicket() {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validateTicket({ type, category, description });
    if (validationError) {
      setError(validationError);
      toast(validationError, 'error');
      return;
    }

    setLoading(true);
    try {
      await api.post('/tickets', {
        type: cleanText(type),
        category: cleanText(category),
        description: cleanText(description),
        priority
      });
      toast('Your request has been submitted.', 'success');
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create request';
      setError(message);
      toast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const selectClass = "w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200 appearance-none cursor-pointer";
  const inputClass = "w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200";

  return (
    <div className="pb-16">
      <PageBanner
        image="/hero-professional.jpg"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'New Request' }
        ]}
        title="Submit a Request"
        subtitle="Describe your issue and we'll get it resolved as soon as possible."
      />

      <motion.div
        className="max-w-xl mx-auto px-4 pt-8"
        initial="hidden"
        animate="show"
        variants={stagger}
      >
      <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
            <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
            <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
          </div>
        </motion.div>
      )}
      </AnimatePresence>

      <motion.form
        onSubmit={handleSubmit}
        variants={fadeUp}
        className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-5 sm:p-8 space-y-6"
        noValidate
      >
        <motion.div variants={fadeUp}>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Type</label>
          <select value={type} onChange={(e) => { setType(e.target.value); setCategory(''); }} required className={selectClass}>
            <option value="">Select type</option>
            {Object.keys(TYPE_CATEGORIES).map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </motion.div>

        <motion.div variants={fadeUp}>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required disabled={!type} className={`${selectClass} ${!type ? 'opacity-40 cursor-not-allowed' : ''}`}>
            <option value="">Select category</option>
            {type && TYPE_CATEGORIES[type]?.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
          {!type && <p className="text-[11px] text-[#5a6d78] mt-2">Choose a request type first to show the correct categories.</p>}
        </motion.div>

        <motion.div variants={fadeUp}>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className={selectClass}>
            {PRIORITIES.map((p) => (<option key={p} value={p}>{p}</option>))}
          </select>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0]">Description</label>
            <span className={`text-[10px] font-mono tracking-[0.15em] uppercase ${description.length > DESCRIPTION_LIMIT ? 'text-[#e05a30]' : 'text-[#8fa3b0]'}`}>
              {description.length}/{DESCRIPTION_LIMIT}
            </span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value.slice(0, DESCRIPTION_LIMIT))}
            required
            rows={6}
            placeholder="Describe what happened, where it happened, and any details that can help the staff resolve it."
            className={inputClass}
          />
          <p className="text-[11px] text-[#5a6d78] mt-2">Minimum 10 characters. HTML tags are removed before saving.</p>
        </motion.div>

        <motion.button
          type="submit"
          variants={fadeUp}
          whileHover={!loading ? { scale: 1.01 } : undefined}
          whileTap={!loading ? { scale: 0.98 } : undefined}
          disabled={loading}
          className="w-full text-[#f5f3ef] py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </motion.button>
      </motion.form>
      </motion.div>
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
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="text-3xl md:text-4xl font-bold text-[#f5f3ef] tracking-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="text-sm text-[#8fa3b0] mt-2 max-w-lg"
          >
            {subtitle}
          </motion.p>
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
