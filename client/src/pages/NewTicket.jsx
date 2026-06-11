import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TYPES = ['Complaint', 'Feedback', 'Suggestion', 'Bug Report'];
const CATEGORIES = ['General', 'Technical', 'Billing', 'Support', 'Other'];
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
      setError(err.response?.data?.message || 'Failed to create ticket');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Submit New Ticket
      </h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select type</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 cursor-pointer"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
