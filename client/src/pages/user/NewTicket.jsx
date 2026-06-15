import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="max-w-xl mx-auto pt-24 pb-16 px-4">
      <div className="flex items-center gap-3 mb-2">
        <span className="w-2 h-2 bg-[#e05a30]" />
        <span className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-[#8fa3b0]">New Request</span>
      </div>
      <h2 className="text-3xl font-bold text-[#1a1a1a] mb-8 tracking-tight">Submit a Request</h2>

      {error && (
        <div className="border-2 border-[#e05a30]/30 bg-[#e05a30]/5 px-4 py-3 mb-6">
          <span className="text-[10px] font-mono font-semibold tracking-[0.2em] uppercase text-[#e05a30]">Error</span>
          <p className="text-sm text-[#1a1a1a] mt-0.5">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="border-2 border-[#1a1a1a] bg-[#f5f3ef] p-8 space-y-6">
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
  );
}
