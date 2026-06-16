import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

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
const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];

export default function NewTicket() {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/tickets`,
        { type, category, description, priority },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create request');
    }
  };

  const selectClass = "w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200 appearance-none cursor-pointer";
  const inputClass = "w-full border-2 border-[#8fa3b0]/25 bg-transparent text-[#1a1a1a] px-4 py-3 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200";

  return (
    <div className="pb-16">
      <PageBanner
        image="https://images.pexels.com/photos/6125337/pexels-photo-6125337.jpeg"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Dashboard', to: '/dashboard' },
          { label: 'New Request' }
        ]}
        title="Submit a Request"
        subtitle="Describe your issue and we'll get it resolved as soon as possible."
      />

      <div className="max-w-xl mx-auto px-4 pt-8">

      {error && (
        <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
          <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-5 sm:p-8 space-y-6">
        <div>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Type</label>
          <select value={type} onChange={(e) => { setType(e.target.value); setCategory(''); }} required className={selectClass}>
            <option value="">Select type</option>
            {Object.keys(TYPE_CATEGORIES).map((t) => (<option key={t} value={t}>{t}</option>))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required disabled={!type} className={`${selectClass} ${!type ? 'opacity-40 cursor-not-allowed' : ''}`}>
            <option value="">Select category</option>
            {type && TYPE_CATEGORIES[type]?.map((c) => (<option key={c} value={c}>{c}</option>))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)} className={selectClass}>
            {PRIORITIES.map((p) => (<option key={p} value={p}>{p}</option>))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#8fa3b0] mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={6}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          className="w-full text-[#f5f3ef] py-3 text-xs font-semibold tracking-[0.15em] uppercase bg-[#1a1a1a] border-2 border-[#1a1a1a] hover:bg-transparent hover:text-[#1a1a1a] transition-all duration-200 cursor-pointer"
        >
          Submit Request
        </button>
      </form>
      </div>
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
          <h1 className="text-3xl md:text-4xl font-bold text-[#f5f3ef] tracking-tight">{title}</h1>
          <p className="text-sm text-[#8fa3b0] mt-2 max-w-lg">{subtitle}</p>
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
