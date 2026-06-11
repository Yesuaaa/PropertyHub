import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Tickets</h2>
        <Link
          to="/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
        >
          New Ticket
        </Link>
      </div>
      {tickets.length === 0 ? (
        <p className="text-gray-500">No tickets found.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">ID</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Type</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Category</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Priority</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">#{ticket.id}</td>
                  <td className="px-4 py-3 text-sm">{ticket.type}</td>
                  <td className="px-4 py-3 text-sm">{ticket.category}</td>
                  <td className="px-4 py-3 text-sm">{ticket.priority}</td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        ticket.status === 'Open'
                          ? 'bg-green-100 text-green-700'
                          : ticket.status === 'In Progress'
                          ? 'bg-yellow-100 text-yellow-700'
                          : ticket.status === 'Resolved'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      to={`/tickets/${ticket.id}`}
                      className="text-indigo-600 hover:underline"
                    >
                      View
                    </Link>
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
