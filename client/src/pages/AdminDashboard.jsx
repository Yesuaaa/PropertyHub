import { useState, useEffect } from 'react';
import axios from 'axios';

const STATUSES = ['Open', 'In Progress', 'Resolved', 'Closed'];

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/tickets`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/tickets/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">User</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Category</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Priority</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">#{ticket.id}</td>
                  <td className="px-4 py-3 text-sm">{ticket.user_name}</td>
                  <td className="px-4 py-3 text-sm">{ticket.type}</td>
                  <td className="px-4 py-3 text-sm">{ticket.category}</td>
                  <td className="px-4 py-3 text-sm">{ticket.priority}</td>
                  <td className="px-4 py-3 text-sm">
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                      className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-indigo-500 cursor-pointer"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(ticket.created_at).toLocaleDateString()}
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
